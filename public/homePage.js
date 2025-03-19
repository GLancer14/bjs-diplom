const logoutButton = new LogoutButton();
logoutButton.action = () => {
  ApiConnector.logout((responseBody) => {
    if (responseBody.success) {
      location.reload();
    }
  });
};
ApiConnector.current((responseBody) => {
  console.log(responseBody);
  if (responseBody.success) {
    ProfileWidget.showProfile(responseBody.data);
  }
});
const ratesBoard = new RatesBoard();
function getStocks() {
  ApiConnector.getStocks((responseBody) => {
    console.log(responseBody);
    if (responseBody.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(responseBody.data);
    }
  });
}

getStocks();
let getStocksIterationId = setInterval(() => {
  getStocks();
}, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = function(data) {
  ApiConnector.addMoney(data, (responseBody) => {
    console.log(responseBody);
    if (responseBody.success) {
      ProfileWidget.showProfile(responseBody.data);
      this.setMessage(responseBody.success, "Деньги успшено добавлены!");
    } else {
      this.setMessage(responseBody.success, "Возникла ошибка при добавалении денег!");
    }
  });
};