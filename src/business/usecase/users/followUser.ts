import { UserGateway } from "../../gateways/userGateway";

export class FollowUserUC {
  constructor(private usergateway: UserGateway) { }

  async execute(input: FollowUserInput) {
    await this.usergateway.createUserFollowRelation(
      input.userId,
      input.friend_id
    );
  }
}

export interface FollowUserInput {
  userId: string;
  friend_id: string;
}
