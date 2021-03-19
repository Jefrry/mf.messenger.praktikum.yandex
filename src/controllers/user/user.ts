import { HTTPTransport } from "../../services/httpTransport/httpTransport.js"
import { IChangePassword, IChangeUserInfo } from "./user.type.js"

class Controller {
  private readonly http: HTTPTransport

  constructor() {
    this.http = new HTTPTransport()
  }

  changePassword(data: IChangePassword) {
    return this.http.put('user/password', { data: JSON.stringify(data), headers: { name: "Content-type", value: "application/json" } })
      .then(() => null)
      .catch((e: XMLHttpRequest) => JSON.parse(e.responseText).reason)
  }

  changeUserInfo(data: IChangeUserInfo) {
    return this.http.put('user/profile', { data: JSON.stringify(data), headers: { name: "Content-type", value: "application/json" } })
      .then(() => null)
      .catch((e: XMLHttpRequest) => JSON.parse(e.responseText).reason)
  }

  changeAvatar(data: FormData) {
    return this.http.put('user/profile/avatar', { data })
      .then(() => null)
      .catch((e: XMLHttpRequest) => JSON.parse(e.responseText).reason)
  }
}

const userController = new Controller()
export { userController, IChangePassword, IChangeUserInfo, }