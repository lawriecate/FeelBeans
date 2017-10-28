
var purchaseAPI = null;
var accountAPI = null;

  $(function(){

    require(['account', 'purchase'], function (account, purchase) {
      var apikey = '10b91f2c9481dfe46e13edbeac331dee';
      accountAPI = account.initWithKey(apikey);
      purchaseAPI = purchase.initWithKey(apikey);


      var purchaseHappiness = {
        date: Math.round((new Date()).getTime()),
        happiness: "happy"
      }

      addPurchaseHappiness("59f45ab5a73e4942cdafe4b6", purchaseHappiness);
      setUserAccount("Andrew Parkes", 15, 10)

      console.log(getPurchaseHappinessCollection("59f45ab5a73e4942cdafe4b6"));

      getAccountPurchases (apikey, account, purchase);
    });
  });

function getAccountPurchases (apikey, account, purchase) {

  var accounts = accountAPI.getAllByCustomerId("59f45ab5a73e4942cdafe4b6");

  var accountsString = "Purchase history: <br>";

  var purchases = [];

  $.each(accounts, function(i, account) {
        purchases = purchases.concat(purchaseAPI.getAll(account._id));
        console.log(purchases);
  });

  $.each(purchases, function(i, purchase) {
      accountsString = accountsString + "Merchant ID: " + purchase.merchant_id +  " Value: " + purchase.amount + " Description: " + purchase.description + "<br>";
  });

  $('#accounts').html(accountsString);

  return purchases;
}

function localStorageAvailable() {
  if (typeof(Storage) !== "undefined") {
    return true;
  } else {
    document.getElementById("body").innerHTML = "Sorry, your browser does not support Web Storage...";
    return false;
  }
}

function addPurchaseHappiness(purchaseID, purchaseHappiness) {
  if (localStorageAvailable()) {
    previousStoredValue = JSON.parse(localStorage.getItem("purchase_" + purchaseID));
    if(previousStoredValue != null) {
      previousStoredValue.push(purchaseHappiness);
    } else {
      previousStoredValue = [purchaseHappiness];
    }

    localStorage.setItem("purchase_" + purchaseID, JSON.stringify(previousStoredValue));
  }
}

function getPurchaseHappinessCollection(purchaseID) {
  if (localStorageAvailable()) {
    return JSON.parse(localStorage.getItem("purchase_" + purchaseID));
  }
}

function setUserAccount(username, weekdayGoal, weekendGoal) {
  var account = {
    username: username,
    weekdayGoal: weekdayGoal,
    weekendGoal: weekendGoal
  }

  if (localStorageAvailable()) {
    localStorage.setItem("useraccount", JSON.stringify(account));
  }
}

function setTip(merchantID, tip) {
  if (localStorageAvailable()) {
    localStorage.setItem("tip_" + merchantID, tip);
  }
}

function setDay(date, goal, expenditure) {

  //round down to the start of the day
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  var day = {
    date: date.getTime(),
    goal: goal,
    expenditure: expenditure
  }

  localStorage
}

function submitPurchaseForm() {
  var form = document.getElementById("purchaseForm");

  var purchase = {
    merchant_id: purchaseForm[0].value,
    medium: purchaseForm[1].value,
    purchase_date: purchaseForm[2].value,
    amount: parseFloat(purchaseForm[3].value),
    description: purchaseForm[4].value
  }

  var accounts = accountAPI.getAllByCustomerId("59f45ab5a73e4942cdafe4b6");
  var accountID = accounts[0]._id;
  console.log(accounts[0]);

  addPurchase(accountID, purchase);

  console.log(purchase);
}

function addPurchase(accountID, purchase) {
  console.log(JSON.stringify(purchase))
  console.log(purchaseAPI.createPurchase(accountID, JSON.stringify(purchase)));
}
