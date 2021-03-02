import {ChatListItemComp} from '../../components/chatListItem/chatListItem.js'
import {InputComp} from '../../components/input/input.js'
import {PopupComp} from '../../components/popup/popup.js'
import {MessageComp} from '../../components/message/message.js'
import { chatListData, clipPopupData, messagesData, searchInputData, sendInputData, userInfoPopupData } from './mock.js'

const chatPage = document.querySelector('.page-chat')

let chatsContainer: HTMLElement | null = null
let searchContainer: HTMLElement | null = null
let userInfoPopupContainer: HTMLElement | null = null
let clipPopupContainer: HTMLElement | null = null
let userInfoButton: HTMLElement | null = null
let clipButton: HTMLElement | null = null
let messagesContainer: HTMLElement | null = null
if (chatPage) {
    chatsContainer = chatPage.querySelector('.chats-list')
    searchContainer = chatPage.querySelector('.chats-search')
    userInfoPopupContainer = chatPage.querySelector('.messages-header')
    clipPopupContainer = chatPage.querySelector('.messages-controls')
    userInfoButton = chatPage.querySelector('#user-info')
    clipButton = chatPage.querySelector('#clip')
    messagesContainer = chatPage.querySelector('.messages-area')
}


const chatList = []
const messagesList = []
const searchInput = new InputComp(searchInputData)
const userInfoPopup = new PopupComp(userInfoPopupData)
const clipPopup = new PopupComp(clipPopupData)
const sendInput = new InputComp(sendInputData)


if (chatListData) {
    chatListData.forEach(x => {
        const el = new ChatListItemComp(x)
        chatList.push(el)
        if (chatsContainer) {
            chatsContainer.appendChild(el.getContent())
        }
    })
}
if (messagesData) {
    messagesData.forEach(x => {
        const el = new MessageComp(x)
        messagesList.push(el)
        if (messagesContainer) {
            messagesContainer.appendChild(el.getContent())
        }
    })
}
if (searchContainer) searchContainer.appendChild(searchInput.getContent())
if (userInfoPopupContainer) userInfoPopupContainer.appendChild(userInfoPopup.getContent())
if (clipPopupContainer) clipPopupContainer.appendChild(clipPopup.getContent())

if (userInfoButton) userInfoButton.onclick = () => userInfoPopup.toggleVisibility()
if (clipButton) {
    clipButton.after(sendInput.getContent())
    clipButton.onclick = () => clipPopup.toggleVisibility()
}
