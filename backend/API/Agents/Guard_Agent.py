from dotenv import load_dotenv
import os
import json
from copy import deepcopy
from .utilities import get_gemini_response
# from openai import OpenAI
import google.generativeai as genai
load_dotenv()

class GuardAgent():
    def __init__(self):
        system_prompt = """
            You are a helpful AI assistant for a coffee shop application which serves drinks and pastries.
            Your task is to determine whether the user is asking something relevant to the coffee shop or not.
            The user is allowed to:
            1. Ask questions about the coffee shop, like location, working hours, menu items and coffee shop related questions.
            2. Ask questions about menue items, they can ask for ingredients in an item and more details about the item.
            3. Make an order.
            4. Ask about recommendations of what to buy.

            The user is NOT allowed to:
            1. Ask questions about anything else other than our coffee shop.
            2. Ask questions about the staff or how to make a certain menu item.

            Your output should be in a structured json format like so. each key is a string and each value is a string. Make sure to follow the format exactly:
            {
            "chain of thought": "go over each of the points above and see if the message lies under this point or not. Then you write some your thoughts about what point is this input relevant to."
            "decision": "allowed" or "not allowed". Pick one of those. and only write the word.
            "message": leave the message "ONE COFFEE COMING RIGHT UP" if it's allowed, otherwise write "Sorry, I can't help with that. Can I help you with your order or any other query?"
            }
            """
        genai.configure(api_key=os.environ["GEMINI_API_KEY"])
        self.client = genai.GenerativeModel(os.getenv("MODEL_NAME"),system_instruction=system_prompt)
    
    def get_response(self,messages):
        #deepcopy to avoid changing the original messages
        messages = deepcopy(messages)

        input_messages=messages[-3:]

        chatbot_output = get_gemini_response(self.client,input_messages)
        print(chatbot_output)
        output = self.postprocess(chatbot_output)
        
        return output

    def postprocess(self,output):
        
        output = json.loads(output)

        dict_output = {
            "role": "assistant",
            "parts": output['message'],
            "memory": {"agent":"guard_agent",
                       "guard_decision": output['decision']
                      }
        }
        return dict_output



    
