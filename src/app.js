const transactions = [
  {
    id: 1,
    name: "giveaway",
    amount: 50000,
    date: new Date(),
    type: "income",
  },
  {
    id: 2,
    name: "shopping",
    amount: 50000,
    date: new Date(),
    type: "expenses",
  },
  {
    id: 3,
    name: "Rent",
    amount: 100000,
    date: new Date(),
    type: "expenses",
  },
  {
    id: 4,
    name: "Salary",
    amount: 500000,
    date: new Date(),
    type: "income",
  },
  {
    id: 5,
    name: "Sanitaries",
    amount: 10000,
    date: new Date(),
    type: "expenses",
  },
 
];
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
    const incomeTotal = transactions.filter(trx => trx.type === 'income').reduce((total, trx) => total + trx.amount, 0);
    const expensesTotal = transactions.filter(trx => trx.type === 'expenses').reduce((total, trx) => total + trx.amount, 0);
    const balanceTotal = incomeTotal - expensesTotal
    balance.textContent = formatter.format(balanceTotal).substring(1);
    
    income.textContent = formatter.format(incomeTotal * -1);
    
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
    const sign = 'income' === type ? 1 : -1;
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
renderList();
newTotal();
function deleteTransaction(id) {
    
    const index = transactions.findIndex((trx)=> trx.id === id);
    transactions.splice(index, 1);
    renderList();
    newTotal();
    
}
function addTransaction(e) {
    e.preventDefault();
    const formData = new formData(this);
    //alert(formData.get('name'));
    transactions.push({
        id: transactions.length + 1,
        name: formData.get("name"),
        amount: parseFloat(formData.get("amount")),
        date: new Date(formData.get("date")),
        type: 'on' === formData.get('type') ? 'income' : "expense"
    });
    this.reset();

    renderList();
    newTotal();
}
