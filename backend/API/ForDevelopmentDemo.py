from Agents import (GuardAgent)
import os

def main():
    guard_agent = GuardAgent()  
    
    messages = []
    while True:
        print("\n\nPrint Messages ...............")
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
            continue 
  

if __name__ == "__main__":
    main()
