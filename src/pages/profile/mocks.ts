enum profileInfoDataEnum {
    email = 'Почта',
    login = 'Логин',
    first_name = 'Имя',
    second_name = 'Фамилия',
    display_name = 'Имя в чате',
    phone = 'Телефон'
}
const modalData = {
    content: `<h3 class="title">Загрузите файл</h3>
                <button class="file link">Выберите файл на компьютере</button>
                <!-- Потом на JS буду перенапрявлять клик с кнопки на инпут -->
                <input class="d-none" type="file">
                <button class="button primary">Поменять</button>`
}

export {modalData, profileInfoDataEnum}