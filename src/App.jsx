import { useState, useEffect } from "react";
import Alert from "./components/Alert";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

// const initialExpenses = [
//   {
//     id: uuidv4(),
//     charge: "rent",
//     amount: 1600,
//   },
//   {
//     id: uuidv4(),
//     charge: "car payment",
//     amount: 600,
//   },
//   {
//     id: uuidv4(),
//     charge: "credit card bill",
//     amount: 850,
//   },
// ];

// const initialExpenses = localStorage.getItem("expenses")
//   ? JSON.parse(localStorage.getItem("expenses"))
//   : [];

const initialExpenses = JSON.parse(localStorage.getItem("expenses"))
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

console.log(initialExpenses);

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    console.log("called");

    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({
          type: "success",
          text: "Item edited",
        });
      } else {
        const singleExpense = { id: uuidv4(), charge, amount };
        setExpenses([singleExpense, ...expenses]);
        handleAlert({
          type: "success",
          text: "Successfully added a new charge",
        });
      }
      setCharge("");
      setAmount("");
    } else {
      handleAlert({ type: "danger", text: "Something went wrong" });
    }
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "All item deleted" });
  };

  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((expense) => {
      return expense.id !== id;
    });
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "Item Deleted" });
  };

  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    const { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>

      <h1>
        Total spending :{" "}
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += +curr.amount);
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
