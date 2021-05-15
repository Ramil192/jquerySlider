import { ITextLeft } from './interfaceForView'

export default   class TextLeft implements ITextLeft{
  textSpan:JQuery
  
  constructor() {
    this.textSpan = $('<span class="text left">25</span>');
  }

}