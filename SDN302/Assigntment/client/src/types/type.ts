export interface IMember {
  _id: string;
  membername: string;
  email: string;
  YOB: Date;
  gender: boolean;
  password: string;
  isAdmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Auth-specific user type (lightweight version for authentication)
export type AuthUser = Pick<IMember, "_id" | "membername" | "email">;

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  membername: string;
  email: string;
  password: string;
  confirmPassword: string;
  YOB: Date;
  gender: boolean;
}

export interface IAuthResponse {
  token: string;
  user: AuthUser;
}

export interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: IRegisterRequest) => Promise<void>;
  logout: () => void;
  checkAuth: () => boolean;
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
