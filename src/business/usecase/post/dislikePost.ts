import { PostGateway } from "../../gateways/postGateway";

export class DislikePostUC {
  constructor(private postgateway: PostGateway) { }

  async execute(input: DeleteFriendInput) {
    await this.postgateway.dislikePost(
      input.userId,
      input.post_id
    );
  }
}

export interface DeleteFriendInput {
  userId: string;
  post_id: string;
}
