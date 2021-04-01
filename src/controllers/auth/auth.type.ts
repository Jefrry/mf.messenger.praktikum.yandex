/* eslint-disable camelcase */
interface ILoginData {
  login: string,
  password: string
}

interface ISignupData {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

interface IUserInfoData {
  id: 0,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  avatar: string
}

export {ILoginData, ISignupData, IUserInfoData};
