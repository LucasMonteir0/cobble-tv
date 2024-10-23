import express, { Request, Response } from "express";
import { ApiHelper } from "../../utils/helpers/ApiHelper";

import { container } from "tsyringe";
import { validateUser } from "./middlewares/UserMiddlewares";
import { authMiddleware } from "../commons/middlewares/Auth";
import {
  UserController,
  UserControllerImpl,
} from "./controllers/UserController";
import { uploadFile } from "../commons/middlewares/UploadFile";

export default function UserRouter() {
  const module = "users";
  const router = express.Router();

  const controller = container.resolve<UserController>(UserControllerImpl);

  // CREATE USER
  router.post(
    ApiHelper.getPublicUrl({ module }),
    uploadFile("picture"),
    validateUser,
    async (req: Request, res: Response) => {
      return controller.createUser(req, res);
    },
  );

  // GET ALL USERS
  router.get(
    ApiHelper.getUrl({ module }),
    authMiddleware,
    async (req: Request, res: Response) => {
      return controller.getUsers(req, res);
    },
  );

  // GET USER BY ID
  router.get(
    ApiHelper.getUrl({ module, params: ["id"] }),
    authMiddleware,
    async (req: Request, res: Response) => {
      return controller.getUserById(req, res);
    },
  );

  return router;
}
