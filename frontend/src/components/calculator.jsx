import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Calculator = ({ addTransaction }) => {
    const [transaction, setTransaction] = useState({ date: new Date() });
    const handleChange = (value, key) => {
        let v = value;
        if (key === "date") v = value.$d;
        
        setTransaction({ ...transaction, [key]: v });
    };

    const handleAddTransaction = () => {
        if (!transaction.amount_cents || !transaction.date || !transaction.merchant_code) {
            return alert("Please enter all details before adding a transaction.");
        }
        addTransaction(transaction);
    };

    return (
        <div className="flex flex-col space-y-3">
            <div className="font-medium text-lg">Add transaction</div>
            <div className="flex flex-row space-x-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={dayjs(transaction.date)}
                        onChange={(v) => handleChange(v, "date")}
                        className="w-48"
                        label="Date"
                    />
                </LocalizationProvider>
                <FormControl className="w-48">
                    <InputLabel>Merchant</InputLabel>
                    <Select
                        value={transaction.merchant_code}
                        label="Merchant"
                        onChange={(e) => handleChange(e.target.value, "merchant_code")}
                    >
                        <MenuItem value="sportcheck">SportCheck</MenuItem>
                        <MenuItem value="tim_hortons">Tim Hortons</MenuItem>
                        <MenuItem value="subway">Subway</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Amount (cents)"
                    type="number"
                    className="w-48"
                    defaultValue={0}
                    onChange={(e) => handleChange(e.target.value, "amount_cents")}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <div
                    onClick={handleAddTransaction}
                    className="flex items-center justify-center rounded-lg min-w-24 text-white font-semibold shadow-sm px-3 py-1 bg-co-blue cursor-pointer"
                >
                    Add
                </div>
            </div>
        </div>
    );
};

export default Calculator;
