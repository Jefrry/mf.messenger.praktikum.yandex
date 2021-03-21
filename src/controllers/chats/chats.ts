import { HTTPTransport } from "../../modules/httpTransport/httpTransport.js"
import { IChatsListData } from "./chats.type.js"


class Controller {
  private readonly http: HTTPTransport
  constructor() {
    this.http = new HTTPTransport()
  }

  getChatList() {
    return this.http.get('chats', {})
      .then((res: XMLHttpRequest): IChatsListData[] => JSON.parse(res.response))
      .catch((e: XMLHttpRequest) => JSON.parse(e.responseText).reason)
  }
}

const chatsController = new Controller()
export { chatsController, IChatsListData }