class UserInfo {
  constructor({ userNameSelector, descriptionSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._description = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo({ name, description }) {
    this._userName.textContent = name;
    this._description.textContent = description;
  }
}

export default UserInfo;
