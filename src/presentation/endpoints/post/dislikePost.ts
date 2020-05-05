import { Request, Response } from "express";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";
import { DislikePostUC } from "../../../business/usecase/post/dislikePost";
import { PostDB } from "../../../data/postDataBase";

export const dislikePostEndpoint = async (req: Request, res: Response) => {
  try {
    const uc = new DislikePostUC(new PostDB());
    const token = req.headers.auth as string;
    const jwtAuthorizer = new JwtAuthorizer();
    const userInfo = jwtAuthorizer.getUsersInfoFromToken(token);

    await uc.execute({
      userId: userInfo.userId,
      post_id: req.body.post
    });
    res.send({
      message: "Descurtido com sucesso"
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: err.message
    });
  }
};
