import {HTTPTransport} from '../../modules/httpTransport/httpTransport.js';
import {IChatsListData, ICreateChatData, ISubOnNewMessages, IMessage} from './chats.type.js';

class Controller {
	private readonly http: HTTPTransport
	private socket: WebSocket
	constructor() {
		this.http = new HTTPTransport();
	}

	getChatList() {
		return this.http.get('chats', {})
			.then((res: XMLHttpRequest): IChatsListData[] => JSON.parse(res.response))
			.catch((e: XMLHttpRequest) => {
				throw new Error(JSON.parse(e.responseText).reason);
			});
	}

	getChatToken(id: number) {
		return this.http.post(`chats/token/${id}`, {headers: {name: 'Content-type', value: 'application/json'}})
			.then((e: XMLHttpRequest) => JSON.parse(e.responseText).token)
			.catch((e: XMLHttpRequest) => {
				throw new Error(JSON.parse(e.responseText).reason);
			});
	}

	createChat(data: ICreateChatData) {
		return this.http.post('chats', {data: JSON.stringify(data), headers: {name: 'Content-type', value: 'application/json'}})
			.then(() => null)
			.catch((e: XMLHttpRequest) => {
				throw new Error(JSON.parse(e.responseText).reason);
			});
	}

	subOnNewMessages(data: ISubOnNewMessages, fn: (data: IMessage) => void) {
		this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${data.userId}/${data.chatId}/${data.token}`);
		this.socket.addEventListener('message', e => {
			fn(JSON.parse(e.data));
		});
	}

	sendMessage(content: string) {
		this.socket.send(JSON.stringify({
			content,
			type: 'message'
		}));
	}
}

const chatsController = new Controller();
export {chatsController, IChatsListData, ICreateChatData, ISubOnNewMessages, IMessage};
