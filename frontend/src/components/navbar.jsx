import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ title, path }) => {
    return (
        <div className="fixed top-0 w-full bg-neutral-50 py-4 px-4 border-b z-50 border-neutral-300 shadow-xl flex flex-row items-center">
            <div className="flex flex-row space-x-2 items-center">
                <div className="font-medium text-co-blue text-2xl">Credit</div>
                <div className="font-medium text-co-red text-2xl">Rewards</div>
            </div>
            <div className="ml-auto">
                <div className="underline font-medium pr-10 text-lg cursor-pointer">
                    <Link to={path}>{title}</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
