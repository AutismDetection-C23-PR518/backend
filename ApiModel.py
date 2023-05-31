# !pip install fastapi
# !pip install uvicorn
# !pip install pickle5
# !pip install pydantic
# !pip install scikit-learn
# !pip install requests
# !pip install pypi-json
# !pip install pyngrok
# !pip install nest-asyncio

import uvicorn
import json
import pickle
from fastapi import FastAPI
from pydantic import BaseModel
from pyngrok import ngrok

app = FastAPI()
origins = ["*"]
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class node(BaseModel):
        jaundice: int
        keluarga_ASD: int
        who_test: int
        A1: int
        A2: int
        A3: int
        A4: int
        A5: int
        A6: int
        A7: int
        A8: int
        A9: int
        A10: int
        jaundice: int
        Family_mem_with_ASD: int
        Sex: int
          
    # ngrok.set_auth_token('2QUMOxf9JWL7FTGjEsOB4YhpF60_5NiW7xEdFCWbPdr78q7Rc')
# public_url = ngrok.connect(8000).public_url

pickle_in = open("model_prediksi (5).pkl","rb")
model = pickle.load(pickle_in)

@app.get('/')
async def index():
    return{'massage': 'hello'}

@app.get('/{name}')
async def get_name(name: str):
    return{'welcome': f'{name}'}

@app.post('/predict')
async def predict_autism(data:node):
        input_data = data.json()
        input_dictionary = json.loads(input_data)
        A1= input_dictionary['A1']
        A2= input_dictionary['A2']
        A3= input_dictionary['A3']
        A4= input_dictionary['A4']
        A5= input_dictionary['A5']
        A6= input_dictionary['A6']
        A7= input_dictionary['A7']
        A8= input_dictionary['A8']
        A9= input_dictionary['A9']
        A10= input_dictionary['A10']
        jaundice= input_dictionary['jaundice']
        Family_mem_with_ASD= input_dictionary['Family_mem_with_ASD']
        Sex= input_dictionary['Sex']
        prediction=model.predict([[jaundice,Family_mem_with_ASD,Sex,A1,A2,A3,A4,A5,A6,A7,A8,A9,A10]])

        if (prediction[0] >= 0.5):
          return 'yes'
        else:
          return 'no'
        
        import nest_asyncio

ngrok_tunnel = ngrok.connect(8000)
print('Public URL:', ngrok_tunnel.public_url)
nest_asyncio.apply()
uvicorn.run(app, port=8000)
