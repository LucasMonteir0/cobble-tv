import {SignInCredentialsEntity} from "../entities/SignInCredentialsEntity";
import {ResultWrapper} from "../../../utils/http/ResultWrapper";

export interface AuthenticationDatasource {
  signIn(
    credentials: SignInCredentialsEntity,
  ): Promise<ResultWrapper<UserAuthenticationTokensEntity>>;
}