import { UserGateway } from "../../gateways/userGateway";

export class FollowUserUC {
  constructor(private usergateway: UserGateway) { }

  async execute(input: FollowUserInput): Promise<FollowUserOutput> {
    await this.usergateway.createUserFollowRelation(
      input.userId,
      input.friend_id
    );

    
    return {
      message: "User followed"
    }; 
  }
}

export interface FollowUserInput {
  userId: string;
  friend_id: string;
}
 
export interface FollowUserOutput {
  message: string;
}