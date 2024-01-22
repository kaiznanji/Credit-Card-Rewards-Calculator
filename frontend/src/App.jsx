import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Rewards from './pages/rewards';
import Rules from './pages/rules';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Rewards />} />
                <Route path="rules" element={<Rules />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
