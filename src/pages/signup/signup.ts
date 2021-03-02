import {InputComp} from '../../components/input/input.js'
import {ButtonComp} from '../../components/button/button.js'
import {validationPhone, validationPassword, validationEmail, validationEmpty} from '../../utils/validator.js'
import { IInputCompProps } from '../../types/index.js'

const myForm = document.querySelector('form')
const buttonsContainer = document.querySelector('.buttons')

let inputList: InputComp[] = []

// эти моки нельзя убирать в отдельный файл, потому что идет обращение к inputList и тд
const inputsData: IInputCompProps[] = [{
    type: 'email',
    placeholder: 'Почта',
    name: 'email',
    validation: {
        fn: (val) => validationEmail(val),
        text: 'Невалидная почта'
    }
}, {
    type: 'input',
    placeholder: 'Логин',
    name: 'login',
    validation: {
        fn: (val) => validationEmpty(val),
        text: 'Логин не может быть пустой строкой'
    }
}, {
    type: 'input',
    placeholder: 'Имя',
    name: 'first_name',
    validation: {
        fn: (val) => validationEmpty(val),
        text: 'Обязательное поле'
    }
}, {
    type: 'input',
    placeholder: 'Фамилия',
    name: 'second_name',
    validation: {
        fn: (val) => validationEmpty(val),
        text: 'Обязательное поле'
    }
}, {
    type: 'tel',
    placeholder: 'Телефон',
    name: 'phone',
    validation: {
        fn: (val) => validationPhone(val),
        text: 'Некорректный номер телефона. Введите от 11 до 13 цифр (без пробелов и тире).'
    }
}, {
    type: 'password',
    placeholder: 'Пароль',
    name: 'password',
    validation: {
        fn: (val) => validationPassword(val),
        text: 'Невалидный пароль'
    }
}, {
    type: 'password',
    placeholder: 'Пароль (еще раз)',
    name: 'password_again',
    validation: {
        fn: (val: string): boolean => {
            const pass: InputComp | undefined = inputList.find((x) => x.name === 'password')
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
        click: () => {
            let data: {[key: string]: string} = {}

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

inputsData.forEach((x) => {
    const el = new InputComp(x)
    inputList.push(el)
    if (myForm) {
        myForm.appendChild(el.getContent())
    }
})
if (buttonsContainer) {
    buttonsContainer.prepend((new ButtonComp(buttonData)).getContent())
}