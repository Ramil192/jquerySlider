import Observer from '../src/mvc/Observer/Observer';

const observerT = new Observer();

const functionPlug = function (obj) {
  console.log(obj);
};

describe('Observer ', () => {
  test('addObserver', () => {
    observerT.addObserver(functionPlug);
    expect(observerT.observers.length).toBe(1);
  });

  test('removeObserver', () => {
    observerT.removeObserver(functionPlug);
    expect(observerT.observers.length).toBe(0);
  });
});
