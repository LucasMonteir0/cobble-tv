import {UserEntity} from "../entities/UserEntity";
import {CreateUserEntity} from "../entities/CreateUserEntity";
import {ResultWrapper} from "../../../utils/http/ResultWrapper";

export interface UserDatasource {
    createUser(params: CreateUserEntity): Promise<ResultWrapper<UserEntity>>;

    getUserById(id: string): Promise<ResultWrapper<UserEntity>>;

    getUsers(): Promise<ResultWrapper<Array<UserEntity>>>;
}