import { Block } from "../../../../components/block/block.js";
import { ButtonComp } from "../../../../components/button/button.js";
import { InputComp } from "../../../../components/input/input.js";
import { Templator } from "../../../../modules/templator.js";
import { validationEmpty } from "../../../../utils/validator.js";


class ModalContent extends Block {
  input: InputComp;

  constructor(protected props: any) {
    super("div", props, { class: 'modal-content create-chat d-flex flex-column justify-space-between align-center pa-6' });
  }

  render() {
    return (new Templator('')).compile({})
  }

  async componentDidRender() {
    await this._initComp()
    this.contentFilled()
  }

  private _initComp() {
    this.input = new InputComp({
      type: 'input',
      placeholder: 'Название чата',
      name: 'title',
      validation: {
        text: 'Обязательное поле',
        fn: (val: string) => validationEmpty(val)
      }
    })

    this.element.appendChild(this.input.getContent())
    this.element.appendChild((new ButtonComp({
      text: 'Применить',
      class: 'primary mt-4',
      events: {
        click: () => this.createChat()
      }
    }).getContent()))
  }


  createChat() { }
  contentFilled() { }
}

export { ModalContent }