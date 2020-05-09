export class UserRelations {
    constructor(
        private userId: string,
        private friendId: string
    ) { }

    public getAdderFriendIdId(): string {
        return this.userId;
    }

    public setUserId(userId: string): void {
        this.userId = userId;
    }

    public getFollowedId(): string {
        return this.friendId;
    }

    public setFriendId(friendId: string): void {
        this.friendId = friendId;
    }
}