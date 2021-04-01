/* eslint-disable camelcase */
// Это данные для бекенда
import {ProfileInfoComp} from './components/profileInfo/profileInfo.js';
import {ModalComp} from '../../components/modal/modal.js';
import {Block} from '../../components/block/block.js';
import {Templator} from '../../modules/templator.js';
import {template} from './profile.tmpl.js';
import {authController, IUserInfoData} from '../../controllers/auth/index.js';
import {IProfileInfoCompProps} from './components/profileInfo/profileInfo.type.js';
import {ButtonComp} from '../../components/button/button.js';
import {IButtonCompProps} from '../../components/button/button.type.js';
import {router} from '../../modules/router/router.js';
import {IInputCompProps} from '../../components/input/input.type.js';
import {validationEmpty, validationPassword, validationPhone} from '../../utils/validator.js';
import {InputComp} from '../../components/input/input.js';
import {IChangePassword, IChangeUserInfo, userController} from '../../controllers/user/index.js';
import {ModalContent} from './components/modalContent/modalContent.js';
import {NotificationComp} from '../../components/notification/notification.js';

enum profileInfoDataEnum {
	email = 'Почта',
	login = 'Логин',
	first_name = 'Имя',
	second_name = 'Фамилия',
	display_name = 'Имя в чате',
	phone = 'Телефон'
}
export default class PageProfile extends Block {
	userInfo: IUserInfoData;
	buttonsData: IButtonCompProps[];
	buttons: ButtonComp[];
	profileInfoList: ProfileInfoComp;
	changePasswordInputList: InputComp[];
	profileAvatarContainer: HTMLElement | null;
	buttonsContainer: HTMLElement | null;
	changeUserInfoInputList: InputComp[];

	constructor(protected props: any) {
		super('div', props, {class: `page page-profile d-flex ${props.class ?? ''}`});

		this.buttonsData = [{
			text: 'Изменить данные',
			class: 'profile-buttons__item relative d-flex mt-5 pointer link',
			events: {
				click: this.showChangeUserInfo.bind(this)
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
		}];
		this.buttons = [];
	}

	async componentDidMount() {
		await this.getUserInfo();
		this.userInfo.avatar = this.userInfo.avatar === '' ? '<i class="fas fa-user-alt"></i>' : `<img src="https://ya-praktikum.tech/${this.userInfo.avatar}"/>`;
	}

	render() {
		return (new Templator(template)).compile(this.userInfo);
	}

	componentDidRender() {
		this._initPage();
	}

	private _initPage() {
		this.setButtons();
		this.setUserInfo();
		this.setModal();
	}

	async getUserInfo() {
		await authController.getUserInfo()
			.then((data: IUserInfoData) => {
				this.userInfo = data;
			})
			.catch(e => {
				new NotificationComp({type: 'error', text: e});
			});
	}

	setModal() {
		const pageContainer = document.querySelector('.page');
		const avatarHover = document.querySelector('.avatar_hover');

		// TODO нужно будет сделать чтобы модалка принимала контент в виде HTML
		const modalContent = new ModalContent({});
		const modal = new ModalComp({content: ''});
		modalContent.contentFilled = () => {
			modal.element.appendChild(modalContent.element);

			if (pageContainer) {
				pageContainer.prepend(modal.getContent());
			}
		};

		if (avatarHover) {
			avatarHover.addEventListener('click', function (e) {
				e.preventDefault();
				modal.show();
			});
		}
	}

	setUserInfo() {
		let data: IProfileInfoCompProps = {items: []};

		for (const key in this.userInfo) {
			if (profileInfoDataEnum[key]) {
				data.items.push({
					name: profileInfoDataEnum[key],
					value: this.userInfo[key]
				});
			}
		}

		this.profileInfoList = new ProfileInfoComp(data);

		this.profileAvatarContainer = document.querySelector('.profile-avatar'); // Для вставки через after

		if (this.profileAvatarContainer) {
			this.profileAvatarContainer.after(this.profileInfoList.getContent());
		}
	}

	setButtons() {
		this.buttonsContainer = document.querySelector('.profile-buttons');

		if (this.buttonsContainer) {
			this.buttonsData.forEach(data => {
				const button = new ButtonComp(data);
				this.buttonsContainer?.appendChild(button.getContent());
				this.buttons.push(button);
			});
		}
	}

	removeButtons() {
		this.buttons.forEach(b => {
			b.remove();
		});
		this.buttons = [];
	}

	showChangeUserInfo() {
		this.profileInfoList.remove();
		this.removeButtons();

		this.changeUserInfoInputList = [];

		const inputsData: IInputCompProps[] = [];
		for (const key in this.userInfo) {
			if (profileInfoDataEnum[key]) {
				const validation = key === profileInfoDataEnum.phone ? {
					fn: (val: string) => validationPhone(val),
					text: 'Некорректный номер телефона. Введите от 11 до 13 цифр (без пробелов и тире)'
				} : {
					fn: (val: string) => validationEmpty(val),
					text: 'Обязательное поле'
				};
				inputsData.push({
					type: 'input',
					placeholder: profileInfoDataEnum[key],
					name: key,
					validation
				});
			}
		}

		const buttonData = {
			text: 'Сохранить',
			class: 'primary',
			events: {
				click: this.changeUserInfo.bind(this)
			}
		};

		inputsData.reverse().forEach(x => {
			const el = new InputComp(x);
			if (x.name) {
				el.setValue(this.userInfo[x.name]);
			}

			this.changeUserInfoInputList.push(el);
			if (this.profileAvatarContainer) {
				this.profileAvatarContainer.after(el.getContent());
			}
		});

		if (this.buttonsContainer) {
			this.buttonsContainer.appendChild((new ButtonComp(buttonData)).getContent());
		}
	}

	changeUserInfo() {
		let data: IChangeUserInfo = {
			first_name: '',
			second_name: '',
			display_name: '',
			login: '',
			email: '',
			phone: ''
		};

		this.changeUserInfoInputList.forEach(item => {
			const {isValid, name, value} = item;

			if (!isValid.call(item)) {
				throw Error('Валидация не пройдена');
			}

			if (name && name in data) {
				data[name] = value;
			}
		});

		userController.changeUserInfo(data)
			.then(() => {
				router.refresh();
			})
			.catch(e => {
				new NotificationComp({type: 'error', text: e});
			});
	}

	showChangePassword() {
		this.profileInfoList.remove();
		this.removeButtons();

		this.changePasswordInputList = [];

		const inputsData: IInputCompProps[] = [{
			type: 'password',
			placeholder: 'Старый пароль',
			name: 'oldPassword',
			validation: {
				fn: (val: string) => validationPassword(val),
				text: 'Невалидный пароль'
			}
		}, {
			type: 'password',
			placeholder: 'Новый пароль',
			name: 'newPassword',
			validation: {
				fn: (val: string) => validationPassword(val),
				text: 'Невалидный пароль'
			}
		}, {
			type: 'password',
			placeholder: 'Пароль (еще раз)',
			name: 'password_again',
			validation: {
				fn: (val: string): boolean => {
					const pass: InputComp | undefined = this.changePasswordInputList.find(x => x.name === 'newPassword');
					if (pass) {
						return validationPassword(val) && pass.value === val;
					}

					return false;
				},
				text: 'Пароли не совпадают'
			}
		}];
		const buttonData = {
			text: 'Сохранить',
			class: 'primary',
			events: {
				click: this.changePassword.bind(this)
			}
		};

		inputsData.reverse().forEach(x => {
			const el = new InputComp(x);
			this.changePasswordInputList.push(el);
			if (this.profileAvatarContainer) {
				this.profileAvatarContainer.after(el.getContent());
			}
		});

		if (this.buttonsContainer) {
			this.buttonsContainer.appendChild((new ButtonComp(buttonData)).getContent());
		}
	}

	changePassword() {
		let data: IChangePassword = {
			oldPassword: '',
			newPassword: ''
		};

		this.changePasswordInputList.forEach(item => {
			const {isValid, name, value} = item;

			if (!isValid.call(item)) {
				throw Error('Валидация не пройдена');
			}

			if (name && name in data) {
				data[name] = value;
			}
		});

		userController.changePassword(data)
			.then(() => {
				router.refresh();
			})
			.catch(e => {
				new NotificationComp({type: 'error', text: e});
			});
	}

	logout() {
		authController.logout()
			.then(() => {
				router.go('login');
			})
			.catch(e => {
				new NotificationComp({type: 'error', text: e});
			});
	}
}
