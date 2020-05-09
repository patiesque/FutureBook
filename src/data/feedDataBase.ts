import { BaseDB } from "./baseDataBase";
import { FeedGateway } from "../business/gateways/feedGateway";
import { FeedPost } from "../business/entities/feedPost";

export class FeedDB extends BaseDB implements FeedGateway {
    private postTableName = "post";
    private userTableName = "users";
    private relationTableName = "friend_user";

    async getFeedForUser(userId: string, limit: number, offset: number): Promise<FeedPost[]> {
        const response = await this.connection.raw(`
        SELECT p.*, u.name 
        from ${this.relationTableName} r
        JOIN ${this.postTableName} p
        on p.userId=r.friend_id
        JOIN ${this.userTableName} u
        on r.friend_id=u.id
        WHERE user_id='${userId}'
        ORDER BY p.creationDate DESC
        LIMIT ${limit} OFFSET ${offset};
        ;
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

    async getFeedType(userId: string, postType: string, limit: number, offset: number): Promise<FeedPost[]> {
        const response = await this.connection.raw(`
        SELECT p.*, u.name 
        from ${this.relationTableName} r
        JOIN ${this.postTableName} p
        on p.userId=r.friend_id
        JOIN ${this.userTableName} u
        on r.friend_id=u.id
        WHERE user_id='${userId}' 
        AND p.postType = '${postType}
        ORDER BY p.creationDate DESC
        LIMIT ${limit} OFFSET ${offset}'
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
