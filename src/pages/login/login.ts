import { InputComp } from '../../components/input/input.js'
import { ButtonComp } from '../../components/button/button.js'
import { validationPassword, validationEmpty } from '../../utils/validator.js'
import { IInputCompProps } from '../../components/input/input.type.js'
import { Block } from '../../components/block/block.js'
import { Templator } from '../../services/templator.js'
import { template } from './login.tmpl.js'
export default class PageLogin extends Block {
    constructor(protected props: any) {
        super("div", props, { "class": `page page-login d-flex flex-column justify-center align-center ${props.class ?? ''}` });
    }

    render() {
        return (new Templator('')).compile({});
    }

    async componentDidRender() {
        await (() => {
            const block = (new Templator(template)).compile({})
            this.element.innerHTML = block;
        })()
        this._initPage()
    }

    private _initPage() {
        const myForm = document.querySelector('form')
        const buttonsContainer = document.querySelector('.buttons')

        let inputList: InputComp[] = []

        const inputsData: IInputCompProps[] = [{
            type: 'input',
            placeholder: 'Логин',
            name: 'login',
            validation: {
                fn: (val: string) => validationEmpty(val),
                text: 'Логин не может быть пустой строкой'
            }
        }, {
            type: 'password',
            placeholder: 'Пароль',
            name: 'password',
            validation: {
                fn: (val: string) => validationPassword(val),
                text: 'Невалидный пароль'
            }
        }]
        const buttonData = {
            text: 'Авторизоваться',
            class: 'primary',
            events: {
                click: () => {
                    let data: { [key: string]: string } = {}

                    for (let i = 0; i < inputList.length; i++) {
                        const item = inputList[i];

                        if (!item.isValid()) {
                            throw Error('Валидация не пройдена')
                        }

                        if (item.name) {
                            data[item.name] = <string>item.value
                        }
                    }

                    console.log(data);
                }
            }
        }

        inputsData.forEach(x => {
            const el = new InputComp(x)
            inputList.push(el)
            if (myForm) {
                myForm.appendChild(el.getContent())
            }
        })
        if (buttonsContainer) {
            buttonsContainer.prepend((new ButtonComp(buttonData)).getContent())
        }
    }
}