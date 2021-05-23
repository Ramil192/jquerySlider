import { IScale } from './interfaceForView';

export default class Scale implements IScale {
  divScale:JQuery;
  constructor() {
    this.divScale = $('<div class="scale"></div>');
  }
}
