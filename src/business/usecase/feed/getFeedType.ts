import { FeedGateway } from "../../gateways/feedGateway";
import { PostType } from "../../entities/post";

export class GetFeedTypeUC {
  constructor(private feedGateway: FeedGateway) { }

  async execute(input: GetFeedInput): Promise<FeedPostOutput> {
    const posts = await this.feedGateway.getFeedType(input.userId, input.postType);

    return {
      posts: posts.map(post => {
        return {
          id: post.getId(),
          image: post.getImage(),
          description: post.getDescription(),
          creationDate: post.getCreationDate(),
          postType: post.getPostType(),
          userId: post.getUserId(),
          name: post.getName()
        };
      })
    }
  }
}

export interface FeedPostOutput{
  posts: FeedOutput[];
}

export interface FeedOutput {
  id: string;
  image: string;
  description: string;
  creationDate: Date;
  postType: PostType,
  userId: string;
  name: string;
}
export interface GetFeedInput {
  userId: string;
  postType: PostType;
}
