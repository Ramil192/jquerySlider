import { IThumbRight } from './interfaceForView'

export default class ThumbRight implements IThumbRight {
  thumbDiv:JQuery
  constructor() {
    this.thumbDiv = $('<div class="thumb right"></div>');
  }
}