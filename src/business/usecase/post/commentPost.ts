import { PostGateway } from "../../gateways/postGateway";
import { v4 } from "uuid";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class CommentPostUC {
    constructor(
        private postgateway: PostGateway,
        private authenticationGateway: AuthenticationGateway
    ) { }

    async execute(input: CommentPostInput): Promise<CommentPostOutput> {
        const id = v4();

        const userInfo = await this.authenticationGateway.getUsersInfoFromToken(input.token)

        await this.postgateway.commentPost(
            id,
            userInfo.userId,
            input.postId,
            input.comment
        );

        return {
            message: "You comment post"
        };
    }
}

export interface CommentPostInput {
    token: string;
    postId: string;
    comment: string
}

export interface CommentPostOutput {
    message: string;
}
