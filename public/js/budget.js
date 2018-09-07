const loadBudgetInfo = () => {
   getBudget('budgets')
    .then(budget => {
        const budgetField = document.getElementById('showBudget');
        budgetField.innerHTML = `
        <div class="budgetItem">
        <p>${budget.from}</p>
        <h4>From</h4>
        </div>
        <div class="budgetItem">
        <p>${budget.to}</p>
        <h4>To</h4>
        </div>
        <div class="budgetItem">
        <p>${budget.total}${budget.currency}</p>
        <h4>Spendable Money</h4>
        </div>
        <div class="budgetItem">
        <p>${budget.expenses}${budget.currency}</p>
        <h4>Expenses</h4>
        </div>
        <div class="budgetItem">
        <p>${budget.dailyBudget}${budget.currency}</p>
        <h4>Daily Budget</h4>
        </div>       
        `
    })
   
}

const clearBudgetClick = () => {
    console.log(clearBudget('budgets'));
}

window.addEventListener('DOMContentLoaded', loadBudgetInfo());
document.getElementById('clearBudget').addEventListener('click', clearBudgetClick)
