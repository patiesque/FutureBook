import { User } from "../entities/user";
import { UserRelations } from "../entities/userRelations";

export interface UserGateway {
  createUser(user: User): Promise<void>;
  loginUser(email: string): Promise<User | undefined>;
  followUserRelation(user_id: string, friend_id: string): Promise<void>;
  unfollowedUserRelation(user_id: string, friend_id: string): Promise<void>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUsersRelationsData(userId: string, friendId: string): Promise<UserRelations | undefined>

}
