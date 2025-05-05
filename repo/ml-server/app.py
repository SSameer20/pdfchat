from fastapi import FastAPI
from pydantic import BaseModel # Importing BaseModel from pydantic for data validation
from typing import List


app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Welcome to the FastAPI server!"}

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id, "description": "This is a sample item."}

@app.get("/users/{user_id}")
async def read_user(user_id: int):
    return {"user_id": user_id, "name": "User Name", "role": "User"}

@app.get("/status")
async def get_status():
    return {"status": "Server is running", "uptime": "24 hours"}
