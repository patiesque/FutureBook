import { v4 } from "uuid";
import { UserGateway } from "../../gateways/userGateway";
import { User } from "../../entities/user";
import { MinimumCharacterError } from "../../Error/MinimumCharacterError";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";
import { CryptographyGateway } from "../../gateways/cryptographyGateway";


export class CreateUserUC {
  constructor(
    private userGateway: UserGateway,
    private authenticationGateway: AuthenticationGateway,
    private cryptographyGateway: CryptographyGateway
    ) {}

  public async execute(input: CreateUserUCInput): Promise<CreateUserUCOutput> {
    
      const id = v4();
      const pass = await this.cryptographyGateway.encrypt(input.password)
      const user = new User(id,  input.name, input.email, pass);

      if (input.password.length < 6) {
        throw new MinimumCharacterError();
      }
      
      await this.userGateway.createUser(user);
    
      const token = this.authenticationGateway.generateToken({
        userId: user.getId()
      })
  
      return {
        message: "Usuario criado com sucesso " + token
      };
  }
}
export interface CreateUserUCInput {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserUCOutput {
  message: string;
}
