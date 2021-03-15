import {Block} from '../block/block.js'
import {Templator} from "../../services/templator.js";
import {template} from './chatListItem.tmpl.js'
import { IChatListItemCompProps } from './chatListItem.type.js';
class ChatListItemComp extends Block {
    constructor(protected props: IChatListItemCompProps) {
        super("li", props, {"class": `chats-list__item d-flex justify-start align-center mt-2 pa-2 py-3 pointer ${props.class ?? ''}`});
    }

    render() {
        return (new Templator(template)).compile(this.props);
    }
}

export {ChatListItemComp}