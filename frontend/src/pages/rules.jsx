import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { getRules } from "../util";

const Rules = () => {
    const [rules, setRules] = useState([]);

    useEffect(() => {
        const initialStartup = async () => {
            try {
                const response = await getRules();
                if (response.error) {
                    return alert("Failed to get rules");
                }
                setRules(response);
            } catch (err) {
                return alert("Failed to get rules");
            }
        };
        initialStartup();
    }, []);
    return (
        <div className="min-h-screen bg-white pt-20">
            <Navbar title="Rewards" path="/" />
            <div className="flex flex-col space-y-4 container mx-auto py-5">
                {rules.map((rule, index) => (
                    <div key={index}>
                        {rule.name}: {rule.rule}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Rules;
