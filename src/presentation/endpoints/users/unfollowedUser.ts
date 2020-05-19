import { Request, Response } from "express";
import { UserDB } from "../../../data/userDataBase";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";
import { UnfollowedUserUC } from "../../../business/usecase/users/unfollowedUser";

export const unfollowedUserEndpoint = async (req: Request, res: Response) => {
  try {
    const uc = new UnfollowedUserUC(new UserDB(), new JwtAuthorizer());

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
