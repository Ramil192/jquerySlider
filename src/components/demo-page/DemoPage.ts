import { ISetSettings, INewSettings, IDemoPage } from './interface';
import 'jquery';

class DemoPage implements IDemoPage {
  outerContainerElement: JQuery<HTMLElement>;
  leftValue: string[];
  rightValue: boolean[];
  columnNumber: JQuery<HTMLInputElement>;
  columnCheckbox: JQuery<HTMLInputElement>;
  valueLeft: JQuery<HTMLElement>;
  valueRight: JQuery<HTMLElement>;
  plugin: JQuery<HTMLElement>;

  constructor(outerContainerElement: Element) {
    this.outerContainerElement = $('html').find(outerContainerElement);
    this.leftValue = [];
    this.rightValue = [];
    this.columnNumber = this.outerContainerElement.find<HTMLInputElement>('.js-data-input__input[type="number"]');
    this.columnCheckbox = this.outerContainerElement.find<HTMLInputElement>('.js-data-input__input[type="checkbox"]');
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
    const settingObj: ISetSettings = {};

    this.columnNumber.each((i, e) => {
      if (e.dataset.key !== undefined) {
        const key = e.dataset.key!;
        settingObj[key] = Number(e.value);
      }
    });

    this.columnCheckbox.each((i, e) => {
      const key = e.dataset.key!;
      settingObj[key] = e.checked;
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
    this.columnNumber.bind('input', (e) => {
      this.plugin.data().setSettings({ [e.target.dataset.key!]: Number(e.target.value) });
    });

    this.columnCheckbox.bind('input', (e) => {
      this.plugin.data().setSettings({ [e.target.dataset.key!]: e.target.checked });
    });
  }
}

export default DemoPage;
