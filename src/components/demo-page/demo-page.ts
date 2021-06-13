import { MyType, INewSettings } from './interface';
import 'jquery';

export default class DemoPage {
  outerContainerElement: JQuery;
  leftValue: string[];
  rightValue: boolean[];
  columnNumber: JQuery;
  columnCheckbox: JQuery;
  valueLeft: JQuery;
  valueRight: JQuery;
  plugin: JQuery<HTMLElement>;

  constructor(outerContainerElement: Element) {
    this.outerContainerElement = $('html').find(outerContainerElement);
    this.leftValue = [];
    this.rightValue = [];
    this.columnNumber = this.outerContainerElement.find('.js-data-input__input[type="number"]');
    this.columnCheckbox = this.outerContainerElement.find('.js-data-input__input[type="checkbox"]');
    this.plugin = this.outerContainerElement.find('.js-demo-page__plugin').pluginRange(this.settingsObjInit());
    this.valueLeft = this.columnNumber.eq(3);
    this.valueRight = this.columnNumber.eq(4);

    this.render();
  }

  render() {
    this.synchronizationLeft();
    this.synchronizationRight();
    this.bindEventListeners();
  }
  settingsObjInit(): INewSettings {
    const settingObj: MyType = {};

    this.columnNumber.each((i, e) => {
      const key = (e as HTMLInputElement).dataset.key!;
      settingObj[key] = +(e as HTMLInputElement).value;
    });

    this.columnCheckbox.each((i, e) => {
      const key = (e as HTMLInputElement).dataset.key!;
      settingObj[key] = (e as HTMLInputElement).checked;
    });

    return settingObj;
  }

  synchronizationLeft() {
    this.plugin.data().synchronizationLeft(this.valueLeft);
  }
  synchronizationRight() {
    this.plugin.data().synchronizationRight(this.valueRight);
  }

  bindEventListeners() {
    this.columnNumber.bind('keydown', (e: JQuery.KeyDownEvent<HTMLElement, undefined, HTMLElement, HTMLElement>) => {
      if (e.keyCode === 13) {
        this.plugin.data().setSettings({ [(e.target as HTMLInputElement).dataset.key!]: (e.target as HTMLInputElement).value });
      }
    });

    this.columnCheckbox.bind('input', (e: JQuery.TriggeredEvent<HTMLElement, undefined, HTMLElement, HTMLElement>) => {
      this.plugin.data().setSettings({ [(e.target as HTMLInputElement).dataset.key!]: (e.target as HTMLInputElement).checked });
    });
  }
}
$(($) => {
  document.querySelectorAll('.js-demo-page').forEach((e) => new DemoPage(e));
});
