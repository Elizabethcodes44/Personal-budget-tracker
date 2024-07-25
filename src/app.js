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
    type: "income",
  },
  {
    id: 3,
    name: "giveaway",
    amount: 50000,
    date: new Date(),
    type: "income",
  },
  {
    id: 4,
    name: "giveaway",
    amount: 50000,
    date: new Date(),
    type: "income",
  },
  {
    id: 5,
    name: "giveaway",
    amount: 50000,
    date: new Date(),
    type: "income",
  },
];
const list = document.getElementById("transactionList");
const status = document.getElementById("status");
const formatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  signDisplay: "always",
});
function renderList() {
  list.innerHTML = "";
  if (transactions.length === 0) {
    status.textContent = "No transactions.";
    return;
  }
  transactions.forEach(({ id, name, date, amount, type }) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
            <div class="name">
            <h4 class="title is-4">${name}</h4> 
            <p>${new Date(date).toLocaleDateString()}</p>
            </div>
            <div class= "amount">
            <span>${formatter.format(amount)}</span></div>
            <div class="action">
                <button onclick="deleteTransaction(${id})">Delete</button>
            </div>`;
            
    list.appendChild(listItem);
  });
}
renderList();
function deleteTransaction(id) {
    
    const index = transactions.findIndex((trx)=> trx.id === id);
    transactions.splice(index, 1);
    renderList();
    
}
