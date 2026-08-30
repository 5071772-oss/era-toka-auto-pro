// @ts-check
import { module } from "@prisma/composer";
import tanstackStartTsService from "./service.mjs";

export default module("tanstack-start-ts", ({ provision }) => {
  provision(tanstackStartTsService, { id: "tanstackstartts" });
});
