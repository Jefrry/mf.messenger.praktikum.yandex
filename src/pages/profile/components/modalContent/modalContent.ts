import { Block } from "../../../../components/block/block.js";
import { ButtonComp } from "../../../../components/button/button.js";
import { userController } from "../../../../controllers/user/user.js";
import { router } from "../../../../modules/router/router.js";
import { Templator } from "../../../../modules/templator.js";
import { template } from "./modalContent.tmpl.js";

class ModalContent extends Block {
  changeAvatarForm: HTMLFormElement | null;
  avatarInput: HTMLInputElement | null;

  constructor(protected props: any) {
    super("div", props, { class: 'modal-content avatar d-flex flex-column justify-space-between align-center pa-6' });
  }

  render() {
    return (new Templator(template)).compile({})
  }

  async componentDidRender() {
    await this._initComp()
    this.contentFilled()
  }

  private _initComp() {
    // @ts-ignore
    this.changeAvatarForm = document.getElementById('changeAvatarForm')
    // @ts-ignore
    this.avatarInput = document.getElementById('avatar')
    this.element.appendChild((new ButtonComp({
      text: 'Поменять',
      class: 'primary',
      events: {
        click: () => {
          if (this.changeAvatarForm && this.avatarInput && this.avatarInput.files?.length === 1) {
            let form = new FormData(this.changeAvatarForm)

            userController.changeAvatar(form)
              .then(() => {
                router.refresh()
              })
              .catch(e => {
                console.log(e);
              })
          }
        }
      }
    }).getContent()))
  }
  contentFilled() {}
}

export { ModalContent }