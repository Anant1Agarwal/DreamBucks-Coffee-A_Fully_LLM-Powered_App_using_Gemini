import google.generativeai as genai

def get_embedding(embedding_client,text_input):

    text_embeddings = embedding_client.embed_query(text_input)
    return text_embeddings



def get_gemini_response(client,messages,OutputSchema_class):
    input_messages = []

    for message in messages[:-1]:
        input_messages.append({"role": message["role"], "parts": message["parts"]})
    
    chat=client.start_chat(history=input_messages)
    result=chat.send_message(messages[-1]["parts"],
                              generation_config=genai.GenerationConfig(
        response_mime_type="application/json",
        response_schema=OutputSchema_class
    ),)


    return result.text

# NO need to make double call as we are using GEMINI :)
# def double_check_json_output(client,json_string,OutputSchema2):
#     prompt = f""" You will check this json string and correct any mistakes that will make it invalid. Then you will return the corrected json string. Nothing else. 
#     If the Json is correct just return it.

#     If there is any text before or after Json string, remove it
#     Do NOT return a single letter outside of the json string.

#     {json_string}
#     """

#     messages = [{"role": "user", "parts": prompt}]

#     response = get_gemini_response(client,messages,OutputSchema2)

#     return response
   