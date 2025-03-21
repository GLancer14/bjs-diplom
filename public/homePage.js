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
setInterval(() => {
  getStocks();
}, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = function(data) {
  ApiConnector.addMoney(data, (responseBody) => {
    if (responseBody.success) {
      ProfileWidget.showProfile(responseBody.data);
      this.setMessage(true, `Успешно добавлено ${data.amount} ${data.currency}.`);
    } else {
      this.setMessage(false, responseBody.error);
    }
  });
};
moneyManager.conversionMoneyCallback = function(data) {
  ApiConnector.convertMoney(data, (responseBody) => {
    if (responseBody.success) {
      ProfileWidget.showProfile(responseBody.data);
      this.setMessage(true, `Успешно конвертировано ${data.fromAmount} ${data.fromCurrency} в ${data.targetCurrency}.`);
    } else {
      this.setMessage(false, responseBody.error);
    }
  });
};
moneyManager.sendMoneyCallback = function(data) {
  ApiConnector.transferMoney(data, (responseBody) => {
    if (responseBody.success) {
      ProfileWidget.showProfile(responseBody.data);
      this.setMessage(true, `Успешно отправлено ${data.amount} ${data.currency} пользователю ${data.to}.`);
    } else {
      this.setMessage(false, responseBody.error);
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
    if (responseBody.success) {
      this.clearTable();
      this.fillTable(responseBody.data);
      moneyManager.updateUsersList(responseBody.data);
      this.setMessage(true, `Пользователь ${data.name} успешно добавлен в избранное.`);
    } else {
      this.setMessage(false, responseBody.error);
    }
  });
};
favoritesWidget.removeUserCallback = function(id) {
  ApiConnector.removeUserFromFavorites(id, (responseBody) => {
    if (responseBody.success) {
      this.clearTable();
      this.fillTable(responseBody.data);
      moneyManager.updateUsersList(responseBody.data);
      this.setMessage(true, `Пользователь с ID №${id} успешно удалён из списка избранных.`);
    } else {
      this.setMessage(false, responseBody.error);
    }
  });
};