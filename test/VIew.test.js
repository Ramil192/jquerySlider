const View = require('../src/mvc/view/View');
const Model = require('../src/mvc/model/Model');
const $ = require('jquery');

describe('View', () => {
  const model = new Model({
    min: 0,
    max: 100,
    step: 1,
    valueLeft: 0,
    valueRight: 75,
    isVertical: false,
    isLabel: true,
    isScale: true,
    isDouble: true,
  })
  const element = $('<div class = "test"></div>') 
  const view = new View(element,model);

  test('', () => {
   expect(view.init).toBeDefined();
  })
})