export interface IMember {
  id: string;
  membername: string;
  email: string;
  YOB: Date;
  gender: boolean;
  password: string;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IPerfume {
  _id?: string;
  perfumeName: string;
  uri: string;
  price: number;
  concentration: string; // Extrait, EDP, EDT, etc.
  description: string;
  ingredients: string;
  volume: number;
  targetAudience: string; // 'male' | 'female' | 'unisex'
  comments: IComment[];
  brand: IBrand; // Reference đến Brand
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IBrand {
  _id?: string;
  brandName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IComment {
  _id: string;
  rating: number; // 1-3
  content: string;
  author: IMember; // Reference đến Member
  createdAt?: Date;
  updatedAt?: Date;
}
