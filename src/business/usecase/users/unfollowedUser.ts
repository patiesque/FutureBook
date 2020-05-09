import { UserGateway } from "../../gateways/userGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class UnfollowedUserUC {
  constructor(
    private usergateway: UserGateway,
    private authenticationGateway: AuthenticationGateway
  ) { }
  async execute(input: UnfollowedUserInput): Promise<UnfollowedUserOutput> {

    const userInfo = await this.authenticationGateway.getUsersInfoFromToken(input.token)

    const user = await this.usergateway.getUsersRelationsData(userInfo.userId, input.friendId)

    if (!user) {
      throw new Error("You don't follow this user!")
    }

    await this.usergateway.unfollowedUserRelation(
      userInfo.userId,
      input.friendId
    );

    return {
      message: "Deleted user"
    };
  }
}

export interface UnfollowedUserInput {
  token: string;
  friendId: string;
}

export interface UnfollowedUserOutput {
  message: string;
} 