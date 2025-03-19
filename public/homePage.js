const logoutButton = new LogoutButton();
logoutButton.action = () => {
  ApiConnector.logout((responseBody) => {
    if (responseBody.success) {
      location.reload();
    }
  });
};
ApiConnector.current((responseBody) => {
  if (responseBody.success) {
    ProfileWidget.showProfile(responseBody.data);
  }
});
const ratesBoard = new RatesBoard();
function getStocks() {
  ApiConnector.getStocks((responseBody) => {
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
    if (responseBody.success) {
      ProfileWidget.showProfile(responseBody.data);
      this.setMessage(responseBody.success, "Деньги успешно добавлены.");
    } else {
      this.setMessage(responseBody.success, responseBody.error);
    }
  });
};
moneyManager.conversionMoneyCallback = function(data) {
  ApiConnector.convertMoney(data, (responseBody) => {
    if (responseBody.success) {
      ProfileWidget.showProfile(responseBody.data);
      this.setMessage(responseBody.success, "Конвертация валюты выполнена успешно.");
    } else {
      this.setMessage(responseBody.success, responseBody.error);
    }
  });
};
moneyManager.sendMoneyCallback = function(data) {
  ApiConnector.transferMoney(data, (responseBody) => {
    console.log(responseBody);
    if (responseBody.success) {
      ProfileWidget.showProfile(responseBody.data);
      this.setMessage(responseBody.success, "Деньги успешно отправлены.");
    } else {
      this.setMessage(responseBody.success, responseBody.error);
    }
  });
};
const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((responseBody) => {
  if (responseBody.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(responseBody.data);
    moneyManager.updateUsersList(responseBody.data);
  }
});
favoritesWidget.addUserCallback = function(data) {
  ApiConnector.addUserToFavorites(data, (responseBody) => {
    console.log(responseBody);
    if (responseBody.success) {
      this.clearTable();
      this.fillTable(responseBody.data);
      moneyManager.updateUsersList(responseBody.data);
      this.setMessage(responseBody.success, "Пользователь успешно добавлен в избранное.");
    } else {
      this.setMessage(responseBody.success, responseBody.error);
    }
  });
};
favoritesWidget.removeUserCallback = function(id) {
  ApiConnector.removeUserFromFavorites(id, (responseBody) => {
    console.log(responseBody);
    if (responseBody.success) {
      this.clearTable();
      this.fillTable(responseBody.data);
      moneyManager.updateUsersList(responseBody.data);
      this.setMessage(responseBody.success, "Пользователь успешно удалён из списка избранных.");
    } else {
      this.setMessage(responseBody.success, responseBody.error);
    }
  });
};