from mangum import Mangum
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import routers as _routers

def create_app():
    app = FastAPI(title="credit-rewards-backend")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )

    register_routers(app)

    return app


def register_routers(app: FastAPI):
    for router in _routers:
        app.include_router(router)

app = create_app()

@app.get("/")
def health():
    return "Credit Card Rewards backend is active!"

handler = Mangum(app=app)