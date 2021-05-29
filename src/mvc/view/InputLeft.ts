import { IInputLeft } from './interface';

export default class InputLeft implements IInputLeft {
  input: JQuery;
  constructor(min:number, max:number, step:number, val:number) {
    this.input = $(`<input type="range" id="input-left" min=${min} max=${max} value=${val} step=${step}>`);
  }
}
