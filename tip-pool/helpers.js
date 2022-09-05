
// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects
function sumPaymentTotal(type) {
  let total = 0;

  for (let key in allPayments) { 
    let payment = allPayments[key];

    total += Number(payment[type]);
  }

  return total;
}

// converts the bill and tip amount into a tip percent
function calculateTipPercent(billAmt, tipAmt) {
  return Math.round(100 / (billAmt / tipAmt));
}

// expects a table row element, appends a newly created td element from the value
function appendTd(tr, value) {
  let newTd = document.createElement('td');
  newTd.innerText = value;

  tr.append(newTd);
}

// Appends delete button to server or payment table
function appendDeleteBtn(tr) {
  let deleteTd = document.createElement('td');
  deleteTd.textContent = '\u2716'

  tr.append(deleteTd);

  addEListenerToDeleteX(deleteTd);
}

function addEListenerToDeleteX(td) {
  td.addEventListener('click', (e) => {
    const id = e.target.parentElement.id;
    e.target.parentElement.remove();
    delete allServers[id];
    delete allPayments[id];
    updateServerTable();
    updateSummary();
  }, {once: true})
}