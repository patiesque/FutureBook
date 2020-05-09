import { Request, Response } from "express";
import { PostDB } from "../../../data/postDataBase";
import { CreatePostUC } from "../../../business/usecase/post/createPost";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";

export const createPostEndpoint = async (req: Request, res: Response) => {
  try {
    const createPostUC = new CreatePostUC(new PostDB(), new JwtAuthorizer());

    const input = {
      image: req.body.image,
      description: req.body.description,
      postType: req.body.type,
      token: req.headers.authorization as string,
    }

    const result = await createPostUC.execute(input);
 
    res.status(200).send(result);

  } catch (err) {
    res.status(400).send({
      message: err.message,
      ...err
    });
  }
};
 