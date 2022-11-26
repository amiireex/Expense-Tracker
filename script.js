
let state = {
    balance: 6000,
    income: 7000, 
    expenditure: 600, 
    transactionsHistory: []
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
    let localStorageState = JSON.parse(localStorage.getItem("incomeAndExpenseTracker"))

    if(localStorageState !== null) {
       state = localStorageState
    }
    updatedHistory();
    addToEventListener();
};

function idTag () {
    return Math.floor(Math.random() * 1000000);
}

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
            id: idTag(),
            historyName: historyName,
            date: date,
            amount: parseInt(amount),
            transType: transType
        };
        state.transactionsHistory.push(transaction);

        updatedHistory();
    }
        nameInput.value = "";
        amountInput.value = "";
        dateInput.value = "";
}
function onDeleteClick (event){
    const id = parseInt(event.target.getAttribute("data-id"))
    let deleteIndex;
    for (let i = 0; i < state.transactionsHistory[i].length; i++) {
       if (state.transactionsHistory[i].id === id){
            deleteIndex = i;
            break;
       }
    }
    state.transactionsHistory.splice(deleteIndex, 1)
    updatedHistory()
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

        // Storing the Transaction
        localStorage.setItem("incomeAndExpenseTracker", JSON.stringify(state))
        
        transactions()
};

let transactions = () => {
    balanceEl.innerHTML = `$${state.balance}`
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
        deleteBtnEl.setAttribute("data-id", historyItems[i].id)
        deleteBtnEl.innerText = "X"
        
        deleteBtnEl.addEventListener("click", onDeleteClick) 
        
        deleteContainerEl.appendChild(deleteBtnEl)
        transHistoryContainer.appendChild(deleteContainerEl)
        
        deleteContainerEl.style.display = "flex";
        deleteContainerEl.style.justifyContent = "center";
        deleteContainerEl.style.alignItems = "center";
        deleteBtnEl.style.padding = "0.25rem 1rem";
        deleteBtnEl.style.border= "none";
  
    }
}

init()