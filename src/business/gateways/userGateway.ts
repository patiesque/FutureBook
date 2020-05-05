import { User } from "../entities/user";

export interface UserGateway {
  createUser(user: User): Promise<void>;
  loginUser(email: string): Promise<User | undefined>;
  deleteFriendRelation(user_id: string, friend_id: string): Promise<void>;
  createUserFollowRelation(user_id: string, friend_id: string): Promise<void>;
  getUserByEmail(email: string): Promise<User | undefined>;

}
