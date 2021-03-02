import {InputComp} from '../../components/input/input.js'
import {ButtonComp} from '../../components/button/button.js'
import {validationPassword, validationEmpty} from '../../utils/validator.js'
import { IInputCompProps } from '../../types/index.js';


const myForm = document.querySelector('form')
const buttonsContainer = document.querySelector('.buttons')

let inputList: InputComp[] = []

// эти моки нельзя убирать в отдельный файл, потому что идет обращение к inputList и тд
const inputsData: IInputCompProps[] = [{
    type: 'input',
    placeholder: 'Логин',
    name: 'login',
    validation: {
        fn: (val) => validationEmpty(val),
        text: 'Логин не может быть пустой строкой'
    }
}, {
    type: 'password',
    placeholder: 'Пароль',
    name: 'password',
    validation: {
        fn: (val) => validationPassword(val),
        text: 'Невалидный пароль'
    }
}]
const buttonData = {
    text: 'Авторизоваться',
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