import { InputComp } from '../../components/input/input.js'
import { ButtonComp } from '../../components/button/button.js'
import { validationPassword, validationEmpty } from '../../utils/validator.js'
import { IInputCompProps } from '../../components/input/input.type.js'
import { Block } from '../../components/block/block.js'
import { Templator } from '../../services/templator.js'
import { template } from './login.tmpl.js'
import { authController, ILoginData } from '../../controllers/auth/index.js'
import { router } from '../../services/router/router.js'
export default class PageLogin extends Block {
    inputList: InputComp[]
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

        this.inputList = []

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
                click: this.login.bind(this)
            }
        }

        inputsData.forEach(x => {
            const el = new InputComp(x)
            this.inputList.push(el)
            if (myForm) {
                myForm.appendChild(el.getContent())
            }
        })
        if (buttonsContainer) {
            buttonsContainer.prepend((new ButtonComp(buttonData)).getContent())
        }
    }

    login() {
        let data: ILoginData = {
            login: '',
            password: ''
        }

        for (let i = 0; i < this.inputList.length; i++) {
            const item = this.inputList[i];

            if (!item.isValid()) {
                throw Error('Валидация не пройдена')
            }

            if (item.name) {
                data[item.name] = item.value
            }
        }

        authController.login(data)
        .then(() => {
            router.go('chat')
        }).catch(e => {
            console.log(e);
            
        })
    }
}