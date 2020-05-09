import { FeedPost } from "../entities/feedPost";

export interface FeedGateway {
  getFeedForUser(userId: string, limit: number, offset: number): Promise<FeedPost[]>;
  getFeedType(userId: string, postType: string, limit: number, offset: number): Promise<FeedPost[]>;
}
