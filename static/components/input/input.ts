import Block from '../block.js'
import Validation from '../validationError/validationError.js'
import Templator from "../../services/templator.js";
import template from './input.tmpl.js'

export default class Input extends Block {
  private _inputEl: HTMLInputElement | null;
  private _validation: Validation;

  constructor(protected props: { [key:string]: any, validation?: {text: string, fn: Function}, class?: string }) {
    super("div", props, {"class": `field ${props.class ?? ''}`});
  }
  
  componentDidRender() {
    this._inputEl = this.element.querySelector('input')
    if (this.props.validation) {
      this._setValidation(this.props.validation.text)
    }
  }

  isValid(): boolean {
    if (!this.props.validation) throw Error('Валидация отсутствует')


    if (!this.props.validation.fn(this._inputEl?.value)) {
      this._showValidationError()
      return false
    } else {
      return true
    }
  }

  get value(): string | undefined {
    return this._inputEl?.value
  }
  get name(): string | undefined {
    return this._inputEl?.name
  }

  private _hideValidationError(): void {
    this._validation.hide()
  }

  private _showValidationError(): void {
    this._validation.show()
  }

  private _setValidation(text: string) {
    this._validation = new Validation({text})

    this._inputEl?.parentElement?.appendChild(this._validation.element)

    this._validation.hide()

    this._inputEl?.addEventListener('focus', () => {
      this._hideValidationError()
    })
    this._inputEl?.addEventListener('blur', () => {
      this.isValid()
    })
  }

    render() {
        return (new Templator(template)).compile(this.props);
    }
}