import { Request, Response } from "express";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";
import { PostDB } from "../../../data/postDataBase";
import { CommentPostUC } from "../../../business/usecase/post/commentPost";

export const commentPostEndpoint = async (req: Request, res: Response) => {
  try {
    const uc = new CommentPostUC(new PostDB());
    const token = req.headers.auth as string;
    const jwtAuthorizer = new JwtAuthorizer();
    const userInfo = jwtAuthorizer.getUsersInfoFromToken(token);

    await uc.execute({
      userId: userInfo.userId,
      postId: req.body.post,
      comment: req.body.comment
    });
    res.send({
      message: "Comentado com sucesso"
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: err.message
    });
  }
};
