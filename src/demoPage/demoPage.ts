import { MyType, INewSettings } from '../mvc/model/interfaceForModel';

export default class DemoPage {
  className: string;
  leftValue: string[];
  rightValue: boolean[];
  itemLeft: JQuery;
  itemRight: JQuery;
  plug: JQuery<HTMLElement>;

  constructor(className: string) {
    this.className = className;
    this.leftValue = [];
    this.rightValue = [];
    this.itemLeft = $(`.${className}__itemLeft`)!;
    this.itemRight = $(`.${className}__itemRight`)!;
    this.plug = $(`.${className}__plugin`).pluginRange(this.settingsObjInit());
  }

  settingsObjInit(): INewSettings {
    const settingObj: MyType = {};

    document.querySelectorAll(`.${this.className}__inputNumber`).forEach((e) => {
      const key = (e as HTMLInputElement).dataset.key!;
      settingObj[key] = +(e as HTMLInputElement).value;
    });

    document.querySelectorAll(`.${this.className}__inputCheckbox`).forEach((e) => {
      const key = (e as HTMLInputElement).dataset.key!;
      settingObj[key] = (e as HTMLInputElement).checked;
    });

    return settingObj;
  }

  bindEventListeners() {
    this.itemLeft.bind('keydown', (e:JQuery.KeyDownEvent<HTMLElement, undefined, HTMLElement, HTMLElement>) => {
      if (e.keyCode === 13) {
        this.plug.data().setSettings({ [(e.target as HTMLInputElement).dataset.key!]: (e.target as HTMLInputElement).value });
      }
    });

    this.itemRight.bind('input', (e:JQuery.TriggeredEvent<HTMLElement, undefined, HTMLElement, HTMLElement>) => {
      this.plug.data().setSettings({ [(e.target as HTMLInputElement).dataset.key!]: (e.target as HTMLInputElement).checked });
    });
  }
}
