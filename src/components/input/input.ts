import {Block} from '../block/block.js';
import {ValidationErrorComp} from '../validationError/validationError.js';
import {Templator} from '../../modules/templator.js';
import {template} from './input.tmpl.js';
import {IInputCompProps} from './input.type.js';

class InputComp extends Block {
	private _inputEl: HTMLInputElement | null;
	private _validation: ValidationErrorComp;

	constructor(protected props: IInputCompProps) {
		super('div', props, {class: `field ${props.class ?? ''}`});
	}

	componentDidRender() {
		this._inputEl = this.element.querySelector('input');
		if (this.props.validation) {
			this._setValidation(this.props.validation.text);
		}
	}

	isValid(): boolean {
		if (!this.props.validation) {
			throw Error('Валидация отсутствует');
		}

		if (!this.props.validation.fn(this._inputEl?.value)) {
			this._showValidationError();
			return false;
		}

		return true;
	}

	get value(): string | undefined {
		return this._inputEl?.value;
	}

	setValue(str: string): void {
		if (this._inputEl) {
			this._inputEl.value = str;
		}
	}

	get name(): string | undefined {
		return this._inputEl?.name;
	}

	private _hideValidationError(): void {
		this._validation.hide();
	}

	private _showValidationError(): void {
		this._validation.show();
	}

	private _setValidation(text: string) {
		this._validation = new ValidationErrorComp({text});

		this._inputEl?.parentElement?.appendChild(this._validation.element);

		this._validation.hide();

		this._inputEl?.addEventListener('focus', () => {
			this._hideValidationError();
		});
		this._inputEl?.addEventListener('blur', () => {
			this.isValid();
		});
	}

	render() {
		return (new Templator(template)).compile(this.props);
	}
}

export {InputComp};
