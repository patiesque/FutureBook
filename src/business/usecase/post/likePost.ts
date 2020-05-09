import { PostGateway } from "../../gateways/postGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class LikePostUC {
  constructor(
    private postgateway: PostGateway,
    private authenticationGateway: AuthenticationGateway
  ) { }

  async execute(input: LikePostInput): Promise<LikePostOutput> {

    const userInfo = await this.authenticationGateway.getUsersInfoFromToken(input.token)

    const relation = await this.postgateway.getPostRelation(userInfo.userId, input.postId)

    if (relation) {
      throw new Error("Post has already been liked")
    }

    await this.postgateway.likePost( 
      userInfo.userId,
      input.postId
    );

    return {
      message: "You liked post"
    };
  }
}

export interface LikePostInput {
  token: string;
  postId: string;
}

export interface LikePostOutput {
  message: string;
}
