from dotenv import load_dotenv
import os
import json
from copy import deepcopy
from .utilities import get_gemini_response
# from openai import OpenAI
import google.generativeai as genai
import enum
from typing_extensions import TypedDict

load_dotenv()

# STURCTURED OUTPUT
class Decision(enum.Enum):
    DETAILS_AGENT = "details_agent"
    ORDER_TAKING_AGENT = "order_taking_agent"
    RECOMMENDATION_AGENT = "recommendation_agent"

# Define the schema for the JSON output
class OutputSchema(TypedDict):
    chain_of_thought: str
    decision: Decision
    message: str


class ClassificationAgent():
    def __init__(self):
        system_prompt = """
            You are a helpful AI assistant for a coffee shop application.
            Your task is to determine what agent should handle the user input. You have 3 agents to choose from:
            1. details_agent: This agent is responsible for answering questions about the coffee shop, like location, delivery places, working hours, details about menu items. Or listing items in the menu items. Or by asking what we have.
            2. order_taking_agent: This agent is responsible for taking orders from the user. It's responsible to have a conversation with the user about the order until it's complete.
            3. recommendation_agent: This agent is responsible for giving recommendations to the user about what to buy. If the user asks for a recommendation, this agent should be used.

            Your output should be in a structured json format like so. each key is a string and each value is a string. Make sure to follow the format exactly:
            {
            "chain of thought": "go over each of the agents above and write some your thoughts about what agent is this input relevant to."
            "decision": "details_agent" or "order_taking_agent" or "recommendation_agent". Pick one of those. and only write the word.
            "message": leave the message empty.
            }
            """
        genai.configure(api_key=os.environ["GEMINI_API_KEY"])
        self.client = genai.GenerativeModel(os.getenv("MODEL_NAME"),system_instruction=system_prompt)
    
    def get_response(self,messages):
        #deepcopy to avoid changing the original messages
        messages = deepcopy(messages)

        input_messages=messages[-3:]

        chatbot_output = get_gemini_response(self.client,input_messages,OutputSchema)
        print("CLASSIFICATION AGENT OUTPUT: ", chatbot_output)
        output = self.postprocess(chatbot_output)
        
        return output

    def postprocess(self,output):
        
        output = json.loads(output)

        dict_output = {
            "role": "assistant",
            "parts": output['message'],
            "memory": {"agent":"classification_agent",
                       "classification_decision": output['decision']
                      }
        }
        return dict_output