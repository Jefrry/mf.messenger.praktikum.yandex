import InputComp from '../../components/input/input.js'
import ButtonComp from '../../components/button/button.js'
import {validationPhone, validationPassword, validationEmail, validationEmpty} from '../../utils/validator.js'

const myForm = document.querySelector('form')
const buttonsContainer = document.querySelector('.buttons')

let inputList = []

const inputsData = [{
    type: 'email',
    placeholder: 'Почта',
    name: 'email',
    validation: {
        fn: validationEmail,
        text: 'Невалидная почта'
    }
}, {
    type: 'input',
    placeholder: 'Логин',
    name: 'login',
    validation: {
        fn: validationEmpty,
        text: 'Логин не может быть пустой строкой'
    }
}, {
    type: 'input',
    placeholder: 'Имя',
    name: 'first_name',
    validation: {
        fn: validationEmpty,
        text: 'Обязательное поле'
    }
}, {
    type: 'input',
    placeholder: 'Фамилия',
    name: 'second_name',
    validation: {
        fn: validationEmpty,
        text: 'Обязательное поле'
    }
}, {
    type: 'tel',
    placeholder: 'Телефон',
    name: 'phone',
    validation: {
        fn: validationPhone,
        text: 'Некорректный номер телефона. Введите от 11 до 13 цифр (без пробелов и тире).'
    }
}, {
    type: 'password',
    placeholder: 'Пароль',
    name: 'password',
    validation: {
        fn: validationPassword,
        text: 'Невалидный пароль'
    }
}, {
    type: 'password',
    placeholder: 'Пароль (еще раз)',
    name: 'password_again',
    validation: {
        fn: validationPassword,
        text: 'Пароли не совпадают'
    }
}]
const buttonData = {
    text: 'Зарегистрироваться',
    class: 'primary',
    events: {
        click: () => {
            let data = {}

            for (let i = 0; i < inputList.length; i++) {
                const item = inputList[i];

                if (!item.isValid()) {
                    throw Error('Валидация не пройдена')
                }

                data[item.name] = item.value
            }

            console.log(data);
        }
    }
}

inputsData.forEach(x => {
    const el = new InputComp(x)
    inputList.push(el)
    myForm.appendChild(el.getContent())
})
buttonsContainer.prepend((new ButtonComp(buttonData)).getContent())