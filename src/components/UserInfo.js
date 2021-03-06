export class UserInfo {
    constructor({ name, info, avatar, id }) {
        this._name = document.querySelector(name);
        this._info = document.querySelector(info);
        this._avatar = document.querySelector(avatar);
        this._id = id;
    }
    getUserInfo() {
        return {
            name: this._name.textContent,
            info: this._info.textContent
        }
    }
    setUserInfo({ newName, newInfo }) {
        this._name.textContent = newName;
        this._info.textContent = newInfo;
    }
    setAvatar(newAvatar) {
        this._avatar.src = newAvatar;
    }
    setUserId(id) {
        this.id = id;
    }
}