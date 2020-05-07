import { Request, Response } from "express";
import { FollowUserUC } from "../../../business/usecase/users/followUser";
import { UserDB } from "../../../data/userDataBase";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";

export const followUserEndpoint = async (req: Request, res: Response) => {
  try {
    const uc = new FollowUserUC(new UserDB());
    const token = req.headers.auth as string;
    const jwtAuthorizer = new JwtAuthorizer();
    const userInfo = jwtAuthorizer.getUsersInfoFromToken(token);

    const result = await uc.execute({
      userId: userInfo.userId,
      friend_id: req.body.friend
    });
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: err.message
    });
  }
}; 
