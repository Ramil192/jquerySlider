import { IInputRight } from './interfaceForView';

export default class InputRight implements IInputRight {
  input: JQuery;
  constructor(min:number, max:number, step:number, val:number) {
    this.input = $(`<input type="range" id="input-right" min=${min} max=${max} value=${val} step=${step}>`);
  }
}
