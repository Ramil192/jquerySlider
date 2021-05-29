import { IScale } from './interface';

export default class Scale implements IScale {
  divScale:JQuery;
  constructor() {
    this.divScale = $('<div class="scale"></div>');
  }
}
