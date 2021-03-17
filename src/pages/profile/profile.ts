import { ProfileInfoComp } from '../../components/profileInfo/profileInfo.js'
import { ModalComp } from '../../components/modal/modal.js'
import { profileInfoData, modalData } from './mocks.js'
import { Block } from '../../components/block/block.js'
import { Templator } from '../../services/templator.js';
import { template } from './profile.tmpl.js';
export default class PageProfile extends Block {
    constructor(protected props: any) {
        super("div", props, { "class": `page page-profile d-flex ${props.class ?? ''}` });
    }

    render() {
        return (new Templator('')).compile({});
    }

    async componentDidRender() {
        await (() => {
            const block = (new Templator(template)).compile({})
            this.element.innerHTML = block;
        })()
        this._initPage()
    }

    private _initPage() {

        const profileAvatar = document.querySelector('.profile-avatar') // для вставки через after
        const pageContainer = document.querySelector('.page')
        const avatarHover = document.querySelector('.avatar_hover')

        const profileInfo = new ProfileInfoComp(profileInfoData)
        const modal = new ModalComp(modalData)

        if (profileAvatar) {
            profileAvatar.after(profileInfo.getContent())
        }
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
}