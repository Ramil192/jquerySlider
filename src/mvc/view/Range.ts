import { IRange } from './interface';

export default class Range implements IRange {
  rangeDiv:JQuery;
  constructor() {
    this.rangeDiv = $('<div class="range"></div>');
  }
}
