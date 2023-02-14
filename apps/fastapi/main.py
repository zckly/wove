from fastapi import FastAPI
from langchain.document_loaders import YoutubeLoader
from pydantic import BaseModel

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI"}

class CreateResource(BaseModel):
    url: str
    access_token: str

@app.post("/resource/", status_code=201)
async def create_resource(resource: CreateResource):
    print("HERe")
    # If URL is a YouTube video
    if (resource.url.startswith("https://www.youtube.com/watch?v=")):
        # Get transcript
        loader = YoutubeLoader.from_youtube_url(resource.url, add_video_info=True)
        yt = loader.load()

        if yt[0]:
            return {"message": yt[0].page_content}

    return {"message": "Other"}