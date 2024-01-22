import { BACKEND_URL } from "./constants";


export const getRewardsPoints = async (transactions) => {
    let response = await fetch(BACKEND_URL + "/rewards", {
        method: "POST",
        body: JSON.stringify({
            transactions
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    return await response.json();
};

export const getRules = async () => {
    let response = await fetch(BACKEND_URL + "/rules", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return await response.json();
};