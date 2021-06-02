import DemoPage from './demo-page';

$(($) => {
  const demoPage1 = new DemoPage('js-slider-n1');
  demoPage1.bindEventListeners();
  const demoPage2 = new DemoPage('js-slider-n2');
  demoPage2.bindEventListeners();
  const demoPage3 = new DemoPage('js-slider-n3');
  demoPage3.bindEventListeners();
});
