import { v4 } from "uuid";
import { PostGateway } from "../../gateways/postGateway";
import { Post } from "../../entities/post";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class CreatePostUC {
  constructor(
    private postGateway: PostGateway,
    private authenticationGateway: AuthenticationGateway
    ) { }

  public async execute(input: CreatePostUCInput): Promise<CreatePostUCOutput>  {

    const id = v4();

    const userInfo = await this.authenticationGateway.getUsersInfoFromToken(input.token)

    const post = new Post(
      id,
      input.image,
      input.description,
      new Date(),
      Post.mapStringsPostType(input.postType),
      userInfo.userId);

    await this.postGateway.createPost(post);

    return {
      message: "Post created successfully"
    };

  }
}
export interface CreatePostUCInput {
  image: string;
  description: string;
  postType: string,
  token: string 
}

export interface CreatePostUCOutput {
  message: string;
}
