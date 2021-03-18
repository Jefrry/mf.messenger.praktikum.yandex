import { ProfileInfoComp } from '../../components/profileInfo/profileInfo.js'
import { ModalComp } from '../../components/modal/modal.js'
import { modalData, profileInfoDataEnum } from './mocks.js'
import { Block } from '../../components/block/block.js'
import { Templator } from '../../services/templator.js';
import { template } from './profile.tmpl.js';
import { authController, IUserInfoData } from '../../controllers/auth/index.js';
import { IProfileInfoCompProps } from '../../components/profileInfo/profileInfo.type.js';
import { ButtonComp } from '../../components/button/button.js';
import { IButtonCompProps } from '../../components/button/button.type.js';
import { router } from '../../services/router/router.js';
export default class PageProfile extends Block {
    userInfo: IUserInfoData;
    buttonsData: IButtonCompProps[];
    buttons: ButtonComp[];
    constructor(protected props: any) {
        super("div", props, { "class": `page page-profile d-flex ${props.class ?? ''}` });

        this.buttonsData = [{
            text: 'Изменить данные',
            class: 'profile-buttons__item relative d-flex mt-5 pointer link',
            events: {
                click: this.showChangeData.bind(this)
            }
        }, {
            text: 'Изменить пароль',
            class: 'profile-buttons__item relative d-flex mt-5 pointer link',
            events: {
                click: this.showChangePassword.bind(this)
            }
        }, {
            text: 'Выйти',
            class: 'profile-buttons__item relative d-flex mt-5 pointer logout',
            events: {
                click: this.logout.bind(this)
            }
        }]
        this.buttons = []
    }

    render() {
        return (new Templator('')).compile({});
    }

    async componentDidRender() {
        await this.getUserInfo()
        await (() => {
            const block = (new Templator(template)).compile({
                name: this.userInfo.login
            })
            this.element.innerHTML = block;
        })()
        this._initPage()
    }

    private _initPage() {
        this.setButtons()
        this.setUserInfo()

        const pageContainer = document.querySelector('.page')
        const avatarHover = document.querySelector('.avatar_hover')

        const modal = new ModalComp(modalData)

        if (pageContainer) {
            pageContainer.prepend(modal.getContent())
        }

        if (avatarHover) {
            avatarHover.addEventListener('click', function (e) {
                e.preventDefault()
                modal.show()
            })
        }
    }

    async getUserInfo() {
        await authController.getUserInfo()
        .then((data: IUserInfoData) => {
            this.userInfo = data
        })
        .catch(e => {
            console.log(e);
        })
        
    }

    setUserInfo() {
        let data: IProfileInfoCompProps = {items: []}

        for (const key in this.userInfo) {
            if (profileInfoDataEnum[key]) {
                data.items.push({
                    name: profileInfoDataEnum[key],
                    value: this.userInfo[key]
                })
            }
        }

        const profileInfo = new ProfileInfoComp(data)

        const profileAvatar = document.querySelector('.profile-avatar') // для вставки через after

        if (profileAvatar) {
            profileAvatar.after(profileInfo.getContent())
        }
    }

    setButtons() {
        const buttonsContainer = document.querySelector('.profile-buttons')

        if (buttonsContainer) {
            this.buttonsData.forEach(data => {
                const button = new ButtonComp(data)
                buttonsContainer.appendChild(button.getContent())
                this.buttons.push(button)
            })
        }
    }

    removeButtons() {
        this.buttons.forEach((b, i) => {
            b.remove()
            this.buttons.splice(i, 1)
        })
    }

    showChangeData() {}
    showChangePassword() {}
    logout() {
        authController.logout()
        .then(() => {
            router.go('login')
        })
        .catch(e => {
            console.log(e);
        })
    }
}