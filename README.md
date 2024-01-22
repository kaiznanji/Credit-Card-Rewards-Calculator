# Credit-Card-Rewards-Calculator
Calculate your maximum rewards points for your credit card!


### Tech Stack
Python, FastAPI, React.js, Serverless, AWS Amplify, API Gateway

See the url for the deployed version: https://master.dfnlsjuf81jnf.amplifyapp.com (currently debugging some CORS issues so the url is unable to communicate with the backend)

## Testing locally
### To start backend
1) Type ```cd backend`` in the terminal
2) Run command ```make install``` to install all dependencies
3) Run command ```make run``` to start the backend application server
### To start frontend
1) Type ```cd frontend`` in the terminal
2) Run command ```npm install``` to install all dependencies
3) Run command ```npm start``` to start the application
4) Go to http://localhost:3000/ to access the application


![alt text](https://github.com/kaiznanji/Credit-Card-Rewards-Calculator/blob/master/techstack.jpeg?raw=true)

# Details about the project 
***The Problem Statement :*** 
The aim is to create a rewards calculation system that calculates the total monthly reward points earned based on a customer's credit card purchases. More than one reward points calculation rules could apply to a merchant’s transaction(s) and the system should maximize the calculated points for a merchant by considering different priorities or combinations of the rules.


***Sample Transactions :***
Here is a list of transactions for a customer that needs to be considered for your solution.
```
transactions = {
  "T01": {"date": "2021-05-01", "merchant_code" : "sportcheck", "amount_cents": 21000},
  "T02": {"date": "2021-05-02", "merchant_code" : "sportcheck", "amount_cents": 8700},
  "T03": {"date": "2021-05-03", "merchant_code" : "tim_hortons", "amount_cents": 323},
  "T04": {"date": "2021-05-04", "merchant_code" : "tim_hortons", "amount_cents": 1267},
  "T05": {"date": "2021-05-05", "merchant_code" : "tim_hortons", "amount_cents": 2116},
  "T06": {"date": "2021-05-06", "merchant_code" : "tim_hortons", "amount_cents": 2211},
  "T07": {"date": "2021-05-07", "merchant_code" : "subway", "amount_cents": 1853},
  "T08": {"date": "2021-05-08", "merchant_code" : "subway", "amount_cents": 2153},
  "T09": {"date": "2021-05-09", "merchant_code" : "sportcheck", "amount_cents": 7326},
  "T10": {"date": "2021-05-10", "merchant_code" : "tim_hortons", "amount_cents": 1321}
}
```

***The Ask:***
Assuming that each $1 spend is only counted once, implement a method that takes the customer transactions as an input (Merchant Code -> Purchase Amount) and calculates the total maximum rewards points earned for the month , the maximum reward points applied for each transaction.

***Rules :***
```
● R1: 500 points for every $75 spend at Sport Check, $25 spend at Tim Hortons and $25 spend at Subway
● R2: 300 points for every $75 spend at Sport Check and $25 spend at Tim Hortons
● R3: 200 points for every $75 spend at Sport Check
● R4: 150 points for every $25 spend at Sport Check, $10 spend at Tim Hortons and $10 spend at Subway
● R5: 75 points for every $25 spend at Sport Check and $10 spend at Tim Hortons
● R6: 75 point for every $20 spend at Sport Check
● R7: 1 points for every $1 spend for all other purchases (including leftover amount)
```
