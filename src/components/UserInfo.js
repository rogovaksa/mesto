class UserInfo {
  constructor({ userNameSelector, descriptionSelector, avatarSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._about = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  setUserInfo({ name, about, avatar, id }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
    this._userId = id;
  }
}

export default UserInfo;
