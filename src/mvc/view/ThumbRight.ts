import { IThumbRight } from './interface';

export default class ThumbRight implements IThumbRight {
  thumbDiv:JQuery;
  constructor() {
    this.thumbDiv = $('<div class="thumb right"></div>');
  }
}
