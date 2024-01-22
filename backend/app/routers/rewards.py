from typing import List
from math import floor

from fastapi import APIRouter, HTTPException, status
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from app.constants import RULES

router = APIRouter(prefix="/rewards")


class GetRewardsRequest(BaseModel):
    transactions: List[dict]


@router.post("/")
def get_rewards(request: GetRewardsRequest):
    request = jsonable_encoder(request)
    transactions = request["transactions"]
    total_spending: dict = {}
    total_points = 0

    # Calculate total spending for each merchant
    for transaction in transactions:
        merchant_code = transaction["merchant_code"]
        if merchant_code in total_spending:
            total_spending[merchant_code] += int(transaction["amount_cents"])
        else:
            total_spending[merchant_code] = int(transaction["amount_cents"])
    
    # Sort based on maximum points per dollar spent
    priority_rules = []
    for rule in RULES:
        rule["priority"] = rule["points"] / sum(i["spending_amount"] for i in rule["purchase_amounts"] if "spending_amount" in i)
        priority_rules.append(rule)
    
    priority_rules = sorted(priority_rules, key=lambda d: d['priority'], reverse=True)
    used_rules = []

    # Maximize point use based on higher priority rules first
    for rule in priority_rules:
        minimum_spending = min(floor((total_spending.get(i["merchant_code"]) or 0) / (i["spending_amount"] * 100)) for i in rule["purchase_amounts"] if "spending_amount" in i)
        anyRule = rule["purchase_amounts"][0] # Assuming if there is a rule for any merchant there is only one
        if anyRule["merchant_code"] == "any":
            total_leftover_points = 0
            for merchant, value in total_spending.items():
                leftover_points = floor(total_spending[merchant] / (anyRule["spending_amount"] * 100))
                total_points += leftover_points
                total_leftover_points += leftover_points
            used_rules.append({ "rule": rule["id"], "times": str(total_leftover_points) })
        if minimum_spending == 0:
            continue

        for purchase_amount in rule["purchase_amounts"]:
            total_spending[purchase_amount["merchant_code"]] -= (purchase_amount["spending_amount"] * 100 * minimum_spending)
        
        used_rules.append({ "rule": rule["id"], "times": str(minimum_spending) })
        total_points += (minimum_spending * rule["points"])
    
    # Make used rules readable
    length = len(used_rules)
    readable_rules_used = "We used "
    for i in range(length):
        used_rule = used_rules[i]
        readable_rules_used += used_rule["rule"] + " x " + used_rule["times"] + " times"
        if (i != length - 1):
            readable_rules_used += ", "
        else:
            readable_rules_used += " to calculate your points."

    return { "reward_points": total_points, "used_rules": readable_rules_used }
