from typing import List

from fastapi import APIRouter
from app.constants import RULES, MERCHANTS

router = APIRouter(prefix="/rules")


@router.get("/")
def get_rules():
    readable_rules = []
    for rule in RULES:
        first_rule = rule["purchase_amounts"][0]
        spending = "$" + str(first_rule["spending_amount"]) + " spent at " + MERCHANTS[first_rule["merchant_code"]]
        for purchase_amount in rule["purchase_amounts"][1:]:
            spending += " and $" + str(purchase_amount["spending_amount"]) + " spent at " + MERCHANTS[purchase_amount["merchant_code"]]
        readable_rules.append(
            {
                "name": rule["id"],
                "rule": str(rule["points"]) + " points for every " + spending
            }
        )
    return list(readable_rules)