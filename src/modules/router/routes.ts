import {IRoute} from './route.type.js';

const routes: IRoute[] = [{
	name: 'Main Page',
	path: '',
	component: () => import('../../pages/main/main.js')
}, {
	name: '404',
	path: '404',
	component: () => import('../../pages/errors/404.js')
}, {
	name: '500',
	path: '500',
	component: () => import('../../pages/errors/500.js')
}, {
	name: 'Login',
	path: 'login',
	component: () => import('../../pages/login/login.js')
}, {
	name: 'Signup',
	path: 'signup',
	component: () => import('../../pages/signup/signup.js')
}, {
	name: 'Chat',
	path: 'chat',
	component: () => import('../../pages/chat/chat.js')
}, {
	name: 'Profile',
	path: 'profile',
	component: () => import('../../pages/profile/profile.js')
}];

export {routes};
