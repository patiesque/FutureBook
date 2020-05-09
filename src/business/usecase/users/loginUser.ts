import { UserGateway } from "../../gateways/userGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { CryptographyGateway } from "../../gateways/cryptographyGateway";
import { NotFound } from "../../Error/NotFound";
import { IncorrectPasswordOrEmail } from "../../Error/IncorrectPasswordOrEmail";

export class LoginUserUC {
  constructor(
    private userGateway: UserGateway,
    private authenticationGateway: AuthenticationGateway,
    private cryptographyGateway: CryptographyGateway
  ) { }

  public async execute(input: LoginUserUCInput): Promise<LoginUserUCOutput>  {
    const user = await this.userGateway.getUserByEmail(input.email);

    if (!user) {
      throw new NotFound;
    }

    if (!await this.cryptographyGateway.compare(input.password, user.getPassword())) {
      throw new IncorrectPasswordOrEmail
    }

    const token = this.authenticationGateway.generateToken({
      userId: user.getId()
    });

    return {
      message: "Token " + token
    };  
  }
}
export interface LoginUserUCInput {
  email: string;
  password: string;
}

export interface LoginUserUCOutput {
  message: string;
}
