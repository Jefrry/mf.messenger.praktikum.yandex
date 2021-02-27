import InputComp from '../../components/input/input.js'
import ButtonComp from '../../components/button/button.js'

const myForm = document.querySelector('form')
const buttonsContainer = document.querySelector('.buttons')

let inputList = []

const inputsData = [{
    type: 'input',
    placeholder: 'Логин',
    name: 'login',
    validation: {
        fn: (v) => {
            return v !== ''
        },
        text: 'Логин не может быть пустой строкой'
    }
}, {
    type: 'password',
    placeholder: 'Пароль',
    name: 'password',
    validation: {
        fn: (v) => {
            return v !== ''
        },
        text: 'Невалидный пароль'
    }
}]
const buttonData = {
    text: 'Авторизоваться',
    class: 'primary',
    events: {
        click: () => {
            let data = {}

            inputList.forEach(x => {
                data[x.name] = x.value
            })

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