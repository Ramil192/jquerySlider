import demoPage from './demo-page';

$(($) => {
  const demoPage1 = new demoPage('js-sliderN1');
  demoPage1.bindEventListeners();
  const demoPage2 = new demoPage('js-sliderN2');
  demoPage2.bindEventListeners();
  const demoPage3 = new demoPage('js-sliderN3');
  demoPage3.bindEventListeners();
});
