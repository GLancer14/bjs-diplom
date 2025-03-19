"use strict";

const userForm = new UserForm();
userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, (responseBody) => {
    if (responseBody.success) {
      console.log("success auth");
      location.reload();
    } else {
      console.log("failed auth");
      userForm.setLoginErrorMessage(responseBody.error);
    }
    console.log(responseBody);
  })
};

userForm.registerFormCallback = function(data) {
  ApiConnector.register(data, (responseBody) => {
    if (responseBody.success) {
      console.log("success reg");
      location.reload();
    } else {
      console.log("failed reg");
      this.setRegisterErrorMessage(responseBody.error);
    }
    console.log(responseBody);
  });
}