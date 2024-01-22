import React, { useState } from 'react';
import Calculator from "../components/calculator";
import Navbar from "../components/navbar";
import Transactions from "../components/transactions";
import { getRewardsPoints } from '../util';

const Rewards = () => {
    const [transactions, setTransactions] = useState([]);
    const [usedRules, setUsedRules] = useState([]);
    const [points, setPoints] = useState(0);
    const addTransaction = (transaction) => {
        setTransactions([...transactions, transaction]);
    };
    const handleGetRewardsPoints = async () => {
        try {
            let response = await getRewardsPoints(transactions);
            if (response.error) {
                return alert("There was an error retrieving the reward points");
            }
            setUsedRules(response.used_rules);
            setPoints(response.reward_points);
        } catch (err) {
            alert("There was an error retrieving the reward points");
        }
        
    }
    return (
        <div className="min-h-screen bg-white overflow-y-scroll pt-20">
            <Navbar title="Rules" path="/rules" />
            <div className="lg:container mx-auto py-10 lg:px-0 px-2 flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:items-center">
                <div className="flex flex-col space-y-6 pr-5 lg:w-[50%]">
                    <div className="flex flex-row items-center">
                        <div className="flex flex-col space-y-2">
                            <div className="font-semibold text-xl">
                                Calculate your credit card rewards points below!
                            </div>
                            <div className="w-[75%]">
                                We use a priority algorithm to determine your
                                maximum rewards based on our provided rules. See
                                rules in the top right corner!
                            </div>
                        </div>
                        <div className="ml-auto">
                            <div className="border border-neutral-400 rounded-md flex flex-row space-x-2 items-center justify-center shadow-lg p-5">
                                <div className="text-3xl font-semibold text-green-600">
                                    {points}
                                </div>
                                <div className="text-xl font-semibold">
                                    pts
                                </div>
                            </div>
                        </div>
                    </div>
                    <Calculator addTransaction={addTransaction} />
                    <Transactions transactions={transactions} />
                    {usedRules?.length > 0 && (
                        <div>
                            {usedRules}
                        </div>
                    )}
                    <div
                        onClick={handleGetRewardsPoints}
                        className="flex items-center mb-40 justify-center rounded-lg min-w-24 text-white font-semibold shadow-sm px-3 py-3 bg-co-blue cursor-pointer"
                    >
                        Calculate rewards
                    </div>
                </div>
                <div className="lg:w-[50%] lg:pl-5">
                    <img
                        alt="credit-cards"
                        className="aspect-[4/3] w-full rounded-3xl shadow-xl"
                        src={require("../images/credit_cards.jpg")}
                    />
                </div>
            </div>
        </div>
    );
}

export default Rewards;
