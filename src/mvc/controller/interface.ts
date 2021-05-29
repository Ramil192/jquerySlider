import { IView } from '../view/interface';
import { IModel } from '../model/interfacel';

export interface IController {
  view: IView
  model: IModel

  init(): void
}
