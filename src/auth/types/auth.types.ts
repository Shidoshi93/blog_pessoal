import { Posts } from "../../posts/entities/posts.entity";

export type ValidateUserResponse = {
  id: number;
  username: string;
  email: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
  posts: Posts[];
};

export type LoginResponse = {
  username: string;
  id: number;
  email: string;
  token: string;
};