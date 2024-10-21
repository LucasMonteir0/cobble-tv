import { Response, Request } from "express";
import { inject, injectable } from "tsyringe";
import {UserDatasource} from "../datasources/UserDatasource";

export interface UserController {
  createUser(req: Request, res: Response): Promise<void>;
  getUsers(req: Request, res: Response): Promise<void>;
  getUserById(req: Request, res: Response): Promise<void>;
}

@injectable<UserController>()
export class UserControllerImpl implements UserController {
  constructor(
    @inject("UserDatasource")
    private datasource: UserDatasource
  ) {}

  public async createUser(req: Request, res: Response) {
    const result = await this.datasource.createUser(req.body);
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
