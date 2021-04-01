/* eslint-disable camelcase */
interface IChangePassword {
  oldPassword: string,
  newPassword: string
}
interface IChangeUserInfo {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
}

interface IAddRemoveUserToChat {
  users: number[],
  chatId: number
}

export {IChangePassword, IChangeUserInfo, IAddRemoveUserToChat};
