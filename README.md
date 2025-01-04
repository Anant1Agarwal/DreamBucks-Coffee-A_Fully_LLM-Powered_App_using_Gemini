# DreamBucks Coffee : A Fully LLM powered Agentic Mobile App using Google Gemini 🍪 🤖 

DreamBucks Coffee is a redesign of the Starbucks Coffee app using Google Gemini, a fully LLM powered agentic mobile app. The app is designed to provide a personalized experience to the users by understanding their preferences and recommending the best coffee/bakery options. The app uses Google Gemini to generate natural language responses and provide a conversational experience to the users.The app is designed to be user-friendly and easy to use, with a simple and intuitive interface. The app is fully controllable through the use of AI Agents powered by LLM model (Google Gemini).These AI agents can provide store/product details, recommend products based on market basket analysis and user preferences, and even help users place orders.
 
 ## 👨🏻‍💻 Technologies Used:
- React Native
- Google Gemini
- Pinecone
- LangChain
- Firebase
- Scikit-learn
- JavaScript
- FastAPI
- Docker
- Amazon Web Services (AWS) EC2

          
 ## 🧐 Features:
 * offers unparalleled user experience with a modern,fun,intuitive, and easy-to-use interface using React Native.
 * Manages real-time conversation with customers, including recommendations, order placement, and store/product queries.
 * Provides personalized recommendations based on user preferences and market basket analysis. 
 * Uses Google Gemini to generate natural language responses and provide a conversational experience to the users.
 * leverages Pinecone and Retrieval-Augmented Generation (RAG) to provide accurate and relevant responses to user queries about menu items,ingredients, and store details
 * provides Safe and contextually relevant interactions via Guard Agent
 * Helps users place orders through chat service.
 * uses Firebase to store product details and popular recommendations.
 
 ## 🤩 Product Images:

 
## 🚀 Product Architecture
### Diagram: 


### Description:
#### Frontend:
-The Frontend of the app is built using React Native. This app fetches Product details and recommendations from Firebase and displays them to the user. The app also send user queries to the backend for processing.

#### Backend:
- The backend of the app is built using **FastAPI** and deployed on **Amazon Web Services (AWS) EC2** using **Docker**.
- The backend fetches product details and recommendations from **Firebase** and uses **Scikit-learn** to generate recommendations based on user preferences and market basket analysis.
- The backend is also responsible for implementing the chat service and processing user queries using 5 different AI agents powered by **Google Gemini**.

### 5 Key LLM Agents used in the app:
1. **Guard Agent:** responsible for ensuring safe and contextually relevant interactions with the user, and blocks any inappropriate or irrelevant query sent to the system.
2 **Classification Agent:** responsible for classifying user queries into different categories like store details, product details, recommendations, or placing orders.
3. **Details Agent** responsible for providing detailed information about the store, products, or ingredients. it retrieves relevant data from **Pinecone vector database** and sends this data to Gemini to create relevant responses.
4. **Recommendation Providing Agent:** responsible for generating personalized recommendations based on user preferences and market basket analysis. It uses **Scikit-learn** to generate recommendations. It also ensures whether the user is asking for recommendationns in general or for a specific product category and provides recommendations accordingly according to items added in the cart.
5. **Order Taking Agent:** responsible for helping users place orders through the chat service. Users can ask for recommendations, add items to their cart, and place orders using this agent. The agent also ensures that the states of the cart are maintained and the user is able to place orders seamlessly.


## 🛠️ Installation Steps and Deployment Steps:
- Coming Soon...








