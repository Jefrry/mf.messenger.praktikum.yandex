import InputComp from '../../components/input/input.js'
import ButtonComp from '../../components/button/button.js'

const myForm = document.querySelector('form')
const buttonsContainer = document.querySelector('.buttons')

let inputList = []

const inputsData = [{
    type: 'email',
    placeholder: 'Почта',
    name: 'email',
    validation: {
        fn: (v) => {
            return v !== ''
        },
        text: 'Невалидная почта'
    }
}, {
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
    type: 'input',
    placeholder: 'Имя',
    name: 'first_name',
    validation: {
        fn: (v) => {
            return v !== ''
        },
        text: 'Обязательное поле'
    }
}, {
    type: 'input',
    placeholder: 'Фамилия',
    name: 'second_name',
    validation: {
        fn: (v) => {
            return v !== ''
        },
        text: 'Обязательное поле'
    }
}, {
    type: 'tel',
    placeholder: 'Телефон',
    name: 'phone',
    validation: {
        fn: (v) => {
            return v !== ''
        },
        text: 'Невалидный телефон'
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
}, {
    type: 'password',
    placeholder: 'Пароль (еще раз)',
    name: 'password_again',
    validation: {
        fn: (v) => {
            return v !== ''
        },
        text: 'Пароли не совпадают'
    }
}]
const buttonData = {
    text: 'Зарегистрироваться',
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