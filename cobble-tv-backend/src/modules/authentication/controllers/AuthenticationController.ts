import { inject, injectable } from "tsyringe";
import { AuthenticationDatasource } from "../datasources/AuthenticationDatasource";

export interface AuthenticationController {
  signIn(req, res): Promise<UserAuthenticationTokensEntity>;
}

@injectable<AuthenticationController>()
export class AuthenticationControllerImpl implements AuthenticationController {
  constructor(
    @inject("AuthenticationDatasource")
    private datasource: AuthenticationDatasource,
  ) {}

  async signIn(req, res): Promise<UserAuthenticationTokensEntity> {
    const { email, password } = req.body;
    const result = await this.datasource.signIn({ login: email, password });

    if (result.isSuccess) {
      res.statusCode = 201;
      res.json(result.data);
    } else {
      const error = result.error!;
      res.status(error.statusCode).send({ message: error.message });
    }
  }
}
