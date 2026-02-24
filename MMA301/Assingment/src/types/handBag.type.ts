export interface IHandbag {
  id: string;
  handbagName: string;
  cost: number;
  category: string;
  color: string[];
  gender: boolean;
  uri: string;
  brand: string;
  percentOff: number;
  feedbacks: IFeedbacks[];
}
export interface IFeedbacks {
  id: string;
  rating: number;
  content: string;
}
export type FavoritesList = IHandbag[];
