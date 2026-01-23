import { Posts } from '../../posts/entities/posts.entity';

export type UserResponse = {
  id: number;
  username: string;
  email: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
  posts: Posts[];
};

export type LoginResponse = {
  id: number;
  username: string;
  email: string;
  token: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
};
