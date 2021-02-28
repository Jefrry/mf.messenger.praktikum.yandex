import Block from '../block.js'
import Templator from "../../services/templator.js";
import template from './messsage.tmpl.js'
export default class Message extends Block {
    constructor(protected props: { [key:string]: any, content: string, time: string, class?: string }) {
        super("div", props, {"class": `message relative pa-3 pr-14 ${props.class ?? ''}`});
    }

    render() {
        return (new Templator(template)).compile(this.props);
    }
}