import {Block} from '../block.js'
import {Templator} from "../../services/templator.js";
import {template} from './messsage.tmpl.js'
import { IMessageCompProps } from '../../types/index.js';
class MessageComp extends Block {
    constructor(protected props: IMessageCompProps) {
        super("div", props, {"class": `message relative pa-3 pr-14 ${props.class ?? ''}`});
    }

    render() {
        return (new Templator(template)).compile(this.props);
    }
}

export {MessageComp}