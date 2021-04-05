# yandex-praktikum-chat
# Проект "чат" для Яндекс.Практикум
## Описание
На данный момент проект содержит:
- Шаблонизатор
- EventBus
- SPA функционал
- Router (в виде хэша **localhost/#/mypage**)
- HTTPTransport
- Controllers для работыс http и websocket
- Webpack для сборки приложения
- Docker с nginx сервером для развертывания в heroku
- Компоненты, которые часто используются на страницах. Каждый имеет собственный фукционал (исходя из полученных данных) и шаблон, но все они основываются на главном компоненте Block
- Различные утилиты

На странице **index.html** находится список ссылок на все имеющиеся страницы.
Heroku domain https://ya-chat-ilin.herokuapp.com
### Прототип
В папке **UI** находятся скриншоты прототипа проекта, разделенные на странницы. Некоторые элементы и иконки **могут** отличаться от изначального прототипа, который не является pixel perfect.
### Использование
Запуск проекта осуществляется с помощью команд: `npm run dev`.  Сам проект по ссылке http://localhost:3000 или https://ya-chat-ilin.herokuapp.com