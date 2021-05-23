import { IThumbLeft } from './interfaceForView';

export default class ThumbLeft implements IThumbLeft {
  thumbDiv:JQuery;
  constructor() {
    this.thumbDiv = $('<div class="thumb left"></div>');
  }
}
