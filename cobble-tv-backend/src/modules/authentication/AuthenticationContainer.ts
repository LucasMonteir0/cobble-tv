import { ContainerModule } from "../../utils/ContainerModule";
import { container } from "tsyringe";
import {PrismaAuthenticationDatasourceImpl} from "./datasources/PrismaAuthenticationDatasourceImpl";
import {AuthenticationControllerImpl} from "./controllers/AuthenticationController";

export class AuthenticationContainer extends ContainerModule {
  protected static datasources(): void {
    container.register("AuthenticationDatasource", {
      useClass: PrismaAuthenticationDatasourceImpl,
    });
  }

  protected static controllers(): void {
    container.register("AuthenticationController", {
      useClass: AuthenticationControllerImpl,
    });
  }
}
