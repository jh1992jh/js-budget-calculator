window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const showCalc = document.getElementById('calcBudget');
  showCalc.style.transform = "translateX(0)";
  console.log('animation ran')
  },100)
})

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
  budgetObj.from = fromDay;
  budgetObj.to = toDay;
  budgetObj.total = total;
  budgetObj.expenses = expenses;
  saveBudget('budgets', budgetObj)
  return (budgetField.innerHTML = `<p>Your daily budget is: ${budget()}${currency}</p>`);
};

calculate.addEventListener('click', calculateBudget);
