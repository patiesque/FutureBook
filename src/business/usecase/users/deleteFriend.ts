import { UserGateway } from "../../gateways/userGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class DeleteFriendUC {
  constructor(
    private usergateway: UserGateway,
    private authenticationGateway: AuthenticationGateway
    ) { }
  async execute(input: DeleteFriendInput): Promise<DeleteFriendOutput> {

    const userInfo = await this.authenticationGateway.getUsersInfoFromToken(input.token)

    await this.usergateway.deleteFriendRelation(
      userInfo.userId,
      input.friendId
    );

    return {
      message: "Deleted user"
    };
  }
}

export interface DeleteFriendInput {
  token: string;
  friendId: string;
}

export interface DeleteFriendOutput {
  message: string;
} 