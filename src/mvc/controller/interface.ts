import { IView } from '../view/interface';
import { IModel } from '../model/interface';

export interface IController {
  view: IView
  model: IModel

  init(): void
}
