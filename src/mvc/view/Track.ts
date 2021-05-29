import { ITrack } from './interface';

export default class Track implements ITrack {
  div:JQuery;
  constructor() {
    this.div = $('<div class="track"></div>');
  }
}
