import {Block} from '../../../../components/block/block.js'
import {Templator} from "../../../../modules/templator.js";
import {template} from './messsage.tmpl.js'
import { IMessage } from '../../../../controllers/chats/index.js';
import { IBlockCompProps } from '../../../../components/block/block.type.js';
class MessageComp extends Block {
    userId: number;
    // @ts-ignore
    // ЭТО ВООБЩЕ ЧТО?
    // @ts-ignore
    constructor(protected props: IMessage extends IBlockCompProps) {
        super("div", props, { "class": `message relative pa-3 pr-14 ${props.class ?? ''}` });
        this.userId = props.user_id
    }

    render() {
        return (new Templator(template)).compile(this.props);
    }
}

export {MessageComp}