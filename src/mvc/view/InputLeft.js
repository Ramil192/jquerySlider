export default class InputLeft {

  constructor(min,max,step,val){
    this.input = $(`<input type="range" id="input-left" min=${min} max=${max} value=${val} step=${step}>`);
  }

}