from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from dashscope import Generation

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 建議用環境變數保存 API Key
DASHSCOPE_API_KEY = os.getenv("DASHSCOPE_API_KEY")

@app.get("/generate")
def generate_description(product: str, language: str = "en"):
    if not DASHSCOPE_API_KEY:
        return {"error": "API key not set"}
    
    prompt = f"Generate a product description in {language} for: {product}"
    
    try:
        response = Generation.call(
            model="qwen-turbo",
            prompt=prompt,
            api_key=DASHSCOPE_API_KEY,
            max_tokens=200
        )
        return {"description": response.output.text}
    except Exception as e:
        return {"error": str(e)}
#P@ssw0rd2026@@@@
# Serve static files from the React build
app.mount("/", StaticFiles(directory="./build", html=True), name="static")
