import { PostGateway } from "../../gateways/postGateway";
import { v4 } from "uuid";

export class CommentPostUC {
    constructor(private postgateway: PostGateway) { }

    async execute(input: CommentPostInput) {
        const id = v4();
        await this.postgateway.commentPost(
            id,
            input.userId,
            input.postId,
            input.comment
        );
    }
}

export interface CommentPostInput {
    userId: string;
    postId: string;
    comment: string
}
