import { MyType, INewSettings } from '../mvc/model/interfacel';

export default class demoPage {
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
    this.itemLeft = $(`.${className}__item-left`)!;
    this.itemRight = $(`.${className}__item-right`)!;
    this.plug = $(`.${className}__plugin`).pluginRange(this.settingsObjInit());
  }

  settingsObjInit(): INewSettings {
    const settingObj: MyType = {};

    document.querySelectorAll(`.${this.className}__input-number`).forEach((e) => {
      const key = (e as HTMLInputElement).dataset.key!;
      settingObj[key] = +(e as HTMLInputElement).value;
    });

    document.querySelectorAll(`.${this.className}__input-checkbox`).forEach((e) => {
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
