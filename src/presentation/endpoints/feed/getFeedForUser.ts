import { Request, Response } from "express";
import { FeedDB } from "../../../data/feedDataBase";
import { GetFeedForUserUC } from "../../../business/usecase/feed/getFeedForUser";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";

export const getFeedForUserEndpoint = async (req: Request, res: Response) => {
  try {
    const uc = new GetFeedForUserUC(new FeedDB(), new JwtAuthorizer());
    
    const result = await uc.execute({
      token: req.headers.authorization as string,
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message,
      ...err
    });
  }
};
 