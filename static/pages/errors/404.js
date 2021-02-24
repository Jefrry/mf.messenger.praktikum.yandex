import template from './errors.tmpl.js'
import Templator from '../../services/templator.js'

function render(query, block) {
    const root = document.querySelector(query);
    root.innerHTML = block;
    return root;
}

const data = {
    code: 404,
    text: 'Не туда попали',
    backText: 'Назад к чатам'
}

const generatedTemplate = (new Templator(template)).compile(data)
render('.page', generatedTemplate)