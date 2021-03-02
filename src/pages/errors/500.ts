import {template} from './errors.tmpl.js'
import {Templator} from '../../services/templator.js'
import { data500 } from './mocks.js';

function render(query: string, block: string) {
    const root = document.querySelector(query);
    if (root) {
        root.innerHTML = block;
        return root;
    }
}

const generatedTemplate = (new Templator(template)).compile(data500)
render('.page', generatedTemplate)