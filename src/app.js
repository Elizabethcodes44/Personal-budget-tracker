const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
const list = document.getElementById("transactionList");
const form = document.getElementById("transactionForm")
const status = document.getElementById("status");
const balance = document.getElementById("balance")
const income = document.getElementById("income")
const expenses = document.getElementById("expenses")
const formatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  signDisplay: "always",
});
let editId = null;
form.addEventListener('submit', addTransaction);
function newTotal() {
    const incomeTotal = transactions.filter((trx) => trx.type === "income").reduce((total, trx) => total + trx.amount, 0);
    const expensesTotal = transactions.filter((trx) => trx.type === 'expenses').reduce((total, trx) => total + trx.amount, 0);
    const balanceTotal = incomeTotal - expensesTotal
    balance.textContent = formatter.format(balanceTotal);
    
    income.textContent = formatter.format(incomeTotal);
    
    expenses.textContent = formatter.format(expensesTotal);
}

function renderList() {
  list.innerHTML = "";
  if (transactions.length === 0) {
    status.textContent = "No transactions.";
    return;
  } else{
    status.textContent = "";
  }
  transactions.forEach(({ id, name, date, amount, type }) => {
    const sign = type === "income" ? 1 : -1;
    const listItem = document.createElement("li");
    listItem.innerHTML = `
            <div class="name">
            <h4 class="title is-4" style="font-size: 2.0rem;">${name}</h4> 
            <p style="font-size: 1.5rem;">${new Date(date).toLocaleDateString()}</p>
            </div>
            <div class= "amount" style="font-size: 1.5rem; color: white">
            <span>${formatter.format(amount * sign)}</span></div>
            <div class="action mt-4 mb-6">
                <button style="font-size: 1.5rem  color: white; padding: 10px 20px;" onclick="deleteTransaction(${id})">Delete</button>
                <button style="font-size: 1.5rem color: white; padding: 10px 20px;" onClick="editTransaction(${id})">Edit<button>
            </div>`;
            
    list.appendChild(listItem);
  });
}

function deleteTransaction(id) {
    
    const index = transactions.findIndex((trx)=> trx.id === id);
    transactions.splice(index, 1);
    renderList();
    saveTransactions();
    newTotal();
    
}
function editTransaction(id) {
    const transaction = transactions.find((trx) => trx.id === id);
    if (transaction) {
      form.querySelector('[name="name"]').value = transaction.name;
      form.querySelector('[name="amount"]').value = transaction.amount;
      form.querySelector('[name="date"]').value = new Date(transaction.date).toISOString().split('T')[0];
      form.querySelector(`[name="type"][value="${transaction.type}"]`).checked = true;
      editId = id;
    }
  }
  function addTransaction(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const transaction = {
      id: editId || transactions.length + 1,
      name: formData.get("name"),
      amount: parseFloat(formData.get("amount")),
      date: new Date(formData.get("date")),
      type: formData.get("type"),
    };
  
    if (editId) {
      const index = transactions.findIndex((trx) => trx.id === editId);
      transactions[index] = transaction;
      editId = null; // Reset editId
    } else {
      transactions.push(transaction);
    }
  
    form.reset();
    renderList();
    saveTransactions();
    newTotal();
  }
  

function saveTransactions() {
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date))
    localStorage.setItem("transactions", JSON.stringify(transactions));
}
renderList();
saveTransactions();
newTotal();
