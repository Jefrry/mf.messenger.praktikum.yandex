import {InputComp} from '../../components/input/input.js'
import {ButtonComp} from '../../components/button/button.js'
import {validationPhone, validationPassword, validationEmail, validationEmpty} from '../../utils/validator.js'
import { IInputCompProps } from '../../components/input/input.type.js'
import { Block } from '../../components/block/block.js'
import { Templator } from '../../modules/templator.js'
import { template } from './signup.tmpl.js'
import { authController, ISignupData } from '../../controllers/auth/index.js'
import { router } from '../../modules/router/router.js'
import { NotificationComp } from '../../components/notification/notification.js'

export default class PageSignup extends Block {
    inputList: InputComp[]
    constructor(protected props: any) {
        super("div", props, {"class": `page page-signup d-flex flex-column justify-center align-center ${props.class ?? ''}`});
    }

    render() {
        return (new Templator(template)).compile({})
    }

    componentDidRender() {
        this._initPage()
    }

    private _initPage() {

        const myForm = document.querySelector('form')
        const buttonsContainer = document.querySelector('.buttons')
        
        this.inputList = []
        
        const inputsData: IInputCompProps[] = [{
            type: 'email',
            placeholder: 'Почта',
            name: 'email',
            validation: {
                fn: (val: string) => validationEmail(val),
                text: 'Невалидная почта'
            }
        }, {
            type: 'input',
            placeholder: 'Логин',
            name: 'login',
            validation: {
                fn: (val: string) => validationEmpty(val),
                text: 'Логин не может быть пустой строкой'
            }
        }, {
            type: 'input',
            placeholder: 'Имя',
            name: 'first_name',
            validation: {
                fn: (val: string) => validationEmpty(val),
                text: 'Обязательное поле'
            }
        }, {
            type: 'input',
            placeholder: 'Фамилия',
            name: 'second_name',
            validation: {
                fn: (val: string) => validationEmpty(val),
                text: 'Обязательное поле'
            }
        }, {
            type: 'tel',
            placeholder: 'Телефон',
            name: 'phone',
            validation: {
                fn: (val: string) => validationPhone(val),
                text: 'Некорректный номер телефона. Введите от 11 до 13 цифр (без пробелов и тире).'
            }
        }, {
            type: 'password',
            placeholder: 'Пароль',
            name: 'password',
            validation: {
                fn: (val: string) => validationPassword(val),
                text: 'Невалидный пароль'
            }
        }, {
            type: 'password',
            placeholder: 'Пароль (еще раз)',
            name: 'password_again',
            validation: {
                fn: (val: string): boolean => {
                    const pass: InputComp | undefined = this.inputList.find((x) => x.name === 'password')
                    if (pass) return validationPassword(val) && pass.value === val
                    return false
                },
                text: 'Пароли не совпадают'
            }
        }]
        const buttonData = {
            text: 'Зарегистрироваться',
            class: 'primary',
            events: {
                click: this.signup.bind(this)
            }
        }
        
        inputsData.forEach((x) => {
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

    signup() {
        let data: ISignupData = {
            first_name: '',
            second_name: '',
            login: '',
            email: '',
            password: '',
            phone: ''
        }
        
        this.inputList.forEach(item => {
            const { isValid, name, value } = item
            
            if (!isValid.call(item)) {
                throw Error('Валидация не пройдена')
            }

            if (name) {
                data[name] = value
            }
        })

        authController.signup(data)
        .then(() => {
            router.go('chat')
        }).catch(e => {
            new NotificationComp({type: 'error', text: e});
        })
    }
}