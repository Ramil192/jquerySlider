import DemoPage from './demoPage';

$(($) => {
  const demoPage1 = new DemoPage('js-sliderN1');
  demoPage1.bindEventListeners();
  const demoPage2 = new DemoPage('js-sliderN2');
  demoPage2.bindEventListeners();
  const demoPage3 = new DemoPage('js-sliderN3');
  demoPage3.bindEventListeners();
});
