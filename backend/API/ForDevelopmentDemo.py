from Agents import (GuardAgent,ClassificationAgent,DetailsAgent,AgentProtocol, RecommendationAgent, OrderTakingAgent)
import os
from typing import Dict
def main():
    guard_agent = GuardAgent()  
    classification_agent = ClassificationAgent()
    recommendation_agent = RecommendationAgent('Recommendation_instances/Market_Basket_recommendations.json',
                                                    'Recommendation_instances/popularity_recommendation.csv'
                                                    )
    order_taking_agent = OrderTakingAgent(recommendation_agent)
    # print(recommendation_agent.popular_recommendations)
    # print(recommendation_agent.get_popular_recommendation("Coffee"))
    # print(recommendation_agent.get_apriori_recommendation(["Latte","Dark chocolate"]))

    agent_dict: Dict[str,AgentProtocol] = {
        "details_agent":DetailsAgent(),
        "recommendation_agent": recommendation_agent,
        "order_taking_agent": order_taking_agent
    }
    
    messages = []
    while True:
        print("\nPrint Messages")
        print("-------------------")
        for message in messages:
            print(f"{message['role'].capitalize()}: {message['parts']}")

        # Get user input
        prompt = input("User: ")
        messages.append({"role": "user", "parts": prompt})

        # Get GuardAgent's response
        guard_agent_response = guard_agent.get_response(messages)
        print("Guard Agent Response: ", guard_agent_response["parts"])

        if guard_agent_response["memory"]["guard_decision"] == "not allowed":
            messages.append(guard_agent_response)
            continue
         

        # Get ClassificationAgent's response
        classification_agent_response = classification_agent.get_response(messages)
        chosen_agent=classification_agent_response["memory"]["classification_decision"]
        print("Chosen Agent: ", chosen_agent)

        #Get the chosen agent's response
        agent = agent_dict[chosen_agent]
        response = agent.get_response(messages)
        
        messages.append(response)



if __name__ == "__main__":
    main()
