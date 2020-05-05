import { BaseDB } from "./baseDataBase";
import { PostGateway } from "../business/gateways/postGateway";
import { Post } from "../business/entities/post";
import { DuplicateUserError } from "../business/Error/DuplicateUserError";

export class PostDB extends BaseDB implements PostGateway {
    private postTableName = "post";
    private likeTableName = "likePost";

    async createPost(post: Post) {
        try {
            await this.connection
                .insert({
                    id: post.getId(),
                    image: post.getImage(),
                    description: post.getDescription(),
                    creationDate: post.getCreationDate(),
                    postType: post.getPostType(),
                    userId: post.getUserId(),
                })
                .into(this.postTableName);
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                throw new DuplicateUserError()
            } else {
                throw err
            }
        }
    }

    async likePost(user_id: string, post_id: string): Promise<void> {
        await this.connection.raw(`
       INSERT INTO ${this.likeTableName}
       (\`user_id\`, \`post_id\`)
       values ('${user_id}','${post_id}');
       `)
    }

    public async dislikePost(user_id: string, post_id: string): Promise<void> {
        await this.connection.raw(`
        DELETE FROM ${this.likeTableName} 
        WHERE user_id = '${user_id}'
        AND post_id = '${post_id}'
        `)
    }

    public async commentPost(id: string, userId: string, postId: string, comment: string): Promise<void> {
        await this.connection.raw(`
            INSERT INTO commentPost 
            (\`id\`, \`userid\`, \`postid\`, \`comment\`) 
            values ('${id}','${userId}', '${postId}', '${comment}');
        `)
    }



}