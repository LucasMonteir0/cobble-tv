import {UserDatasource} from "./UserDatasource";
import {UserEntity} from "../entities/UserEntity";
import {hash} from "bcryptjs";
import {CreateUserEntity} from "../entities/CreateUserEntity";
import {injectable} from "tsyringe";
import {ResultWrapper} from "../../../utils/http/ResultWrapper";
import {database} from "../../../config/database";
import {ConflictError, NotFoundError} from "../../../utils/http/AppError";

@injectable<UserDatasource>()
export class PrismaUserDatasourceImpl implements UserDatasource {
    async createUser(
        params: CreateUserEntity,
    ): Promise<ResultWrapper<UserEntity>> {
        try {
            const emailExists = await database.user.findUnique({
                where: {email: params.email},
            });
            const usernameExists = await database.user.findUnique({
                where: {username: params.username},
            });

            if (emailExists) {
                const error = new ConflictError("Email already in use.");
                return ResultWrapper.error(error);
            }
            if (usernameExists) {
                const error = new ConflictError("Username already in use.");
                return ResultWrapper.error(error);
            }
            const encryptedPassword = await hash(params.password, 8);

            const pictureUrl = '';

            const result = await database.$transaction(async (prisma) => {
                const user = await prisma.user.create({
                    data: {
                        username: params.username,
                        email: params.email,
                        colorHex: params.colorHex,
                        pictureUrl: pictureUrl,
                        password: encryptedPassword,
                    },
                });


                const livestream = await prisma.livestream.create({
                    data: {
                        streamerId: user["id"],
                        title: params.username + "'s live.",
                        description: 'Write something about yourself.'
                    }
                });

                const chat = await prisma.chat.create({
                    data: {
                        livestreamId: livestream['id'],
                    }
                });

                return {user, livestream, chat};
            });


            const {id, username, email, createdAt} = result.user;





            return ResultWrapper.success({id, username, email, createdAt});
        } catch (e) {
            return ResultWrapper.error(e);
        }
    }

    async getUserById(uid: string): Promise<ResultWrapper<UserEntity>> {
        try {
            const user = await database.user.findUnique({
                where: {id: uid},
            });

            if (!user) {
                const error = new NotFoundError("User not found.");
                return ResultWrapper.error(error);
            }

            const {id, name, email, createdAt} = user;

            return ResultWrapper.success({id, username: name, email, createdAt});
        } catch (e) {
            return ResultWrapper.error(e);
        }
    }

    async getUsers(): Promise<ResultWrapper<Array<UserEntity>>> {
        try {
            const users = await database.user.findMany<UserEntity>();
            return ResultWrapper.success(users);
        } catch (e) {
            return ResultWrapper.error(e);
        }
    }
}