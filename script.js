
const state = {
    balance: 6000,
    income: 7000, 
    expenditure: 600, 
    transactionHistory: [
        {historyName: "Salary", date: "20-03-2022", amount: 3000, type: "income" },
        {historyName: "Outing", date: "22-07-2022", amount: 200, type: "expense" },
        {historyName: "Hospital", date: "10-03-2022", amount: 500, type: "expense" }
    ]
}

const balanceEl = document.querySelector("#balance-value")
const incomeEl = document.querySelector("#income-value")
const expenditureEl = document.querySelector("#expense-value")
const transHistoryContainer = document.querySelector("#trans-history-container")

const nameInput = document.querySelector("name")
const namedisplay = document.querySelector("date")
const amountInput = document.querySelector("amount")


let operations = () => {
    balanceEl.innerText = `$${state.balance}`
    incomeEl.innerText = `$${state.income}`
    expenditureEl.innerText = `$${state.expenditure}`

    let nameContainerEl, transNameEl, historyItems, dateContainerEl, transDateEl, amountContainerEl,
    transAmountEl, deleteContainerEl, deleteBtnEl

    historyItems = state.transactionHistory

    for (let i = 0; i < historyItems.length; i++) {

        
        nameContainerEl = document.createElement("div")
        transNameEl = document.createElement("li")
        transNameEl.append(historyItems[i].historyName)
        
        nameContainerEl.appendChild(transNameEl)
        transHistoryContainer.appendChild(nameContainerEl)

        dateContainerEl = document.createElement("div")
        transDateEl = document.createElement("li")
        transDateEl.append(historyItems[i].date)
        dateContainerEl.appendChild(transDateEl)
        transHistoryContainer.appendChild(transDateEl)
        
        amountContainerEl = document.createElement("div")
        transAmountEl = document.createElement("li")
        if (historyItems.type === "income"){
            transAmountEl.classList.add("incomeAmt")
        }else if(historyItems.type === "expense"){
            transAmountEl.classList.add("expenseAmt")
        }
        transAmountEl.innerText = `$${historyItems[i].amount}`
        amountContainerEl.appendChild(transAmountEl)
        transHistoryContainer.appendChild(amountContainerEl)
        console.log(historyItems[i].type);
        
        deleteContainerEl = document.createElement("li")
        deleteContainerEl.classList.add("closeSection")

        deleteBtnEl = document.createElement("button")
        deleteBtnEl.innerText = "X"
        deleteBtnEl.classList.add("deleteButton")
        deleteContainerEl.appendChild(deleteBtnEl)
        transHistoryContainer.appendChild(deleteContainerEl)
        
    }

    
}
operations();

