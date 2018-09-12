const calculate = document.getElementById('calculate');


const calculateBudget = e => {
  e.preventDefault();
  // Get the field values
  const currency = document.getElementById('currency').value;
  const total = document.getElementById('total').value;
  const expenses = document.getElementById('expenses').value;
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;

  // get the currency
  const budgetField = document.getElementById('budget');

  // turn total and expenses to a number
  const totalNum = parseInt(total);
  const expensesNum = parseInt(expenses);

  // get the days from the dates
  const fromDay = from.slice(8, 10);
  const toDay = to.slice(8, 10);

  // calculate the total days the money is for
  const totalDays = parseInt(toDay) - parseInt(fromDay);

  // calculate daily budget
  const budget = () => ((totalNum - expensesNum) / totalDays).toFixed(2);
  
  // Save budget to indexedDB
  const budgetObj = {}
  budgetObj.id = 'budget'
  budgetObj.dailyBudget = budget();
  budgetObj.currency = currency;
  budgetObj.from = from;
  budgetObj.to = to;
  budgetObj.total = total;
  budgetObj.expenses = expenses;
  saveBudget('budgets', budgetObj)
  return (budgetField.innerHTML = `<p>Your daily budget is: ${budget()}${currency}</p>`);
};

calculate.addEventListener('click', calculateBudget);


const dailyBudgetNotification = () => {
   getBudget('budgets')
      .then(budget => {
          var options = {
              body: `Your daily budget is ${budget.dailyBudget}${budget.currency}`,
              icon: '../images/icon-96x96.png',
              actions: [
                  { action: 'disableAlerts', title: 'Disable budget alerts'},
                  
              ]
            }
            navigator.serviceWorker.ready
              .then(function(swreg) {
                  swreg.showNotification('Daily Budget', options) 
              })
      })
  } 

window.addEventListener('DOMContentLoaded', () => {
  const currency = document.getElementById('currency');
  const total = document.getElementById('total');
  const expenses = document.getElementById('expenses');
  const from = document.getElementById('from');
  const to = document.getElementById('to');
  console.log(currency)
  setTimeout(() => {
    const showCalc = document.getElementById('calcBudget');
  showCalc.style.transform = "translateX(0)";
  console.log('animation ran')
  
  getAlert('alert')
    .then(alert => {
      if(alert !== undefined) {
      dailyBudgetNotification()
      }
    })
    .then(() => {
      getBudget('budgets')
        .then(budget => {
          currency.value = budget.currency;
          total.value = budget.total;
          expenses.value = budget.expenses;
          from.value = budget.from;
          to.value = budget.to;
        })
    })
  },100)
})