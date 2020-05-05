import { BaseDB } from "./baseDataBase";
import { FeedGateway } from "../business/gateways/feedGateway";
import { FeedPost } from "../business/entities/feedPost";

export class FeedDB extends BaseDB implements FeedGateway {
    private postTableName = "post";
    private userTableName = "users";
    private relationTableName = "friend_user";

    async getFeedForUser(userId: string): Promise<FeedPost[]> {
        const response = await this.connection.raw(`
        SELECT ${this.postTableName}.*, ${this.userTableName}.name 
        from ${this.relationTableName}
        JOIN ${this.postTableName} on ${this.postTableName}.userId=${this.relationTableName}.friend_id
        JOIN ${this.userTableName} on ${this.relationTableName}.friend_id=${this.userTableName}.id
        WHERE user_id='${userId}'
        ORDER BY ${this.postTableName}.creationDate DESC;
        `);

        return response[0].map((post: any) => {
            return new FeedPost(
                post.id,
                post.image,
                post.description,
                post.creationDate,
                post.postType,
                post.userId,
                post.name,
            );
        });
    }

    async getFeedType(userId: string, postType: string): Promise<FeedPost[]> {
        const response = await this.connection.raw(`
        SELECT ${this.postTableName}.*, ${this.userTableName}.name 
        from ${this.relationTableName}
        JOIN ${this.postTableName} on ${this.postTableName}.userId=${this.relationTableName}.friend_id
        JOIN ${this.userTableName} on ${this.relationTableName}.friend_id=${this.userTableName}.id
        WHERE user_id='${userId}' 
        AND ${this.postTableName}.postType = '${postType}'
        `);

        return response[0].map((post: any) => {
            return new FeedPost(
                post.id,
                post.image,
                post.description,
                post.creationDate,
                post.postType,
                post.userId,
                post.name,
            );
        });

    }
}
