import { Block } from "../../../../components/block/block.js";
import { IBlockCompProps } from "../../../../components/block/block.type.js";
import { InputComp } from "../../../../components/input/input.js";
import { MessageComp } from "../message/message.js";
import { ModalComp } from "../../../../components/modal/modal.js";
import { PopupComp } from "../../../../components/popup/popup.js";
import { userController } from "../../../../controllers/user/user.js";
import { Templator } from "../../../../modules/templator.js";
import { clipPopupData, messagesData, sendInputData } from "../../mock.js";
import { ModalContent } from "../modalContent/modalContent.js";
import { template } from "./messages.tmpl.js";

class MessagesComp<T extends IBlockCompProps> extends Block {
  chatsPage: HTMLElement | null;
  title: string;
  id: number;
  modalContent: ModalContent;
  modal: ModalComp;
  constructor(protected props: T) {
    super("div", props, { "class": `messages messages-chat d-flex flex-column justify-space-between ${props.class ?? ''}` });

    this.title = props.title
    this.id = props.id
  }

  render() {
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
    let messagesContainer: HTMLElement | null = null

    if (this.chatsPage) {
      userInfoPopupContainer = this.chatsPage.querySelector('.messages-header')
      clipPopupContainer = this.chatsPage.querySelector('.messages-controls')
      userInfoButton = this.chatsPage.querySelector('#user-info')
      clipButton = this.chatsPage.querySelector('#clip')
      messagesContainer = this.chatsPage.querySelector('.messages-area')
    }

    const messagesList = []
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
    const sendInput = new InputComp(sendInputData)

    if (messagesData) {
      messagesData.forEach(x => {
        const el = new MessageComp(x)
        messagesList.push(el)
        if (messagesContainer) {
          messagesContainer.appendChild(el.getContent())
        }
      })
    }
    if (userInfoPopupContainer) userInfoPopupContainer.appendChild(userInfoPopup.getContent())
    if (clipPopupContainer) clipPopupContainer.appendChild(clipPopup.getContent())

    if (userInfoButton) userInfoButton.onclick = () => userInfoPopup.toggleVisibility()
    if (clipButton) {
      clipButton.after(sendInput.getContent())
      clipButton.onclick = () => clipPopup.toggleVisibility()
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
      chatId: this.id
    }).finally(() => {
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
      chatId: this.id
    }).finally(() => {
      this.modal.remove()
    })
  }
}

export { MessagesComp }