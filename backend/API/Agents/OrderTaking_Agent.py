import os
import json
from .utilities import get_gemini_response
import google.generativeai as genai
from copy import deepcopy
from dotenv import load_dotenv
load_dotenv()

import enum
from typing import TypedDict, List, Dict

# Define the step enumeration
class StepNumber(enum.Enum):
    TASK_1 = "Take the User's Order"
    TASK_2 = "Validate Items in Menu"
    TASK_3 = "Handle Invalid Items and Confirm Valid Order"
    TASK_4 = "Ask if the User Needs Anything Else"
    TASK_5 = "Finalize Order and Thank User"

# Define the schema for the "order" object
class OrderItem(TypedDict):
    item: str
    quantity: int
    price: float

# Define the schema for the JSON output
class OutputSchema(TypedDict):
    chain_of_thought: str
    step_number: StepNumber
    order: list[OrderItem]
    response: str


class OrderTakingAgent():
    def __init__(self, recommendation_agent):

        system_prompt = """
            You are a customer support Bot for a coffee shop called DreamBucks Coffee

            here is the menu for this coffee shop.

            Cappuccino - $4.50
            Jumbo Savory Scone - $3.25
            Latte - $4.75
            Chocolate Chip Biscotti - $2.50
            Espresso shot - $2.00
            Hazelnut Biscotti - $2.75
            Chocolate Croissant - $3.75
            Dark chocolate (Drinking Chocolate) - $5.00
            Cranberry Scone - $3.50
            Croissant - $3.25
            Almond Croissant - $4.00
            Ginger Biscotti - $2.50
            Oatmeal Scone - $3.25
            Ginger Scone - $3.50
            Chocolate syrup - $1.50
            Hazelnut syrup - $1.50
            Carmel syrup - $1.50
            Sugar Free Vanilla syrup - $1.50
            Dark chocolate (Packaged Chocolate) - $3.00

            Things to NOT DO:
            * DON'T ask how to pay by cash or Card.
            * DON'T tell the user to go to the counter
            * DON'T tell the user to go to place to get the order


            You're task is as follows:
            1. Take the User's Order
            2. Validate that all their items are in the menu
            3. if an item is not in the menu let the user and repeat back the remaining valid order
            4. Ask them if they need anything else.
            5. If they do then repeat starting from step 3
            6. If they don't want anything else. Using the "order" object that is in the output. Make sure to hit all three points
                1. list down all the items and their prices
                2. calculate the total. 
                3. Thank the user for the order and close the conversation with no more questions

            The user message will contain a section called memory. This section will contain the following:
            "order"
            "step number"
            please utilize this information to determine the next step in the process.
            
            produce the following output without any additions, not a single letter outside of the structure bellow.
            Your output should be in a structured json format like so. each key is a string and each value is a string. Make sure to follow the format exactly:
            {
            "order": this is going to be a list of jsons like so. [{"item":put the item name, "quanitity": put the number that the user wants of this item, "price":put the total price of the item }],
            "response": "write the a response to the user",
            "step_number": Determine which task you are on based on the conversation.,
            "chain of thought": "Write down your critical thinking about what is the maximum task number the user is on write now. Then write down your critical thinking about the user input and it's relation to the coffee shop process. Then write down your thinking about how you should respond in the response parameter taking into consideration the Things to NOT DO section. and Focus on the things that you should not do." ,
            }
        """


        genai.configure(api_key=os.environ["GEMINI_API_KEY"])
        self.client = genai.GenerativeModel(os.getenv("MODEL_NAME"),system_instruction=system_prompt)

        self.recommendation_agent = recommendation_agent
    
    def get_response(self,messages):
        messages = deepcopy(messages)
        
        last_order_taking_status = ""
        asked_recommendation_before = False
        for message_index in range(len(messages)-1,0,-1):
            message = messages[message_index]
            
            agent_name = message.get("memory",{}).get("agent","")
            if message["role"] == "assistant" and agent_name == "order_taking_agent":
                step_number = message["memory"]["step_number"]
                order = message["memory"]["order"]
                asked_recommendation_before = message["memory"]["asked_recommendation_before"]
                last_order_taking_status = f"""
                step_number: {step_number}
                order: {order}
                """
                break

        messages[-1]['parts'] = last_order_taking_status + " \n "+ messages[-1]['parts']

        input_messages = messages        

        chatbot_output = get_gemini_response(self.client,input_messages,OutputSchema)
        print("ORDER TAKING AGENT OUTPUT:",chatbot_output)
        # double check json 
        # chatbot_output = double_check_json_output(self.client,self.model_name,chatbot_output)

        output = self.postprocess(chatbot_output,messages,asked_recommendation_before)

        return output

    def postprocess(self,output,messages,asked_recommendation_before):
        output = json.loads(output)

        if type(output["order"]) == str:
            output["order"] = json.loads(output["order"])

        response = output['response']
        #to show recommendations based on Order and changing it to true if already reccomendations taken
        if not asked_recommendation_before and len(output["order"])>0:
            recommendation_output = self.recommendation_agent.get_recommendations_from_order(messages,output['order'])
            response = recommendation_output['parts']
            asked_recommendation_before = True

        dict_output = {
            "role": "assistant",
            "parts": response ,
            "memory": {"agent":"order_taking_agent",
                       "step_number": output["step_number"],
                       "order": output["order"],
                       "asked_recommendation_before": asked_recommendation_before
                      }
        }

        
        return dict_output

    
