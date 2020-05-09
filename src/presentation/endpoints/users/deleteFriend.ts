import { Request, Response } from "express";
import { UserDB } from "../../../data/userDataBase";
import { DeleteFriendUC } from "../../../business/usecase/users/deleteFriend";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";

export const deleteFriendEndpoint = async (req: Request, res: Response) => {
  try {
    const uc = new DeleteFriendUC(new UserDB());
    const token = req.headers.authorization as string;
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
