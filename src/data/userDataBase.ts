import { BaseDB } from "./baseDataBase";
import { User } from "../business/entities/user";
import { UserGateway } from "../business/gateways/userGateway";
import { DuplicateUserError } from "../business/Error/DuplicateUserError";
import { UserRelations } from "../business/entities/userRelations";

export class UserDB extends BaseDB implements UserGateway {
  private userTableName = "users";
  private friendRelationTableName = "friend_user";

  private mapDBUserToUser(input?: any): User | undefined {
    return (
      input &&
      new User(
        input.id,
        input.name,
        input.email,
        input.password, 
      )
    )
  }

  private mapDBRelationToRelation(input?: any): UserRelations | undefined {
    return (
      input &&
      new UserRelations(
        input.userId,
        input.friendId
      )
    )
  }

  async createUser(user: User) {
    try {
      await this.connection
        .insert({
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
          password: user.getPassword(),
        })
        .into(this.userTableName);
    } catch (err) {
      console.log(err)
      if (err.code === 'ER_DUP_ENTRY') {
        throw new DuplicateUserError()
      } else {
        throw err
      }
    }
  }

  async loginUser(email: string): Promise<User | undefined> {
    const result = await this.connection
      .select("*")
      .from(this.userTableName)
      .where({ email: email });
    if (!result[0]) {
      return undefined;
    }
    return await this.mapDBUserToUser(result[0][0])
  }
 
  async followUserRelation(userId: string, friendId: string): Promise<void> {
    try {
      await this.connection.raw(`
      INSERT INTO ${this.friendRelationTableName}(user_id, friend_id)
      values ('${userId}','${friendId}');
    `);
    } catch (err) {
      console.log(err)
      if (err.code === 'ER_DUP_ENTRY') {
        throw new Error("You already follow")
      }
    }
  }

  public async unfollowedUserRelation(userId: string, friendId: string): Promise<void> {
    await this.connection.raw(`
    DELETE FROM ${this.friendRelationTableName} 
    WHERE user_id = '${userId}'
    AND friend_id = '${friendId}'
    `);
  }

  public async getUsersRelationsData(userId: string, friendId: string): Promise<UserRelations | undefined> {
    const relation = await this.connection.raw(`
        SELECT * 
        FROM ${this.friendRelationTableName}
        WHERE user_id = '${userId}' AND friend_id = '${friendId}';
    `);

    if (!relation[0][0]) {
      return undefined;
    };

    return await this.mapDBRelationToRelation(relation[0][0]);
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.connection.raw(`
      SELECT * FROM ${this.userTableName} 
      WHERE email = '${email}'
    `);
    if (!result[0][0]) {
      return undefined;
    }
    return await this.mapDBUserToUser(result[0][0])
  }

}
