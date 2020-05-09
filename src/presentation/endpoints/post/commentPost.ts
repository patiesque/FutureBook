import { Request, Response } from "express";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";
import { PostDB } from "../../../data/postDataBase";
import { CommentPostUC } from "../../../business/usecase/post/commentPost";

export const commentPostEndpoint = async (req: Request, res: Response) => {
  try {
    const uc = new CommentPostUC(new PostDB(), new JwtAuthorizer());

    const result = await uc.execute({
      token: req.headers.authorization as string,
      postId: req.body.post,
      comment: req.body.comment 
    });
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: err.message
    });
  }
};
