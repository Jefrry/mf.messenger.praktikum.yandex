import Block from '../block.js'
import Templator from "../../services/templator.js";
import template from './button.tmpl.js'
export default class Button extends Block {
    constructor(protected props: { [key:string]: any, text: string, events?: {[key:string]: Function}, class?: string }) {
        super("button", props, {"class": `button ${props.class ?? ''}`});
    }

    render() {
        return (new Templator(template)).compile(this.props);
    }
}