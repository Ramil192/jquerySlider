import { IView } from '../View/interface';
import { IModel } from '../Model/interface';

export interface IController {
  view: IView
  model: IModel
  init(): void
}
