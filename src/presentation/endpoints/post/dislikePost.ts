import { Request, Response } from "express";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";
import { DislikePostUC } from "../../../business/usecase/post/dislikePost";
import { PostDB } from "../../../data/postDataBase";

export const dislikePostEndpoint = async (req: Request, res: Response) => {
  try {
    const uc = new DislikePostUC(new PostDB(), new JwtAuthorizer());
    
    const result = await uc.execute({
      token: req.headers.authorization as string,
      postId: req.body.post
    });
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: err.message
    });
  }
};
