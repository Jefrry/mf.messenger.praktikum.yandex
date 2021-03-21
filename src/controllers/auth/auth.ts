import { HTTPTransport } from "../../services/httpTransport/httpTransport.js"
import { ILoginData, ISignupData, IUserInfoData } from "./auth.type.js"

class Controller {
  private readonly http: HTTPTransport
  constructor() {
    this.http = new HTTPTransport()
  }

  login(data: ILoginData) {
    return this.http.post('auth/signin', { data: JSON.stringify(data), headers: { name: "Content-type", value: "application/json" } })
      .then(() => null)
      .catch((e: XMLHttpRequest) => JSON.parse(e.responseText).reason)
  }

  signup(data: ISignupData) {
    return this.http.post('auth/signup', { data: JSON.stringify(data), headers: { name: "Content-type", value: "application/json" } })
      .then((res: {id: string}) => res.id)
      .catch((e: XMLHttpRequest) => JSON.parse(e.responseText).reason)
  }

  logout() {
    return this.http.post('auth/logout', {})
      .then(() => null)
      .catch((e: XMLHttpRequest) => JSON.parse(e.responseText).reason)
  }

  getUserInfo() {
    return this.http.get('auth/user', {})
      .then((res: XMLHttpRequest): IUserInfoData => JSON.parse(res.response))
      .catch((e: XMLHttpRequest) => JSON.parse(e.responseText).reason)
  }
}

const authController = new Controller()
export { authController, ILoginData, ISignupData, IUserInfoData }