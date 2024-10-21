import { container } from "tsyringe";
import { ContainerModule } from "../../utils/ContainerModule";
import {PrismaUserDatasourceImpl} from "./datasources/PrismaUserDatasourceImpl";
import {UserControllerImpl} from "./controllers/UserController";

export class UserContainer extends ContainerModule {
  protected static datasources(): void {
    container.register("UserDatasource", {
      useClass: PrismaUserDatasourceImpl,
    });
  }

  protected static controllers(): void {
    container.register("UserController", {
      useClass: UserControllerImpl,
    });
  }
}
