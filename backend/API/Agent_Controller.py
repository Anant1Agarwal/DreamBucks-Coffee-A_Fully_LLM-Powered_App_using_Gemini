from Agents import (GuardAgent,
                    ClassificationAgent,
                    DetailsAgent,
                    OrderTakingAgent,
                    RecommendationAgent,
                    AgentProtocol
                    )
import os
from typing import Dict
class AgentController():
    def __init__(self):
        self.guard_agent = GuardAgent()  
        self.classification_agent = ClassificationAgent()
        recommendation_agent = RecommendationAgent('Recommendation_instances/Market_Basket_recommendations.json',
                                                        'Recommendation_instances/popularity_recommendation.csv'
                                                        )
        order_taking_agent = OrderTakingAgent(recommendation_agent)
        # print(recommendation_agent.popular_recommendations)
        # print(recommendation_agent.get_popular_recommendation("Coffee"))
        # print(recommendation_agent.get_apriori_recommendation(["Latte","Dark chocolate"]))

        self.agent_dict: Dict[str,AgentProtocol] = {
            "details_agent":DetailsAgent(),
            "recommendation_agent": recommendation_agent,
            "order_taking_agent": order_taking_agent
        }
    
    def get_response(self,input):
        # Extract User Input
        job_input = input["input"]
        messages = job_input["messages"]

        # Get GuardAgent's response
        guard_agent_response = self.guard_agent.get_response(messages)
        if guard_agent_response["memory"]["guard_decision"] == "not allowed":
            return guard_agent_response
        
        # Get ClassificationAgent's response
        classification_agent_response = self.classification_agent.get_response(messages)
        chosen_agent=classification_agent_response["memory"]["classification_decision"]

        # Get the chosen agent's response
        agent = self.agent_dict[chosen_agent]
        response = agent.get_response(messages)

        return response
