import { MyType, INewSettings,IDemoPage } from './interface';
import 'jquery';

class DemoPage  implements IDemoPage{
  outerContainerElement: JQuery<HTMLElement>;
  leftValue: string[];
  rightValue: boolean[];
  columnNumber: JQuery<HTMLElement>;
  columnCheckbox: JQuery<HTMLElement>;
  valueLeft: JQuery<HTMLElement>;
  valueRight: JQuery<HTMLElement>;
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

  render(): void {
    this.synchronizationLeft();
    this.synchronizationRight();
    this.bindEventListeners();
  }

  settingsObjInit(): INewSettings {
    const settingObj: MyType = {};

    this.columnNumber.each((i, e) => {
      if ((e as HTMLInputElement).dataset.key !== undefined) {
        const key = (e as HTMLInputElement).dataset.key!;
        settingObj[key] = +(e as HTMLInputElement).value;
      }
    });

    this.columnCheckbox.each((i, e) => {
      const key = (e as HTMLInputElement).dataset.key!;
      settingObj[key] = (e as HTMLInputElement).checked;
    });

    return settingObj;
  }

  synchronizationLeft(): void {
    this.plugin.data().synchronizationLeft(this.valueLeft);
  }

  synchronizationRight(): void {
    this.plugin.data().synchronizationRight(this.valueRight);
  }

  bindEventListeners(): void {
    this.columnNumber.bind('input', (e: JQuery.TriggeredEvent<HTMLElement, undefined, HTMLElement, HTMLElement>) => {
      this.plugin.data().setSettings({ [(e.target as HTMLInputElement).dataset.key!]: +(e.target as HTMLInputElement).value });
    });

    this.columnCheckbox.bind('input', (e: JQuery.TriggeredEvent<HTMLElement, undefined, HTMLElement, HTMLElement>) => {
      this.plugin.data().setSettings({ [(e.target as HTMLInputElement).dataset.key!]: (e.target as HTMLInputElement).checked });
    });
  }
}

export default DemoPage;
