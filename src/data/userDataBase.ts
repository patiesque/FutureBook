import { BaseDB } from "./baseDataBase";
import { User } from "../business/entities/user";
import { UserGateway } from "../business/gateways/userGateway";
import { DuplicateUserError } from "../business/Error/DuplicateUserError";

export class UserDB extends BaseDB implements UserGateway {
  private userTableName = "users";
  private relationTableName = "friend_user";

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
    const user = await this.connection
      .select("*")
      .from(this.userTableName)
      .where({ email: email });
    if (!user[0]) {
      return undefined;
    }
    return new User(user[0].id, user[0].name, user[0].email, user[0].password)
  }

  async createUserFollowRelation(user_id: string, friend_id: string): Promise<void> {
    try {
      await this.connection.raw(`INSERT INTO ${this.relationTableName}
    (\`user_id\`, \`friend_id\`)
    values ('${user_id}','${friend_id}');`);
    } catch (err) {
      console.log(err)
      if (err.code === 'ER_DUP_ENTRY') {
        throw new Error("Usuario ja seguido")
      } else {
        throw err
      }
    }
  }

  public async deleteFriendRelation(user_id: string, friend_id: string): Promise<void> {
    await this.connection.raw(`
    DELETE FROM friend_user 
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

    return new User(
      result[0][0].id,
      result[0][0].name,
      result[0][0].email,
      result[0][0].password
    );
  }

}
