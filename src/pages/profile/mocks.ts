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

export {profileInfoData, modalData}