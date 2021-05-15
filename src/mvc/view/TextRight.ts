import { ITextRight } from './interfaceForView'

export default class TextRight implements ITextRight {
  textSpan:JQuery
  constructor() {
    this.textSpan = $('<span class="text right">75</span>');
  }
}