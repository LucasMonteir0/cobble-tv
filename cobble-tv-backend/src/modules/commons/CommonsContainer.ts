import {ContainerModule} from "../../utils/ContainerModule";
import {container} from "tsyringe";
import {JwtTokenServiceImpl} from "./services/jwt_token/JwtTokenServiceImpl";

export class CommonsContainer extends  ContainerModule {
    protected static services(): void {
        container.register("JwtTokenService", {
            useClass: JwtTokenServiceImpl,
        });
    }
}