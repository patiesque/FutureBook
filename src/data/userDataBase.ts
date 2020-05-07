import { BaseDB } from "./baseDataBase";
import { User } from "../business/entities/user";
import { UserGateway } from "../business/gateways/userGateway";
import { DuplicateUserError } from "../business/Error/DuplicateUserError";

export class UserDB extends BaseDB implements UserGateway {
  private userTableName = "users";
  private relationTableName = "friend_user";

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

  async createUserFollowRelation(user_id: string, friend_id: string): Promise<void> {
    try {
      await this.connection.raw(`
      INSERT INTO ${this.relationTableName}(user_id, friend_id)
      values ('${user_id}','${friend_id}');
    `);
    } catch (err) {
      console.log(err)
      if (err.code === 'ER_DUP_ENTRY') {
        throw new Error("You already follow")
      } 
    }
  }

  public async deleteFriendRelation(user_id: string, friend_id: string): Promise<void> {
    await this.connection.raw(`
    DELETE FROM ${this.relationTableName} 
    WHERE user_id = '${user_id}'
    AND friend_id = '${friend_id}'
    `)
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
