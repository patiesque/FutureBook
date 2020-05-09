import { UserGateway } from "../../gateways/userGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class FollowUserUC {
  constructor(
    private usergateway: UserGateway,
    private authenticationGateway: AuthenticationGateway
    ) { }

  async execute(input: FollowUserInput): Promise<FollowUserOutput> {

    const userInfo = await this.authenticationGateway.getUsersInfoFromToken(input.token)

    await this.usergateway.createUserFollowRelation(
      userInfo.userId,
      input.friendId
    );

    return {
      message: "User followed"
    }; 
  }
}

export interface FollowUserInput {
  token: string;
  friendId: string;
}
 
export interface FollowUserOutput {
  message: string;
} 