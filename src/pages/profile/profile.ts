import {ProfileInfoComp} from '../../components/profileInfo/profileInfo.js'
import {ModalComp} from '../../components/modal/modal.js'
import {profileInfoData, modalData} from './mocks.js'

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