import "reflect-metadata";
import express from "express";
import StartAppContainers from "./config/ioc/StartAppContainers";

StartAppContainers();

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
export default server;
