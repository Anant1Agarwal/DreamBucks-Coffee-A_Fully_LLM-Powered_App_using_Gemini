import axios from 'axios';

import { MessageInterface } from '@/Object_Types/types';

import { API_URL } from '@/Config_for_FireBase/FastApiConfig';

const url:string=API_URL;

async function callChatBotAPI(messages: MessageInterface[]): Promise<MessageInterface> {
    try {
        const response = await axios.post(url, {
            input: { messages }
        }, {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${API_KEY}`
            }
        });
        
        // let output = response.data;
        // console.log(output)
        // let outputMessage: MessageInterface = output['parts'];
        let outputMessage: MessageInterface = response.data;

        return outputMessage;
    } catch (error) {
        console.error('Error calling the API:', error);
        throw error;
    }
}

export { callChatBotAPI };