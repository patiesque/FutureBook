import { PostGateway } from "../../gateways/postGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class DislikePostUC {
  constructor(
    private postgateway: PostGateway,
    private authenticationGateway: AuthenticationGateway
    ) { }

  async execute(input: DislikePostInput) : Promise<DislikePostOutput>{

    const userInfo = await this.authenticationGateway.getUsersInfoFromToken(input.token)

    const relation = await this.postgateway.getPostRelation(userInfo.userId, input.postId)

    if (!relation) {
      throw new Error("Post has already been disliked")
    }

    await this.postgateway.dislikePost(
      userInfo.userId,
      input.postId
    );

    return {
      message: "You disliked post"
    };
  }
}

export interface DislikePostInput {
  token: string;
  postId: string;
}

export interface DislikePostOutput {
  message: string;
}