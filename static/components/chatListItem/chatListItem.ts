import Block from '../block.js'
import Templator from "../../services/templator.js";
import template from './chatListItem.tmpl.js'
export default class Button extends Block {
    constructor(protected props: { [key:string]: any, text: string, events?: {[key:string]: Function}, class?: string }) {
        super("li", props, {"class": `chats-list__item d-flex justify-start align-center mt-2 pa-2 py-3 pointer ${props.class ?? ''}`});
    }

    render() {
        return (new Templator(template)).compile(this.props);
    }
}