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
   