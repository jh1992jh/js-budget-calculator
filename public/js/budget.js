const loadBudgetInfo = () => {
    getBudget('budgets')
    .then(budget => {
        setTimeout(() => {
            const showBudget = document.getElementById('showBudgetBody');
        showBudget.style.transform = 'translateX(0)';
        const budgetField = document.getElementById('showBudget');
        if(budget !== undefined) {
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
        </div> `    
        } else {
            document.getElementById('clearBudget').style.display = "none"; 
            budgetField.innerHTML = `
                <div class="budgetItem">
                    <h4 class="noBudget">You have no Budget yet <br> <a href="index.html">Click here</a> to create one</h4>
                </div>
            `
        }     
        
        }, 100)
    })
   
}

const clearBudgetClick = () => {
    clearBudget('budgets');
}

window.addEventListener('DOMContentLoaded', loadBudgetInfo());
document.getElementById('clearBudget').addEventListener('click', clearBudgetClick)
