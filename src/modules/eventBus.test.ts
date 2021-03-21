import { expect } from 'chai';
import { EventBus } from './eventBus';

describe('Event bus', () => {
  const eventBus = new EventBus()

  let data1 = 0
  let data2 = 0
  let data3 = 0

  const function1 = () => data1++
  const function2 = () => data2++
  const function3 = () => data3++

  const listeners: {
    [key: string]: Array<Function>
  } = {
    listener1: [function1, function2],
    listener2: [function3]
  }

  it('Установка слушателей', () => {
    for (const key in listeners) {
      listeners[key].forEach(l => {
        eventBus.on(key, l)
      });
    }

    expect(eventBus.listeners).to.be.eql(listeners)
  })

  it('Вызов слушателей', () => {
    for (const key in listeners) {
      eventBus.emit(key)
    }

    expect(data1).to.be.equal(1)
    expect(data2).to.be.equal(1)
    expect(data3).to.be.equal(1)
  })

  it('Снятие слушателей', () => {
    for (const key in listeners) {
      listeners[key].forEach((l, i) => {
        eventBus.off(key, l)

        listeners[key].splice(i, 1)
        if (listeners[key].length === 0) delete listeners[key]

        expect(eventBus.listeners).to.be.eql(listeners)
      })
    }
  })

  it('Фаззинг', () => {
    expect(() => eventBus.emit('qwerty')).to.be.throw()
  })
})