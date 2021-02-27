import Block from '../block.js'
import Templator from "../../services/templator.js";
import template from './validationError.tmpl.js'
export default class ValidationError extends Block {
    constructor(protected props: { [key:string]: any, text: string, class?: string }) {
        super("span", props, {class: 'form__error'});
    }

    render() {
        return (new Templator(template)).compile(this.props);
    }
}