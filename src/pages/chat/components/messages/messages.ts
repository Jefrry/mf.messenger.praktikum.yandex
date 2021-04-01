import { Block } from "../../../../components/block/block.js";
import { IBlockCompProps } from "../../../../components/block/block.type.js";
import { InputComp } from "../../../../components/input/input.js";
import { MessageComp } from "../message/message.js";
import { ModalComp } from "../../../../components/modal/modal.js";
import { PopupComp } from "../../../../components/popup/popup.js";
import { userController } from "../../../../controllers/user/user.js";
import { Templator } from "../../../../modules/templator.js";
import { clipPopupData } from "../../mocks.js";
import { ModalContent } from "../modalContentUser/modalContentUser.js";
import { template } from "./messages.tmpl.js";
import { NotificationComp } from "../../../../components/notification/notification.js";
import { chatsController, IMessage } from "../../../../controllers/chats/chats.js";

class MessagesComp<T extends IBlockCompProps> extends Block {
  chatsPage: HTMLElement | null;
  title: string;
  chatId: number;
  userId: number;
  token: string;
  modalContent: ModalContent;
  modal: ModalComp;
  sendInput: InputComp;
  messagesContainer: HTMLElement | null;
  lastMessage: MessageComp;
  constructor(protected props: T) {
    super("div", props, { "class": `messages messages-chat d-flex flex-column justify-space-between ${props.class ?? ''}` });

    this.title = props.title
    this.chatId = props.chatId
    this.userId = props.userId
  }


  render() {
    this.getChatToken()
    return (new Templator(template)).compile(this.props);
  }

  componentDidRender() {
    this._initComp()
  }

  private _initComp() {
    this.chatsPage = document.querySelector('.page-chat')

    let userInfoPopupContainer: HTMLElement | null = null
    let clipPopupContainer: HTMLElement | null = null
    let userInfoButton: HTMLElement | null = null
    let clipButton: HTMLElement | null = null

    if (this.chatsPage) {
      userInfoPopupContainer = this.chatsPage.querySelector('.messages-header')
      clipPopupContainer = this.chatsPage.querySelector('.messages-controls')
      userInfoButton = this.chatsPage.querySelector('#user-info')
      clipButton = this.chatsPage.querySelector('#clip')

      this.messagesContainer = this.chatsPage.querySelector('.messages-area')
    }

    const userInfoPopup = new PopupComp({
      items: [{
        icon: '<i class="fas fa-plus"></i>',
        text: 'Добавить пользователя',
        events: {
          click: () => this.showModal(this.addUserToChat)
        }
      }, {
        icon: '<i class="fas fa-times"></i>',
        text: 'Удалить пользователя',
        events: {
          click: () => this.showModal(this.removeUserFromChat)
        }
      }]
    })
    const clipPopup = new PopupComp(clipPopupData)
    this.sendInput = new InputComp({
      type: 'input',
      class: 'field_gray',
      placeholder: 'Сообщение',
      name: 'message',
      events: {
        keyup: this.onInput.bind(this) // хз почему, но напрямую ругается
      }
    })

    if (userInfoPopupContainer) userInfoPopupContainer.appendChild(userInfoPopup.getContent())
    if (clipPopupContainer) clipPopupContainer.appendChild(clipPopup.getContent())

    if (userInfoButton) userInfoButton.onclick = () => userInfoPopup.toggleVisibility()
    if (clipButton) {
      clipButton.after(this.sendInput.getContent())
      clipButton.onclick = () => clipPopup.toggleVisibility()
    }
  }

  onInput(that: InputComp, e: KeyboardEvent) {
    if (e.key.toLocaleLowerCase() === 'enter') {
      e.preventDefault()

      if (that.value && that.value.trim() !== '') {
        this.sendMessage(that.value)
        that.setValue('')
      }
    }
  }

  showModal(fn: () => void) {
    const pageContainer = document.querySelector('.page')
    // TODO нужно будет сделать чтобы модалка принимала контент в виде HTML
    this.modalContent = new ModalContent({})
    this.modal = new ModalComp({ content: '' })
    this.modalContent.contentFilled = () => {
      this.modal.element.appendChild(this.modalContent.element)

      if (pageContainer) {
        pageContainer.prepend(this.modal.getContent())
      }
      this.modalContent.changeUsers = fn.bind(this)

      this.modal.show()
    }
  }

  addUserToChat() {
    if (!this.modalContent.input.isValid()) return

    // Все норм. Я валидацией проверяю
    // @ts-ignore
    const id: number = parseInt(this.modalContent.input.value)

    userController.addUserToChat({
      users: [id],
      chatId: this.chatId
    })
      .then(() => new NotificationComp({ type: 'success', text: 'Пользователь добавлен в чат' }))
      .catch((e) => new NotificationComp({ type: 'error', text: e }))
      .finally(() => {
        this.modal.remove()
      })
  }

  removeUserFromChat() {
    if (!this.modalContent.input.isValid()) return

    // Все норм. Я валидацией проверяю
    // @ts-ignore
    const id: number = parseInt(this.modalContent.input.value)

    userController.removeUserFromChat({
      users: [id],
      chatId: this.chatId
    })
      .then(() => new NotificationComp({ type: 'success', text: 'Пользователь удален из чата' }))
      .catch((e) => new NotificationComp({ type: 'error', text: e }))
      .finally(() => {
        this.modal.remove()
      })
  }

  getChatToken() {
    chatsController.getChatToken(this.chatId)
      .then(token => {
        this.token = token
        this.setWebsocket()
      })
      .catch(e => new NotificationComp({ type: 'error', text: e }))
  }

  setWebsocket() {
    chatsController.subOnNewMessages({ userId: this.userId, token: this.token, chatId: this.chatId }, this.newMessage.bind(this))
  }

  newMessage(data: IMessage) {
    if (data.type === 'message') {
      if (this.messagesContainer) {
        data.time = (new Date(data.time)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        this.lastMessage = new MessageComp({
          ...data,
          class: `${data.user_id === this.userId ? 'message_my align-self-end' : 'align-self-start '}
                  ${this.lastMessage?.userId === data.user_id ? 'mt-1' : 'mt-3'}`
        })
        this.messagesContainer.appendChild(this.lastMessage.getContent())
      }
    }
  }

  sendMessage(content: string) {
    chatsController.sendMessage(content)
  }
}

export { MessagesComp }