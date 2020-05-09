export class PostRelations{
    constructor(
        private userId: string,
        private postId: string
    ){}

    public getUserId(): string{
        return this.userId;
    };

    public setUserId(userId: string): void{
        this.userId = userId;
    };

    public getPostId(): string{
        return this.postId;
    };

    public setPostId(postId: string): void{
        this.postId = postId
    }
}