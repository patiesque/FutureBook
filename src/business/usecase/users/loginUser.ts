import { UserGateway } from "../../gateways/userGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { CryptographyGateway } from "../../gateways/cryptographyGateway";

export class LoginUserUC {
  constructor(
    private userGateway: UserGateway,
    private authenticationGateway: AuthenticationGateway,
    private cryptographyGateway: CryptographyGateway
  ) { }

  public async execute(input: LoginUserUCInput) {
    const user = await this.userGateway.getUserByEmail(input.email);

    if (!user) {
      throw new Error("Usuario não encontrado");
    }

    if (!await this.cryptographyGateway.compare(input.password, user.getPassword())) {
      throw new Error("Senha ou Email incorreto")
    }

    const token = this.authenticationGateway.generateToken({
      userId: user.getId()
    });

    return token;
  }
}
export interface LoginUserUCInput {
  email: string;
  password: string;
}
