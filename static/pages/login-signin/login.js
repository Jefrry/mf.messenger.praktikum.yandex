import InputComp from '../../components/input/input.js'
import ButtonComp from '../../components/button/button.js'
import {validationPassword, validationEmpty} from '../../utils/validator.js'

const myForm = document.querySelector('form')
const buttonsContainer = document.querySelector('.buttons')

let inputList = []

const inputsData = [{
    type: 'input',
    placeholder: 'Логин',
    name: 'login',
    validation: {
        fn: validationEmpty,
        text: 'Логин не может быть пустой строкой'
    }
}, {
    type: 'password',
    placeholder: 'Пароль',
    name: 'password',
    validation: {
        fn: validationPassword,
        text: 'Невалидный пароль'
    }
}]
const buttonData = {
    text: 'Авторизоваться',
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