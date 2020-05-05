import { FeedPost } from "../entities/feedPost";

export interface FeedGateway {
  getFeedForUser(userId: string): Promise<FeedPost[]>;
  getFeedType(userId: string, postType: string): Promise<FeedPost[]>;
}
