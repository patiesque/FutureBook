import { Post, PostType } from "./post";

export class FeedPost extends Post {
  constructor(
    id: string,
    image: string,
    description: string,
    creationDate: Date,
    postType: PostType,
    userId: string,
    private name: string
  ) {
    super(id, image, description, creationDate, postType, userId);
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }
}
