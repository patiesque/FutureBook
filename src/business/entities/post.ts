export class Post {
  constructor(
    private id: string,
    private image: string,
    private description: string,
    private creationDate: Date,
    private postType: PostType,
    private userId: string
  ) { }

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }
  public getImage(): string {
    return this.image;
  }

  public setImage(image: string): void {
    this.image = image;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getCreationDate(): Date {
    return this.creationDate;
  }

  public setCreationDate(creationDate: Date): void {
    this.creationDate = creationDate;
  }

  public getPostType(): PostType {
    return this.postType;
  }

  public setPostType(postType: PostType): void {
    this.postType = postType;
  }

  public getUserId(): string {
    return this.userId;
  }

  public setUserId(userId: string): void {
    this.userId = userId;
  }

  public static mapStringsPostType(type: string): PostType {
    switch (type) {
      case "NORMAL":
        return PostType.NORMAL;
      case "EVENTO":
        return PostType.EVENTO;
      default:
        throw new Error("Invalid post type");
    }
  }
}

export enum PostType {
  NORMAL = "NORMAL",
  EVENTO = "EVENTO"
}