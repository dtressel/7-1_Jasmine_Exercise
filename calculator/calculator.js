window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  document.getElementById('loan-amount').value = 200000;
  document.getElementById('loan-years').value = 30;
  document.getElementById('loan-rate').value = 6.9;
  const initialValue = calculateMonthlyPayment(getCurrentUIValues());
  updateMonthly(initialValue);
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const newValue = calculateMonthlyPayment(getCurrentUIValues());
  updateMonthly(newValue);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const periodicInterestRate = (Math.round(values.rate *10000)/10000) / 1200;
  const principle = values.amount;
  const numOfPayments = values.years * 12;
  let monthlyPaymentNum
  if (periodicInterestRate !== 0) {
    monthlyPaymentNum = (principle * periodicInterestRate) / (1 - ((1 + periodicInterestRate) ** (numOfPayments * -1)));
  } else {
    monthlyPaymentNum = principle / numOfPayments;
  }
  const monthlyPaymentRounded = Math.round(monthlyPaymentNum * 100) / 100;
  const monthlyPaymentString = monthlyPaymentRounded.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return monthlyPaymentString;
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  document.getElementById('monthly-payment').textContent = monthly;
}
