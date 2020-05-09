import { UserGateway } from "../../gateways/userGateway";

export class DeleteFriendUC {
  constructor(private usergateway: UserGateway) { }
  async execute(input: DeleteFriendInput): Promise<DeleteFriendOutput> {

    await this.usergateway.deleteFriendRelation(
      input.userId,
      input.friend_id
    );

    return {
      message: "Deleted user"
    };
  }
}

export interface DeleteFriendInput {
  userId: string;
  friend_id: string;
}

export interface DeleteFriendOutput {
  message: string;
} 