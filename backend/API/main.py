from fastapi import FastAPI
from Agent_Controller import AgentController

app = FastAPI()
agent_controller = AgentController()

@app.post("/response")
async def get_response(data: dict):
    return agent_controller.get_response(data)

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)