import React from "react";
import { MdSend } from "react-icons/md";

const ExpenseForm = ({
  charge,
  amount,
  handleCharge,
  handleAmount,
  handleSubmit,
  edit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">charge</label>
          <input
            type="text"
            name="charge"
            value={charge}
            onChange={handleCharge}
            id="charge"
            className="form-control"
            placeholder="e.g. rent"
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">amount</label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={handleAmount}
            id="amount"
            className="form-control"
            placeholder="1000"
          />
        </div>
      </div>
      <button type="submit" className="btn">
        {edit ? "edit" : "submit"}
         <MdSend className="btn-icon" />
      </button>
    </form>
  );
};

export default ExpenseForm;
