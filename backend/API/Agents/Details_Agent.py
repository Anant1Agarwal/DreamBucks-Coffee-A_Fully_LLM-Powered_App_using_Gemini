from dotenv import load_dotenv
import json
import os
from .utilities import get_gemini_response,get_embedding
import google.generativeai as genai
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from copy import deepcopy
from pinecone import Pinecone
load_dotenv()
from typing_extensions import TypedDict
# Define the schema for the JSON output
class OutputSchema(TypedDict):
    message: str

class DetailsAgent():
    def __init__(self):
        
        system_prompt = """ You are a customer support agent for a coffee shop called DreamBucks Coffee. You should answer every question as if you are waiter and provide the neccessary information to the user regarding their orders """
        #LLM Model
        genai.configure(api_key=os.environ["GEMINI_API_KEY"])
        self.client = genai.GenerativeModel(os.getenv("MODEL_NAME"),system_instruction=system_prompt)
        #Embedding Client
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "../service_Account_key.json"
        self.embedding_client = GoogleGenerativeAIEmbeddings(model="models/text-embedding-004")
        #pinecone----
        self.pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
        self.index_name = os.getenv("PINECONE_INDEX_NAME")
    
    def get_closest_results(self,index_name,input_embeddings,top_k=2):
        index = self.pc.Index(index_name)
        
        results = index.query(
            namespace="ns1",
            vector=input_embeddings,
            top_k=top_k,
            include_values=False,
            include_metadata=True
        )

        return results

    def get_response(self,messages):
        messages = deepcopy(messages)

        user_message = messages[-1]['parts']
        embedding = get_embedding(self.embedding_client,user_message)
        result = self.get_closest_results(self.index_name,embedding)
        
        source_knowledge = "\n".join([x['metadata']['text'].strip()+'\n' for x in result['matches'] ])

        #modify the last message sent to LLM
        prompt = f"""
        Using the contexts below, answer the query.

        Contexts:
        {source_knowledge}

        Query: {user_message}
        """

        
        messages[-1]['parts'] = prompt
        input_messages = messages[-3:]

        chatbot_output =get_gemini_response(self.client,input_messages,OutputSchema)
        print("DETAILS AGENT OUTPUT", chatbot_output)
        output = self.postprocess(chatbot_output)
        return output

    def postprocess(self,chat_output):
        chat_output= json.loads(chat_output)
        output = {
            "role": "assistant",
            "parts": chat_output["message"],
            "memory": {"agent":"details_agent"
                      }
        }
        return output
