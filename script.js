
const state = {
    balance: 6000,
    income: 7000, 
    expenditure: 600, 
    transactionsHistory: [
        {historyName: "Salary", date: "20-03-2022", amount: 3000, transType: true},
        {historyName: "Outing", date: "22-07-2022", amount: 200, transType: false},
        {historyName: "Hospital", date: "10-03-2022", amount: 500, transType: false},
        {historyName: "Allowance", date: "10-03-2022", amount: 1000, transType: true}
        
    ]
};


const balanceEl = document.querySelector("#balance-value");
const incomeEl = document.querySelector("#income-value");
const expenditureEl = document.querySelector("#expense-value");
const transHistoryContainer = document.querySelector("#trans-history-container");

const nameInput = document.querySelector("#name-input");
const dateInput = document.querySelector("#date-input");
const amountInput = document.querySelector("#amount-input");

const addIncomeBtn = document.querySelector("#add-income");
const addExpenseBtn = document.querySelector("#add-expense");

let init = () => {
    addToEventListener()
    updatedHistory()
   
};

let addToEventListener = () => {
    addIncomeBtn.addEventListener("click", addToIncome)
    addExpenseBtn.addEventListener("click", addToExpense)
};

let addToIncome = () => {
    addToTransactions(nameInput.value, dateInput.value, amountInput.value, true)
}

let addToExpense = () => {
    addToTransactions(nameInput.value, dateInput.value, amountInput.value, false)
};

let addToTransactions = (historyName, date, amount, transType) => {
    

    if (historyName === "" || amount === "" || date === ""){
        nameInput.style.border = "2px solid red"
        dateInput.style.border = " 2px solid red"
        amountInput.style.border = " 2px solid red"
    } else {
        let transaction = {
            historyName: historyName,
            date: date,
            amount: parseInt(amount),
            transType: transType
        };
        state.transactionsHistory.push(transaction);

        updatedHistory();
    }; 

}

let updatedHistory = () => {
    let balance = 0,
        income = 0,
        expenditure = 0;
        for (let i = 0; i < state.transactionsHistory.length; i++) {
            let historyItem = state.transactionsHistory;

            if (historyItem[i].transType === true) {
                income += historyItem[i].amount;
            } else if (historyItem[i].transType === false) {
               expenditure += historyItem[i].amount;
            };

        };
        balance = income - expenditure

        state.balance = balance;
        state.income = income;
        state.expenditure = expenditure;
  
        console.log(balance, income, expenditure);
        
        transactions()
};

let transactions = () => {
    
    balanceEl.innerHTML =   `$${state.balance}`
    incomeEl.innerHTML = `$${state.income}`
    expenditureEl.innerHTML = `$${state.expenditure}`;

    let nameContainerEl, transNameEl, historyItems, transDateEl, transAmountEl, deleteContainerEl, deleteBtnEl

    transHistoryContainer.innerHTML = "";

    for (let i = 0; i < state.transactionsHistory.length; i++) {
        historyItems = state.transactionsHistory;

        nameContainerEl = document.createElement("div")
        
        // Name cell
        transNameEl = document.createElement("li")
        transNameEl.append(historyItems[i].historyName)
        
        transHistoryContainer.appendChild(transNameEl)
        

        // Date Cell
        
        transDateEl = document.createElement("li")
        transDateEl.append(historyItems[i].date)
        transHistoryContainer.appendChild(transDateEl);
        
        // Amount Cell

        transAmountEl = document.createElement("li")
        if (historyItems[i].transType === true){
           transAmountEl.style.backgroundColor = "rgb(2, 142, 2)"
           transAmountEl.style.color = "#ffff"
        } else if (historyItems[i].transType === false){
            transAmountEl.style.backgroundColor = "rgb(184, 9, 4)"
            transAmountEl.style.color = "#ffff"
        }
        
        transAmountEl.innerText = `$${historyItems[i].amount}`
        transHistoryContainer.appendChild(transAmountEl);

        // Delete Button
        deleteContainerEl = document.createElement("li")
        

        deleteBtnEl = document.createElement("button")
        deleteBtnEl.innerText = "X"
        
        deleteContainerEl.appendChild(deleteBtnEl)
        transHistoryContainer.appendChild(deleteContainerEl)
        
        deleteContainerEl.style.display = "flex";
        deleteContainerEl.style.justifyContent = "center";
        deleteContainerEl.style.alignItems = "center";
        deleteBtnEl.style.padding = "0.25rem 1rem";
        deleteBtnEl.style.border= "none";

        deleteBtnEl.addEventListener("click", (event) => {
            // transHistoryContainer.remove()
            // transNameEl.style.display = "none"
            console.log(event);
        } )
    };

    
};

init();