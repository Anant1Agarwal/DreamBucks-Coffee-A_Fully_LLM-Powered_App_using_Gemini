// const API_URL=process.env.EXPO_FASTAPI_BASE_URL as string;
// // const API_KEY=process.env.EXPO_FASTAPI_API_KEY as string;


// export{API_URL};//API_KEY
import { EXPO_FASTAPI_BASE_URL } from '@env';

const API_URL = EXPO_FASTAPI_BASE_URL;

console.log('API_URL:', API_URL); // For debugging purposes


export { API_URL };

