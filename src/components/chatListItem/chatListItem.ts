import { Block } from '../block/block.js'
import { Templator } from "../../services/templator.js";
import { template } from './chatListItem.tmpl.js'
import { IBlockCompProps } from '../block/block.type.js';
class ChatListItemComp<T extends IBlockCompProps> extends Block {
    id: number;
    title: string;
    constructor(protected props: T) {
        super("li", props, { "class": `chats-list__item d-flex justify-start align-center mt-2 pa-2 py-3 pointer ${props.class ?? ''}` });

        this.id = props.id
        this.title = props.title
    }

    render() {
        return (new Templator(template)).compile(this.props);
    }
}

export { ChatListItemComp }