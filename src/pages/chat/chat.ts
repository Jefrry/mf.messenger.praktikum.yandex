import {ChatListItemComp} from './components/chatListItem/chatListItem.js';
import {InputComp} from '../../components/input/input.js';
import {searchInputData} from './mocks.js';
import {Block} from '../../components/block/block.js';
import {Templator} from '../../modules/templator.js';
import {template} from './chat.tmpl.js';
import {chatsController, IChatsListData} from '../../controllers/chats/index.js';
import {MessagesComp} from './components/messages/messages.js';
import {NotificationComp} from '../../components/notification/notification.js';
import {ButtonComp} from '../../components/button/button.js';
import {ModalContent} from './components/modalContentChat/modalContentChat.js';
import {ModalComp} from '../../components/modal/modal.js';
import {authController, IUserInfoData} from '../../controllers/auth/index.js';
export default class PageChat extends Block {
	chatsListData: IChatsListData[]
	chatsListComp: ChatListItemComp<IChatsListData>[]
	chatsPage: HTMLElement | null
	chatsListContainer: HTMLElement | null | undefined
	shownMessages: MessagesComp<{ chatId: number; title: string; userId: number }>
	userId: number | null
	modalContent: ModalContent
	modal: ModalComp
	constructor(protected props: any) {
		super('div', props, {class: `page page-chat d-flex ${props.class ?? ''}`});
	}

	render() {
		return (new Templator(template)).compile({});
	}

	componentDidRender() {
		this._initPage();
	}

	private _initPage() {
		this.getChatsList();
		if (!this.userId) {
			this.getUserId();
		}

		this.chatsPage = document.querySelector('.page-chat');

		let searchContainer: HTMLElement | null = null;
		if (this.chatsPage) {
			searchContainer = this.chatsPage.querySelector('.chats-search');
		}

		const searchInput = new InputComp(searchInputData);
		if (searchContainer) {
			searchContainer.appendChild(searchInput.getContent());
		}

		const createChatButton = new ButtonComp({
			text: 'Создать чат',
			class: 'primary mt-3',
			events: {
				click: () => this.showModal()
			}
		});
		if (searchContainer) {
			searchContainer.appendChild(createChatButton.getContent());
		}
	}

	showModal() {
		const pageContainer = document.querySelector('.page');
		this.modalContent = new ModalContent({});
		this.modal = new ModalComp({content: this.modalContent.getContent()});
		this.modalContent.contentFilled = () => {
			if (pageContainer) {
				pageContainer.prepend(this.modal.getContent());
			}

			this.modalContent.createChat = this.createChat.bind(this);

			this.modal.show();
		};
	}

	createChat() {
		if (!this.modalContent.input.isValid()) {
			return;
		}

		// Все норм. Я валидацией проверяю
		// @ts-ignore
		const title: string = this.modalContent.input.value;

		chatsController.createChat({
			title
		})
			.then(() => {
				this.getChatsList();
				new NotificationComp({type: 'success', text: 'Чат успешно создан'});
			})
			.catch(e => new NotificationComp({type: 'error', text: e}))
			.finally(() => this.modal.remove());
	}

	getChatsList() {
		chatsController.getChatList()
			.then((data: IChatsListData[]) => {
				this.chatsListData = data;
				this.setChatsList();
			})
			.catch(e => {
				new NotificationComp({type: 'error', text: e});
			});
	}

	setChatsList() {
		this.chatsListComp = [];
		this.chatsListContainer = this.chatsPage?.querySelector('.chats-list');
		this.chatsListData.forEach(x => {
			const el = new ChatListItemComp({
				...x,
				events: {
					click: this.chatClick.bind(this)
				}
			});
			this.chatsListComp.push(el);
			if (this.chatsListContainer) {
				this.chatsListContainer.appendChild(el.getContent());
			}
		});
	}

	chatClick(that: ChatListItemComp<IChatsListData>) {
		if (this.shownMessages?.chatId === that.id) {
			return;
		}

		if (!this.userId) {
			new NotificationComp({type: 'error', text: 'Не удалось получить ID пользователя, обновите страницу', time: 5000});
			return;
		}

		this.removeChat();
		this.shownMessages = new MessagesComp({userId: this.userId, chatId: that.id, title: that.title});
		this.setChat();
	}

	setChat() {
		this.chatsPage?.appendChild(this.shownMessages.element);
	}

	removeChat() {
		const emptyMessages = document.querySelector('.messages_empty');
		if (this.shownMessages) {
			this.shownMessages.remove();
		}

		if (emptyMessages) {
			emptyMessages.remove();
		}
	}

	getUserId() {
		authController.getUserInfo()
			.then((data: IUserInfoData) => {
				this.userId = data.id;
			})
			.catch(e => {
				new NotificationComp({type: 'error', text: e});
			});
	}
}
