import DemoPage from './DemoPage'

$(() => {
  document.querySelectorAll('.js-demo-page').forEach((e) => new DemoPage(e));
});
