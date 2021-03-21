import { expect } from 'chai';
import { pathToObject } from './pathToObject'

describe('Получение значения объекта из строкового пути', () => {
  const data = {
    string: "I'm string, and you?",
    array: [0, 1, 2, 3],
    emptyArray: [],
    deepObject: {
      a: {
        string: "I'm another string",
        array: [0, 1, 2, 3],
        emptyArray: []
      }
    }
  }

  it('Получение существующих значений', () => {
    expect(pathToObject(data, 'string')).to.be.equal(data.string)
    expect(pathToObject(data, 'array')).to.be.eq(data.array)
    expect(pathToObject(data, 'emptyArray')).to.be.eq(data.emptyArray)

    expect(pathToObject(data, 'deepObject.a')).to.be.eq(data.deepObject.a)
    expect(pathToObject(data, 'deepObject.a.string')).to.be.equal(data.deepObject.a.string)
    expect(pathToObject(data, 'deepObject.a.array')).to.be.eq(data.deepObject.a.array)
    expect(pathToObject(data, 'deepObject.a.emptyArray')).to.be.eq(data.deepObject.a.emptyArray)
  })

  it('Получение дефолтного значения', () => {
    expect(pathToObject(data, 'string.a', 'Default string')).to.be.equal('Default string')
    expect(pathToObject(data, 'deepObject.b', {q: "I'm default object"})).to.be.eql({q: "I'm default object"})
  })

  it('Фаззинг', () => {
    expect(pathToObject(data, 'string.a')).to.be.undefined
    expect(pathToObject(data, 'some,wrong/symbols')).to.be.undefined
    expect(() => pathToObject(data, '')).to.be.throw()
  })
})