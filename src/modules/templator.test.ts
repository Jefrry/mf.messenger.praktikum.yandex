import { expect } from 'chai';
import { Templator } from './templator'

describe('Шаблонизатор', () => {
  const data = {
    type: 'input',
    placeholder: 'Логин',
    name: 'login'
  }

  it('Замена переменных', () => {
    const template: string = `<input type="{{type}}" class="form__field" placeholder="{{placeholder}}" name="{{name}}" /><label for="{{name}}" class="form__label">{{placeholder}}</label>{{icon}}`
    const t = new Templator(template)

    const result = t.compile(data)
    
    expect(result).to.be.equal(`<input type="input" class="form__field" placeholder="Логин" name="login" /><label for="login" class="form__label">Логин</label>`)
  })

  it('Замена несуществующих переменных', () => {
    const template = '{{test}}'
    const t = new Templator(template)

    const result = t.compile(data)

    expect(result).to.be.equal('')
  })
})