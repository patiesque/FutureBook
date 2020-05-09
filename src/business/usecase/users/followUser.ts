import { UserGateway } from "../../gateways/userGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class FollowUserUC {
  constructor(
    private usergateway: UserGateway,
    private authenticationGateway: AuthenticationGateway
    ) { }

  async execute(input: FollowUserInput): Promise<FollowUserOutput> {

    const userInfo = await this.authenticationGateway.getUsersInfoFromToken(input.token)

    const user = await this.usergateway.getUsersRelationsData(userInfo.userId, input.friendId)

    if(user){
      throw new Error("This user are already followed by you!")
  }

    await this.usergateway.followUserRelation(
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