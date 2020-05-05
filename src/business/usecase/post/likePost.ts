import { PostGateway } from "../../gateways/postGateway";

export class LikePostUC {
  constructor(private postgateway: PostGateway) { }

  async execute(input: LikePostInput) {
    await this.postgateway.likePost(
      input.userId,
      input.post_id
    );
  }
}

export interface LikePostInput {
  userId: string;
  post_id: string;
}
