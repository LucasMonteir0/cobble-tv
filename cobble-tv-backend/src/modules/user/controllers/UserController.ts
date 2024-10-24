import { Response, Request } from "express";
import { inject, injectable } from "tsyringe";
import { UserDatasource } from "../datasources/UserDatasource";
import { CreateUserEntity } from "../entities/CreateUserEntity";

export interface UserController {
  createUser(req: Request, res: Response): Promise<void>;
  getUsers(req: Request, res: Response): Promise<void>;
  getUserById(req: Request, res: Response): Promise<void>;
}

@injectable<UserController>()
export class UserControllerImpl implements UserController {
  constructor(
    @inject("UserDatasource")
    private datasource: UserDatasource,
  ) {}

  public async createUser(req: Request, res: Response) {
    const picture: Express.Multer.File | undefined = req.file;
    const body = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      picture: picture,
      colorHex: req.body.colorHex,
      confirmPassword: req.body.confirmPassword,
    } as CreateUserEntity;
    const result = await this.datasource.createUser(body);
    if (result.isSuccess) {
      res.statusCode = 201;
      res.json(result.data);
    } else {
      const error = result.error!;
      res.status(error.statusCode).send({ message: error.message });
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    const result = await this.datasource.getUserById(req.params.id);
    if (result.isSuccess) {
      res.statusCode = 200;
      res.json(result.data);
    } else {
      const error = result.error!;
      res.status(error.statusCode).send({ message: error.message });
    }
  }

  public async getUsers(req: Request, res: Response): Promise<void> {
    const result = await this.datasource.getUsers();
    if (result.isSuccess) {
      res.statusCode = 200;
      res.json(result.data);
    } else {
      const error = result.error!;
      res.status(error.statusCode).send({ message: error.message });
    }
  }
}
