import { Request, Response } from "express";
import { FollowUserUC } from "../../../business/usecase/users/followUser";
import { UserDB } from "../../../data/userDataBase";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";

export const followUserEndpoint = async (req: Request, res: Response) => {
  try {
    const uc = new FollowUserUC(new UserDB(), new JwtAuthorizer());

    const result = await uc.execute({
      token: req.headers.authorization as string,
      friendId: req.body.friend
    });
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: err.message
    });
  }
}; 
