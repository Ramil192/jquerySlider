import { ITrack } from './interfaceForView';

export default class Track implements ITrack {
  div:JQuery;
  constructor() {
    this.div = $('<div class="track"></div>');
  }
}
