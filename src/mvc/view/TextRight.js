const $ = require('jquery');

module.exports = class TextRight {
  constructor() {
    this.textSpan = $('<span class="text right">75</span>');
  }
}