from Agents import (GuardAgent,ClassificationAgent)
import os

def main():
    guard_agent = GuardAgent()  
    classification_agent = ClassificationAgent()
    
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

        if guard_agent_response["memory"]["guard_decision"] == "allowed":
            messages.append(guard_agent_response)
         

        # Get ClassificationAgent's response
        classification_agent_response = classification_agent.get_response(messages)
        chosen_agent=classification_agent_response["memory"]["classification_decision"]
        print("Chosen Agent: ", chosen_agent)


if __name__ == "__main__":
    main()
