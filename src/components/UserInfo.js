class UserInfo {
  constructor({ userNameSelector, descriptionSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._description = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo({ userName, description }) {
    this._userName.textContent = userName;
    this._description.textContent = description;
  }
}

export default UserInfo;
