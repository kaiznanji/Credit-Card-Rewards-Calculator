import { BACKEND_URL } from "./constants";


export const getRewardsPoints = async (transactions) => {
    let response = await fetch(BACKEND_URL + "/rewards", {
        method: "POST",
        body: JSON.stringify({
            transactions
        }),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    });

    return await response.json();
};

export const getRules = async () => {
    let response = await fetch(BACKEND_URL + "/rules", {
        method: "GET",
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            "Content-Type": "application/json"
        }
    });

    return await response.json();
};