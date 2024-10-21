import {CommonsContainer} from "../../modules/commons/CommonsContainer";
import {UserContainer} from "../../modules/user/UserContainers";
import {AuthenticationContainer} from "../../modules/authentication/AuthenticationContainer";

export default function StartAppContainers() {
    CommonsContainer.export();
    UserContainer.export();
    AuthenticationContainer.export();
}