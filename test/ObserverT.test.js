import ObserverT from '../src/mvc/Observer/ObserverT';

const observerT = new ObserverT();

const functionPlug = function (obj) {
  console.log(obj);
}

describe('ObserverT ', () => {

  test('addObserver', () => {
    observerT.addObserver(functionPlug);
    expect(observerT.observers.length).toBe(1);
  })

  test('removeObserver', () => {
    observerT.removeObserver(functionPlug);
    expect(observerT.observers.length).toBe(0);
  })

})