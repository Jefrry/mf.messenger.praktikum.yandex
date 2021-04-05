import {Block} from '../block/block.js';
import {Templator} from '../../modules/templator.js';
import {template} from './validationError.tmpl.js';
import {IValidationErrorCompProps} from './validationError.type.js';
class ValidationErrorComp extends Block {
	constructor(protected props: IValidationErrorCompProps) {
		super('span', props, {class: `form__error ${props.class}`});
	}

	render() {
		return (new Templator(template)).compile(this.props);
	}
}

export {ValidationErrorComp};
