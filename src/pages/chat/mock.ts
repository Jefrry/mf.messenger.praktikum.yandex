const chatListData = [{
    avatar: '<i class="fas fa-user-alt"></i>',
    name: 'My name',
    message: 'This is my message to you',
    date: '04:20',
    events: {
        click: () => {
            document.getElementsByClassName('messages_empty')[0].classList.add('d-none')
            document.getElementsByClassName('messages-chat')[0].classList.remove('d-none')
        }
    }
},{
    avatar: '<i class="fas fa-user-alt"></i>',
    name: 'Another user',
    message: 'Another message',
    date: '16:20',
    notification: '2',
    events: {
        click: () => {
            document.getElementsByClassName('messages_empty')[0].classList.add('d-none')
            document.getElementsByClassName('messages-chat')[0].classList.remove('d-none')
        }
    }
}]
const searchInputData = {
    type: 'input',
    class: 'field_gray field_center',
    placeholder: 'Поиск',
    name: 'search',
    icon: '<i class="fas fa-search"></i>'
}
const userInfoPopupData = {
    items: [{
        icon: '<i class="fas fa-plus"></i>',
        text: 'Добавить пользователя'
    }, {
        icon: '<i class="fas fa-times"></i>',
        text: 'Удалить пользователя'
    }]
}
const clipPopupData = {
    items: [{
        icon: '<i class="fas fa-image"></i>',
        text: 'Видео и фото'
    }, {
        icon: '<i class="far fa-file"></i>',
        text: 'Файл'
    }, {
        icon: '<i class="fas fa-map-marker-alt"></i>',
        text: 'Локация'
    }]
}
const sendInputData = {
    type: 'input',
    class: 'field_gray',
    placeholder: 'Сообщение',
    name: 'message',
}
const messagesData = [{
    class: 'align-self-start my-4',
    content: 'Здесь будет чужой текст сообщения',
    time: '00:00'
}, {
    class: 'image align-self-start my-1',
    content: '<img src="../../img/cat.png" alt="Image example" draggable="false">',
    time: '00:01'
},{
    class: 'message_my align-self-end my-4',
    content: 'Ложись спать, не заставляй котика плакать',
    time: `<i class="fas fa-check-double"></i>
           <span>00:34</span>`
}]

export {chatListData,searchInputData,userInfoPopupData,clipPopupData,sendInputData,messagesData}