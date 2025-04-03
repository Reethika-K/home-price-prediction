import json
import pickle
import numpy as np
import pandas as pd

__locations = None
__data_columns = None
__model = None

def get_estimated_price(location,sqft,bhk,bath):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1
    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index>=0:
        x[loc_index] = 1
    x_df = pd.DataFrame([x], columns=__data_columns)
    return round(__model.predict(x_df)[0],2)

def load_saved_artifacts():
    print("loading saved artifact")
    global __data_columns
    global __locations
    global __model

    with open("Server/artifacts/columns.json",'r') as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[3:]
 
    with open("Server/artifacts/banglore_house_prices_model.pickle",'rb') as f:
        __model = pickle.load(f)

    print("artifacts loaded")

def get_loc_names():
    return __locations

def get_data_columns():
    return __data_columns

if __name__ == '__main__':
    load_saved_artifacts()
    print(get_loc_names())
    print(get_estimated_price('1st Phase JP Nagar',1000, 3, 3))