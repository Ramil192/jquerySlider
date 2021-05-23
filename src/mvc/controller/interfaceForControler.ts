import { IView } from '../view/interfaceForView';
import { IModel } from '../model/interfaceForModel';

export interface IController {
  view: IView
  model: IModel

  init(): void
}
