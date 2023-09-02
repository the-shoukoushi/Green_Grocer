import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

# Load data from CSV file
data = pd.read_csv('vegetables_fruits.csv')

# Preprocessing: Convert date to datetime format
data['Date'] = pd.to_datetime(data['Date'])

# Preprocessing: Extract year and month as features
data['Year'] = data['Date'].dt.year
data['Month'] = data['Date'].dt.month

# Aggregating data by month
monthly_data = data.groupby(['Year', 'Month'])['Average'].mean().reset_index()

# Initialize and train the linear regression model
model = LinearRegression()

# Streamlit app
st.title('Fruits and Vegetables Prices Prediction')

# Generate future dates for prediction (including data up to 2023)
future_dates = pd.date_range(start=data['Date'].max(), end='2023-12-31', freq='M')
future_years = future_dates.year
future_months = future_dates.month

# Plotting
fig, ax = plt.subplots(figsize=(10, 6))
ax.plot(pd.to_datetime(monthly_data[['Year', 'Month']].assign(day=1)), monthly_data['Average'], marker='o', label='Actual Prices', color='blue')

# Predict average prices for all commodities combined
X = monthly_data[['Year', 'Month']]
y = monthly_data['Average']
model.fit(X, y)
average_predictions = model.predict(pd.DataFrame({'Year': future_years, 'Month': future_months}))
ax.plot(future_dates, average_predictions, label='Predicted Average Prices', linestyle='dashed', color='orange')

ax.set_xlabel('Date')
ax.set_ylabel('Average Price')
ax.set_title('Monthly Average Prices')
ax.legend()
plt.xticks(rotation=45)
plt.tight_layout()

# Display the plot in Streamlit
st.pyplot(fig)

# Display a table of fruits and vegetables with previous and future prices
st.write('## List of Fruits and Vegetables with Prices:')
fruit_vegetable_prices = data.groupby('Commodity')['Average'].last().reset_index()

# Generate separate future predictions for each commodity
future_predictions = []
for commodity in fruit_vegetable_prices['Commodity']:
    commodity_data = data[data['Commodity'] == commodity]
    X = commodity_data[['Year', 'Month']]
    y = commodity_data['Average']
    
    # Train the model on each commodity's data
    model.fit(X, y)
    
    # Predict future prices for the current commodity
    future_prediction = model.predict(pd.DataFrame({'Year': future_years, 'Month': future_months}))[0]
    future_predictions.append(future_prediction)

# Add the unique future predictions to the DataFrame
fruit_vegetable_prices['Future Price'] = future_predictions

# Display the DataFrame as a table with a wider width
st.dataframe(fruit_vegetable_prices, width=800)
