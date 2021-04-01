import {Block} from '../../../../components/block/block.js'
import {Templator} from "../../../../modules/templator.js";
import {template} from './messsage.tmpl.js'
import { IMessage } from '../../../../controllers/chats/index.js';
import { IBlockCompProps } from '../../../../components/block/block.type.js';

interface IMessageProps extends IMessage, IBlockCompProps { }
class MessageComp extends Block {
    userId: number;
    constructor(protected props: IMessageProps) {
        super("div", props, { "class": `message relative pa-3 pr-14 ${props.class ?? ''}` });
        this.userId = props.user_id
    }

    render() {
        return (new Templator(template)).compile(this.props);
    }
}

export {MessageComp}