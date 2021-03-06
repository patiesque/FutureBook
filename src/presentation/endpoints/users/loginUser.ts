import { Request, Response } from "express";
import { UserDB } from "../../../data/userDataBase";
import { LoginUserUC } from "../../../business/usecase/users/loginUser";
import { JwtAuthorizer } from "../../../services/jwtAuthorizer";
import { BcryptService } from "../../../services/bcryptService";

export const loginUserEndpoint = async (req: Request, res: Response) => {
  try {
    const loginUserUC = new LoginUserUC(
      new UserDB(),
      new JwtAuthorizer(),
      new BcryptService()
    );

    const result = await loginUserUC.execute({
      email: req.body.email,
      password: req.body.password
    });

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({
      message: err.message,
      ...err
    });
  }
};
