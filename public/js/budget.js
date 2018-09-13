const loadBudgetInfo = () => {
    getBudget('budgets')
    .then(budget => {
        setTimeout(() => {
            const showBudget = document.getElementById('showBudgetBody');
        showBudget.style.transform = 'translateX(0)';
        const budgetField = document.getElementById('showBudget');
        if(budget !== undefined) {
            const displayDate = (str) => {
               const dateArr = str.split('-')
                return dateArr.reverse().join('.');
            }
            budgetField.innerHTML = `
        <div class="budgetItem">
        <p>${displayDate(budget.from)}</p>
        <h4>From</h4>
        </div>
        <div class="budgetItem">
        <p>${displayDate(budget.to)}</p>
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
    
    document.getElementById('alertBudget').style.display = "block";
    document.getElementById('clearBudget').style.display = "block";
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

function displayConfirmNotification() {
    
    getBudget('budgets')
        .then(budget => {
            var options = {
                body: `You succesfully setup a budget alert!`,
                icon: '../images/icon-96x96.png',
              } 
          
            navigator.serviceWorker.ready
                .then(function(swreg) {
                    let alert = {};
                    alert.id = 'alert'
                    alert.alertTime = new Date().getHours();
                    saveBudget('alert',alert)
                      .then(() =>  {
                        alertTime = new Date().getHours()
                        console.log(alertTime)
                          swreg.showNotification('Budget Alert', options) 

                            }
                        )
                })

        })
        .then(() => {
            if(deferredPrompt) {
                deferredPrompt.prompt();

                deferredPrompt.userChoice
                    .then(choiceResult => {

                        if(choiceResult.outcome === 'dismissed') {
                            console.log('User cancelled instalation');
                        } else {
                            console.log('User added to homescreen')
                        }
                    })
            }
        })
        
  }
  


const askForNotificationPermission = () => {

    Notification.requestPermission(function(result) {
      console.log('User Choice ', result)
      
      if(result === 'granted') {
          displayConfirmNotification();
      } else {
          return;
      }
    })
  }

window.addEventListener('DOMContentLoaded', loadBudgetInfo());
document.getElementById('clearBudget').addEventListener('click', clearBudgetClick)
document.getElementById('alertBudget').addEventListener('click', askForNotificationPermission)