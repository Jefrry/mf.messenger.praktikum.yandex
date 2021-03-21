import { ChatListItemComp } from '../../components/chatListItem/chatListItem.js'
import { InputComp } from '../../components/input/input.js'
import { searchInputData} from './mock.js'
import { Block } from '../../components/block/block.js'
import { Templator } from '../../services/templator.js'
import { template } from './chat.tmpl.js'
import { chatsController, IChatsListData } from '../../controllers/chats/index.js'
import { MessagesComp } from './components/messages/messages.js'
export default class PageChat extends Block {
    chatsListData: IChatsListData[]
    chatsListComp: ChatListItemComp<IChatsListData>[]
    chatsPage: HTMLElement | null
    chatsListContainer: HTMLElement | null | undefined
    shownMessages: MessagesComp<{ id: number; title: string }>
    constructor(protected props: any) {
        super("div", props, { "class": `page page-chat d-flex ${props.class ?? ''}` });
    }

    render() {
        return (new Templator(template)).compile({});
    }

    async componentDidRender() {
        this._initPage()
    }

    private _initPage() {
        this.getChatsList()

        this.chatsPage = document.querySelector('.page-chat')

        let searchContainer: HTMLElement | null = null
        if (this.chatsPage) {
            searchContainer = this.chatsPage.querySelector('.chats-search')
        }
        const searchInput = new InputComp(searchInputData)
        if (searchContainer) searchContainer.appendChild(searchInput.getContent())
    }

    getChatsList() {
        chatsController.getChatList()
            .then((data: IChatsListData[]) => {
                this.chatsListData = data
                // дополняю немного данные, так как на данном спринте с сообщениями не работаю
                this.chatsListData.forEach(c => {
                    c.message = 'Ths is message example'
                    c.date = '20:33'
                })
                this.chatsListData[0].notification = 3
                this.setChatsList()
            })
            .catch(e => {
                console.log(e);
            })
    }

    setChatsList() {
        this.chatsListComp = []
        this.chatsListContainer = this.chatsPage?.querySelector('.chats-list')
        this.chatsListData.forEach(x => {
            const el = new ChatListItemComp({
                ...x,
                events: {
                    click: this.chatClick.bind(this)
                }
            })
            this.chatsListComp.push(el)
            if (this.chatsListContainer) {
                this.chatsListContainer.appendChild(el.getContent())
            }
        })
    }

    chatClick(that: ChatListItemComp<IChatsListData>) {
        this.removeChat()
        this.shownMessages = new MessagesComp({ id: that.id, title: that.title })
        this.setChat()
    }

    setChat() {
        this.chatsPage?.appendChild(this.shownMessages.element)
    }

    removeChat() {
        const emptyMessages = document.querySelector('.messages_empty')
        if (this.shownMessages) {
            this.shownMessages.remove()
        }
        if (emptyMessages) {
            emptyMessages.remove()
        }
    }
}