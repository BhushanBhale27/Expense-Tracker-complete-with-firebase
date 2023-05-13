import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [darkMode, setDarkMode] = useState(false);

  const Useremail = localStorage.getItem("mail");
  const ChangesEMail = Useremail
    ? Useremail.replace("@", "").replace(".", "")
    : "";

  const email = useRef();
  const des = useRef();
  const categories = useRef();

  useEffect(() => {
    axios
      .get(
        `https://sabkastore-88e1e-default-rtdb.firebaseio.com/expenses/${ChangesEMail}.json`
      )
      .then((response) => {
        const fetchedExpenses = [];
        for (let key in response.data) {
          fetchedExpenses.push({
            id: key,
            ...response.data[key],
          });
        }
        setExpenses(fetchedExpenses);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ChangesEMail]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredEmail = email.current.value;
    const enteredDes = des.current.value;
    const enteredCategory = categories.current.value;

    setEnteredAmount("");
    setEnteredDescription("");
    setSelectedCategory("Category");

    axios
      .post(
        `https://sabkastore-88e1e-default-rtdb.firebaseio.com/expenses/${ChangesEMail}.json`,
        {
          amount: enteredEmail,
          description: enteredDes,
          category: enteredCategory,
        }
      )
      .then((response) => {
        setExpenses((prevExpenses) => [
          ...prevExpenses,
          {
            id: response.data.name,
            amount: enteredEmail,
            description: enteredDes,
            category: enteredCategory,
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (id) => {
    const expenseToUpdate = expenses.find((expense) => expense.id === id);
    setEnteredAmount(expenseToUpdate.amount);
    setEnteredDescription(expenseToUpdate.description);
    setSelectedCategory(expenseToUpdate.category);

    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `https://sabkastore-88e1e-default-rtdb.firebaseio.com/expenses/${ChangesEMail}/${id}.json`
      )
      .then(() => {
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense.id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const totalExpenses = expenses.reduce(
    (total, expense) => total + parseInt(expense.amount),
    0
  );

  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={`text-center p-8 ${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <h1 className="text-4xl font-bold mb-6">Expense Tracker</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          ref={email}
          name="email"
          type="number"
          value={enteredAmount}
          onChange={(event) => setEnteredAmount(event.target.value)}
          placeholder="Enter Amount"
          className={`p-2 rounded border border-gray-400 ${darkMode ? "text-black" : "text-black"}`}
        />
        <input
          ref={des}
          name="description"
          type="text"
          value={enteredDescription}
          onChange={(event) => setEnteredDescription(event.target.value)}
          placeholder="Enter Description"
          className={`p-2 rounded border border-gray-400 ${darkMode ? "text-black" : "text-black"}`}
        />
        <select
          ref={categories}
          name="categories"
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          className={`p-2 rounded border border-gray-400 ${darkMode ? "text-black" : "text-black"}`}
        >
          <option value="Category">Category</option>
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          <option value="Travel">Travel</option>
          <option value="Other">Other</option>
        </select>
        <button
          type="submit"
          className="p-2 rounded bg-blue-500 text-white font-bold"
        >
          Add Expense
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Total Expenses: {totalExpenses}</h2>
        {totalExpenses > 10000 && (
          <button
            className="p-2 rounded bg-green-500 text-white font-bold mt-4"
            onClick={() => alert("Pay 10000 to Activate Premium")}
          >
            Activate Premium
          </button>
        )}
      </div>

      <div className="mt-8">
        {totalExpenses > 10000 && (
          <button
            className={`p-2 rounded ${
              darkMode ? "bg-gray-400 text-black " : "bg-gray-600 text-white"
            }`}
            onClick={handleDarkModeToggle}
          >
            Dark Mode
          </button>
        )}
      </div>

      {expenses.length > 0 && (
        <div className={`mt-8 ${darkMode ? "text-white" : "text-black"}`}>
          {expenses.map((expense, index) => (
            <div
              key={index}
              className={`flex items-center justify-between bg-white rounded p-4 mb-4 ${
                darkMode ? "text-black" : ""
              }`}
            >
              <p>
                Amount: {expense.amount} | Description: {expense.description} |
                Category: {expense.category}
              </p>
              <div>
                <button
                  onClick={() => handleEdit(expense.id)}
                  className="p-2 rounded bg-blue-500 text-white font-bold mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(expense.id)}
                  className="p-2 rounded bg-red-500 text-white font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Expenses;
