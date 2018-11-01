export class LoginInput {

  username: string;
  password: string;

  constructor(username = '', password = '') {
    this.username = username;
    this.password = password;
  }

}

export class SigningInput {

  name: string;
  lastName: string;
  email: string;
  password: string;
  passwordCheck: string;
  username: string;

  constructor(username = '', email = '', name = '', lastName = '', password = '', passwordCheck = '') {
    this.username = username;
    this.password = password;
    this.passwordCheck = passwordCheck;
    this.email = email;
    this.name = name;
    this.lastName = lastName;
  }

}

export class ChangePasswordInput {

  email: string;

  constructor(email = '') {
    this.email = email;
  }

}
