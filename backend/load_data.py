import pandas as pd
from sqlalchemy import create_engine
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get the database URL from the environment variable
DATABASE_URL = os.getenv('DATABASE_URL')


# Create the database engine
engine = create_engine(DATABASE_URL)

#load the data
df = pd.read_csv(r'C:\Users\Manoj\Downloads\archive (16)\zomato.csv', encoding='latin1')

# Write data to the database
df.to_sql('zomato_restaurants', con=engine, if_exists='replace', index=False)
print("Successfully loaded")