import {ContainerModule} from "../../utils/ContainerModule";
import {container} from "tsyringe";
import {JwtTokenServiceImpl} from "./services/JwtTokenServiceImpl";

export class CommonsContainer extends  ContainerModule {
    protected static services(): void {
        container.register("JwtTokenService", {
            useClass: JwtTokenServiceImpl,
        });
    }
}