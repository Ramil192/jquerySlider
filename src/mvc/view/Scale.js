const $ = require('jquery');

module.exports =  class Scale {
  constructor(){
    this.divScale =  $('<div class="scale"></div>');
  }

  init(){
    let scale = $('<div class="scale"></div>');
    return scale;
  }
}