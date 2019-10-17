import IQuestion from './IQuestion';

export default interface ICategory {
  id: number;
  name: string;
  questions: IQuestion[];
}