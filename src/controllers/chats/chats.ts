import { HTTPTransport } from "../../modules/httpTransport/httpTransport.js"
import { IChatsListData, ICreateChatData } from "./chats.type.js"


class Controller {
  private readonly http: HTTPTransport
  constructor() {
    this.http = new HTTPTransport()
  }

  getChatList() {
    return this.http.get('chats', {})
      .then((res: XMLHttpRequest): IChatsListData[] => JSON.parse(res.response))
      .catch((e: XMLHttpRequest) => {throw new Error(JSON.parse(e.responseText).reason)})
  }

  createChat(data: ICreateChatData) {
    return this.http.post('chats', { data: JSON.stringify(data), headers: { name: "Content-type", value: "application/json" } })
      .then(() => null)
      .catch((e: XMLHttpRequest) => {throw new Error(JSON.parse(e.responseText).reason)})
  }
}

const chatsController = new Controller()
export { chatsController, IChatsListData, ICreateChatData }