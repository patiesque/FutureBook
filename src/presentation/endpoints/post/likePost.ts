import { Request, Response } from "express";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";
import { LikePostUC } from "../../../business/usecase/post/likePost";
import { PostDB } from "../../../data/postDataBase";

export const LikePostEndpoint = async (req: Request, res: Response) => {
  try {
    const uc = new LikePostUC(new PostDB(), new JwtAuthorizer);
 
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
