import ProfileInfoComp from '../../components/profileInfo/profileInfo.js'
import ModalComp from '../../components/modal/modal.js'

const profileAvatar = document.querySelector('.profile-avatar') // для вставки через after
const pageContainer = document.querySelector('.page')

const profileInfoData = {
    items: [{
        name: 'Почта',
        value: 'mymail@yandex.ru'
    },{
        name: 'Логин',
        value: 'My login'
    },{
        name: 'Имя',
        value: 'Иван'
    },{
        name: 'Фамилия',
        value: 'Иванов'
    },{
        name: 'Имя в чате',
        value: 'Chat Name'
    },{
        name: 'Телефон',
        value: '88005553535'
    }]
}
const modalData = {
    content: `<h3 class="title">Загрузите файл</h3>
                <button class="file link">Выберите файл на компьютере</button>
                <!-- Потом на JS буду перенапрявлять клик с кнопки на инпут -->
                <input class="d-none" type="file">
                <button class="button primary">Поменять</button>`
}

const profileInfo = new ProfileInfoComp(profileInfoData)
const modal = new ModalComp(modalData)

profileAvatar.after(profileInfo.getContent())
pageContainer.prepend(modal.getContent())

document.querySelector('.avatar_hover').onclick = function (e) {
    e.preventDefault()
    modal.show()
}