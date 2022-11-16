
const state = {
    balance: 6000,
    income: 7000, 
    expenditure: 600, 
    transactionsHistory: [
        {historyName: "Salary", date: "20-03-2022", amount: 3000, addIncome: true},
        {historyName: "Outing", date: "22-07-2022", amount: 200, addExpense: false},
        {historyName: "Hospital", date: "10-03-2022", amount: 500, addExpense: false},
        {historyName: "Allowance", date: "10-03-2022", amount: 1000, addIncome: true}
        
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
    updatedState();
    updatedListener()
};

let updatedListener = () => {
    addIncomeBtn.addEventListener("click", addToIncome);
    addExpenseBtn.addEventListener("click", addToExpense);
}


let addToIncome = () => {
    
    let dateValue = dateInput.value
    let amountValue = amountInput.value
    amountInput.value = ""
    dateInput.value = "" 


    let transactionHistory = {
            historyName: nameInput.value,
            date: dateValue,
            amount: amountValue,
            addIncome: true
    };
    state.transactionsHistory.push(transactionHistory)
    console.log(state);
    updatedState();
};

let addToExpense = () => {
    let dateValue = dateInput.value
    let amountValue = amountInput.value
    amountInput.value = ""
    dateInput.value = ""

    let transactionHistory = {
            historyName: nameInput.value,
            date: dateValue,
            amount: amountValue,
            addExpense: false
    };
    state.transactionsHistory.push(transactionHistory)
    console.log(state);
    updatedState();

    console.log("hello expensses");
};

let updatedState = () => {
   let  income = 0,
        expenditure = 0,
        balance = 0
         
         let historyItem; 
         transHistoryContainer.innerHTML = ""

         for (let i = 0; i < state.transactionsHistory.length; i++) {
           historyItem = state.transactionsHistory
            if (historyItem[i].addIncome === true) {
                income += historyItem[i].amount
            } else if (historyItem[i].addExpense === false){
                expenditure += historyItem[i].amount
            }
            
         }
         balance = income - expenditure

         state.balance =  balance
         state.income =  income
         state.expenditure =  expenditure

         transactions()
};

let transactions = () => {
    
    balanceEl.innerText =   `$${state.balance}`
    incomeEl.innerText = `$${state.income}`
    expenditureEl.innerText = `$${state.expenditure}`

    let nameContainerEl, transNameEl, historyItems, dateContainerEl, transDateEl, amountContainerEl,
    transAmountEl, deleteContainerEl, deleteBtnEl

    historyItems = state.transactionsHistory

    for (let i = 0; i < historyItems.length; i++) {

        
        nameContainerEl = document.createElement("div")

        // Name cell
        transNameEl = document.createElement("li")
        transNameEl.append(historyItems[i].historyName)
        
        nameContainerEl.appendChild(transNameEl)
        transHistoryContainer.appendChild(nameContainerEl)

        // Date Cell
        dateContainerEl = document.createElement("div")
        transDateEl = document.createElement("li")
        transDateEl.append(historyItems[i].date)
        dateContainerEl.appendChild(transDateEl)
        transHistoryContainer.appendChild(transDateEl)
        
        // Amount Cell
        amountContainerEl = document.createElement("div")
        transAmountEl = document.createElement("li")
        if (historyItems[i].addIncome === true){
           transAmountEl.style.backgroundColor = "rgb(2, 142, 2)"
           transAmountEl.style.color = "#ffff"
        } else if (historyItems[i].addExpense === false){
            transAmountEl.style.backgroundColor = "rgb(184, 9, 4)"
            transAmountEl.style.color = "#ffff"
        }
        
        transAmountEl.innerText = `$${historyItems[i].amount}`
        amountContainerEl.appendChild(transAmountEl)
        transHistoryContainer.appendChild(amountContainerEl);

        // Delete Button
        deleteContainerEl = document.createElement("li")
        

        deleteBtnEl = document.createElement("button")
        deleteBtnEl.innerText = "X"
        
        deleteContainerEl.appendChild(deleteBtnEl)
        transHistoryContainer.appendChild(deleteContainerEl)
        
        deleteContainerEl.style.display = "flex"
        deleteContainerEl.style.justifyContent = "center"
        deleteContainerEl.style.alignItems = "center"
        deleteBtnEl.style.padding = "0.25rem 1rem"
        deleteBtnEl.style.border= "none"

        deleteBtnEl.addEventListener("click", () => {
            nameContainerEl.remove()
            dateContainerEl.innerText =""
            console.log("hello world");
        })
    }

    
};


init()