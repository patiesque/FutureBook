import { Request, Response } from "express";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";
import { LikePostUC } from "../../../business/usecase/post/likePost";
import { PostDB } from "../../../data/postDataBase";

export const LikePostEndpoint = async (req: Request, res: Response) => {
  try {
    const uc = new LikePostUC(new PostDB());
    const token = req.headers.auth as string;
    const jwtAuthorizer = new JwtAuthorizer();
    const userInfo = jwtAuthorizer.getUsersInfoFromToken(token);

    await uc.execute({
      userId: userInfo.userId,
      post_id: req.body.post
    });
    res.send({
      message: "Curtido com sucesso"
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: err.message
    });
  }
};
