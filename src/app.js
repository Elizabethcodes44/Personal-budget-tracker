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
            <h4 class="title is-4">${name}</h4> 
            <p>${new Date(date).toLocaleDateString()}</p>
            </div>
            <div class= "amount">
            <span>${formatter.format(amount * sign)}</span></div>
            <div class="action">
                <button onclick="deleteTransaction(${id})">Delete</button>
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
function addTransaction(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const name = formData.get("name");
    const amount = parseFloat(formData.get("amount"));
    const date = new Date(formData.get("date"));
    const type = formData.get("type");
    
    if (!name || isNaN(amount) || amount <= 0 || !type) {
        alert("Please fill in all fields correctly.");
        return;
    }
    
    transactions.push({
        id: transactions.length + 1,
        name,
        amount,
        date,
        type
    });
    
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
