import { Request, Response } from "express";
import { FeedDB } from "../../../data/feedDataBase";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";
import { GetFeedTypeUC } from "../../../business/usecase/feed/getFeedType";

export const getFeedTypeEndpoint = async (req: Request, res: Response) => {
  try {
    const uc = new GetFeedTypeUC(new FeedDB());
    const token = req.headers.auth as string;
    const jwtAuthorizer = new JwtAuthorizer();
    const userInfo = jwtAuthorizer.getUsersInfoFromToken(token);

    const result = await uc.execute({
      userId: userInfo.userId,
      postType: req.query.postType
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message,
      ...err
    });
  }
};
