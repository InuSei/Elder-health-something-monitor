from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, devices, vitals
from ai_model import load_risk_model

app = FastAPI(title="Elderly Health Monitoring API")

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect the "separated" files to the main app
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(devices.router, tags=["Devices"])
app.include_router(vitals.router, tags=["Vitals"])

# You can keep the simple HTML dashboard here or move it too
@app.get("/")
def dashboard():
    return {"message": "Server is running"}