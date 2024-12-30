from typing import Protocol, List, Dict, Any

# each agent should implement this protocol
class AgentProtocol(Protocol):
    # get_response must take a list of messages and return a response of type Dict[str, Any]
    def get_response(self, messages: List[Dict[str, Any]]) -> Dict[str, Any]:
        ...