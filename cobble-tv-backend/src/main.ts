import server from "./server";
import "reflect-metadata";
import UserRouter from "./modules/user/UserRouter";
import AuthenticationRouter from "./modules/authentication/AuthenticationRoute";


const host = process.env.HOST_URL;
const port = parseInt(process.env.HOST_PORT || '3333');
server.use(UserRouter());
server.use(AuthenticationRouter());

server.listen(port, () => {
  console.log(`SERVER IS RUNNING ON ${host}:${port}`);
});