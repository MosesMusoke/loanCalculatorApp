import React, { useState } from "react";

function App() {
  // Here we set states for each of our user inputs because we expect them to change.
  const [loanAmount, setLoanAmount] = useState("");
  const [annualInterestRate, setAnnualInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  // Here we set states for each of our user outputs because we expect them to also change.
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [error, setError] = useState("");

  const calculateLoan = () => {
    // On clicking the calculate button below, it will call this function.
    // And before we calculate anything we need to verify that the user has put value in the input.
    if (!loanAmount || !annualInterestRate || !loanTerm) {
      setError("Please fill in all fields.");
      return;
    }

    const monthlyInterestRate = (annualInterestRate / 100) / 12;
    const numberOfMonthlyPayments = loanTerm * 12;
    const numerator = loanAmount * monthlyInterestRate;
    const denominator = 1 - Math.pow(1 + monthlyInterestRate, -numberOfMonthlyPayments);

    const monthlyPaymentAmount = numerator / denominator;
    const totalInterestPaid = monthlyPaymentAmount * numberOfMonthlyPayments - loanAmount;

    // I then update the total amount to be paid monthly and the overall total interest paid
    setMonthlyPayment(monthlyPaymentAmount.toFixed(2));
    setTotalInterest(totalInterestPaid.toFixed(2));
    setError("");
  };

  return (
    <div className="bg-blue-200 min-h-screen flex justify-center items-center text-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-semibold mb-4">LOAN CALCULATOR</h1>

        <div className="mb-4">
          <label className="block mb-1">Loan Amount (UGX):</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Annual Interest Rate (%):</label>
          <input
            type="number"
            value={annualInterestRate}
            onChange={(e) => setAnnualInterestRate(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Loan Term (Years):</label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          onClick={calculateLoan}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Calculate
        </button>

        {error && <div className="text-red-500 mt-2">{error}</div>}
        {monthlyPayment && totalInterest && (
          <div className="mt-4">
            <div className="mb-4 mt-4">
              <strong>Monthly Payment:</strong> UGX {monthlyPayment}
            </div>
            <div className="mb-4 mt-4">
              <strong>Total Interest Paid:</strong> UGX {totalInterest}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


