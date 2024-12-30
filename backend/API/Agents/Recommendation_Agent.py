import json
import pandas as pd
import os
from .utilities import get_gemini_response, double_check_json_output
import google.generativeai as genai
from copy import deepcopy
import json
from dotenv import load_dotenv
import enum
from typing import List
from typing_extensions import TypedDict

load_dotenv()
# Define allowed values for the "recommendation_type" field
class RecommendationType(enum.Enum):
    APRIORI = "apriori"
    POPULAR = "popular"
    POPULAR_BY_CATEGORY = "popular by category"

# Define the schema for the JSON output
class OutputSchema1(TypedDict):
    chain_of_thought: str
    recommendation_type: RecommendationType
    Reccs_for_Category: list[str] # List of items or categories, or an empty list

class OutputSchema2(TypedDict):
    message: str


class RecommendationAgent():
    def __init__(self,market_basket_recommendation_path,popular_recommendation_path):
        genai.configure(api_key=os.environ["GEMINI_API_KEY"])
        self.client = genai.GenerativeModel(os.getenv("MODEL_NAME"))

        with open(market_basket_recommendation_path, 'r') as file:
            self.apriori_recommendations = json.load(file)

        self.popular_recommendations = pd.read_csv(popular_recommendation_path)
        self.products = self.popular_recommendations['product'].tolist()
        self.product_categories =list(set(self.popular_recommendations['product_category'].tolist()))
    
    # User specified some products
    def get_apriori_recommendation(self,products,top_k=5):
        recommendation_list = []
        for product in products:
            if product in self.apriori_recommendations:
                recommendation_list += self.apriori_recommendations[product]
        
        # Sort recommendation list by "confidence"
        recommendation_list = sorted(recommendation_list,key=lambda x: x['confidence'],reverse=True)

        recommendations = []
        recommendations_per_category = {}
        for recommendation in recommendation_list:
            # If Duplicated recommendations then skip
            if recommendation in recommendations:
                continue 

            # Limit 2 recommendations per product_category
            product_category = recommendation['product_category']
            if product_category not in recommendations_per_category:
                recommendations_per_category[product_category] = 0
            
            if recommendations_per_category[product_category] >= 2:
                continue

            recommendations_per_category[product_category]+=1

            # Add recommendation
            recommendations.append(recommendation['product'])

            if len(recommendations) >= top_k:
                break

        return recommendations 

    def get_popular_recommendation(self,product_categories=None,top_k=5):
        recommendations_df = self.popular_recommendations
        
        # if only 1 category is provided---> what coffee should i take?   
        if type(product_categories) == str:
            product_categories = [product_categories]

        if product_categories is not None:
            recommendations_df = self.popular_recommendations[self.popular_recommendations['product_category'].isin(product_categories)]
        recommendations_df = recommendations_df.sort_values(by='number_of_transactions',ascending=False)
        
        if recommendations_df.shape[0] == 0:
            return []

        recommendations = recommendations_df['product'].tolist()[:top_k]
        return recommendations

    #tells which type of recommendation to provide
    def recommendation_classification(self,messages):
        # print(self.product_categories)
        # print(self.products)
        system_prompt = """ You are a helpful AI assistant for a coffee shop application which serves drinks and pastries. We have 3 types of recommendations:

        1. Apriori Recommendations: These are recommendations based on the user's order history. We recommend items that are frequently bought together with the items in the user's order.
        2. Popular Recommendations:Recommend items that are popular in the coffee shop.
        3. Popular Recommendations by Category: here we recommend items that are popular in a specific category requested by the user.
        
        Here is the list of items in the coffee shop:
        """+ ", ".join(self.products) + """
        Here is the list of Categories we have in the coffee shop:
        """ + ", ".join(self.product_categories) + """

        Your task is to determine which type of recommendation to provide based on the user's message.

        Your Output should use JSON Format with 3 strings as Keys. Make sure to follow the format exactly:
        {
        "Reccs_for_Category": a subset list of product categories from the coffee shop. If the recommendation type is "popular by category", then this list should contain only one element which is the category name. If the recommendation type is "popular", then this list should be empty. If the recommendation type is "apriori", then this list should contain the items that the user mentioned in their message.
        "chain of thought":"Write down your critical thinking about what type of recommendation is this input relevant to.",
        "recommendation_type":" "apriori" or "popular" or "popular by category". Pick one of those and only write the word." 
        }
        """
        self.client = genai.GenerativeModel(os.getenv("MODEL_NAME"),system_instruction=system_prompt)
        input_messages = messages[-3:]

        chatbot_output =get_gemini_response(self.client,input_messages,OutputSchema1)
        
        # chatbot_output= double_check_json_output(self.client,chatbot_output,OutputSchema1)
        print("RECOMMENDATION CLASSIFICATION OUTPUT: ", chatbot_output)
        output = self.postprocess_classfication(chatbot_output)
        return output

    #going to be a post process
    def get_response(self,messages):
        messages = deepcopy(messages)

        recommendation_classification = self.recommendation_classification(messages)
       
        recommendation_type = recommendation_classification['recommendation_type']
        print("RECOMMENDATION TYPE: ", recommendation_type)
        recommendations = []
        if recommendation_type == "apriori":
            recommendations = self.get_apriori_recommendation(recommendation_classification['Reccs_for_Category'])
        elif recommendation_type == "popular":
            recommendations = self.get_popular_recommendation()
        elif recommendation_type == "popular by category":
            recommendations = self.get_popular_recommendation(recommendation_classification['Reccs_for_Category'])
        
        if recommendations == []:
            return {"role": "assistant", "parts":"Sorry, I can't help with that recommendation. Can I help you with your order?"}
        
        # Respond to User
        recommendations_str = ", ".join(recommendations)
        
        system_prompt = f"""
        You are a helpful AI assistant for a coffee shop application which serves drinks and pastries.
        your task is to recommend items to the user based on their input message. And respond in a friendly but concise way. And put it an unordered list with a very small description.

        I will provide what items you should recommend to the user based on their order in the user message. 
        """

        self.client = genai.GenerativeModel(os.getenv("MODEL_NAME"),system_instruction=system_prompt)

        prompt = f"""
        {messages[-1]['parts']}

        Please recommend me those items exactly: {recommendations_str}
        """

        messages[-1]['parts'] = prompt
        input_messages =messages[-3:]
       
        client2 = genai.GenerativeModel(os.getenv("MODEL_NAME"))
        chatbot_output =get_gemini_response(client2,input_messages,OutputSchema2)
        
        output = self.postprocess(chatbot_output)

        return output



    def postprocess_classfication(self,output):
        output = json.loads(output)

        dict_output = {
            "recommendation_type": output['recommendation_type'],
            "Reccs_for_Category": output["Reccs_for_Category"],
        }
        return dict_output
    # show maket basket recommendations based on user's order/cart
    def get_recommendations_from_order(self,messages,order):
        products = []
        for product in order:
            products.append(product['item'])

        recommendations = self.get_apriori_recommendation(products)
        recommendations_str = ", ".join(recommendations)

        system_prompt = f"""
        You are a helpful AI assistant for a coffee shop application which serves drinks and pastries.
        your task is to recommend items to the user based on their order.

        I will provide what items you should recommend to the user based on their order in the user message. 
        """
        self.client = genai.GenerativeModel(os.getenv("MODEL_NAME"),system_instruction=system_prompt)

        #improvised way of sending recommendations to user through our pre-computed recommendations

        prompt = f"""
        {messages[-1]['parts']}

        Please recommend me those items exactly: {recommendations_str}
        """

        messages[-1]['parts'] = prompt
        input_messages = messages[-3:]

        chatbot_output =get_gemini_response(self.client,input_messages,OutputSchema2)
        output = self.postprocess(chatbot_output)

        return output
    
    def postprocess(self,output):
        output_data = json.loads(output)
        output = {
            "role": "assistant",
            "parts": output_data["message"],
            "memory": {"agent":"recommendation_agent"
                      }
        }
        return output


