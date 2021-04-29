export default class InputRight {
 
  constructor(min,max,step,val){
    this.input = $(`<input type="range" id="input-right" min=${min} max=${max} value=${val} step=${step}>`);
  }

}