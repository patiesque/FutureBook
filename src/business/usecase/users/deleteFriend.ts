import { UserGateway } from "../../gateways/userGateway";

export class DeleteFriendUC {
  constructor(private usergateway: UserGateway) { }

  async execute(input: DeleteFriendInput) {
    await this.usergateway.deleteFriendRelation(
      input.userId,
      input.friend_id
    );
  }
}

export interface DeleteFriendInput {
  userId: string;
  friend_id: string;
}
