import { Request, Response } from "express";
import { FeedDB } from "../../../data/feedDataBase";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";
import { GetFeedTypeUC } from "../../../business/usecase/feed/getFeedType";

export const getFeedTypeEndpoint = async (req: Request, res: Response) => {
  try {
    const uc = new GetFeedTypeUC(new FeedDB(), new JwtAuthorizer());

    const result = await uc.execute({
      token: req.headers.authorization as string,
      postType: req.query.postType,
      page: req.query.page
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message,
      ...err
    });
  }
};
