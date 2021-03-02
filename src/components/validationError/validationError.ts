import {Block} from '../block.js'
import {Templator} from "../../services/templator.js"
import {template} from './validationError.tmpl.js'
import {IValidationErrorCompProps} from '../../types/index.js'
class ValidationErrorComp extends Block {
    constructor(protected props: IValidationErrorCompProps) {
        super("span", props, {class: `form__error ${props.class}`});
    }

    render() {
        return (new Templator(template)).compile(this.props);
    }
}

export {ValidationErrorComp}