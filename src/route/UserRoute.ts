import  UserController  from "../controller/UserController.js";
import { Router } from "express";
import Middleware from "../Middleware/Middelware.js";

const router = Router();
router.post("/", UserController.createUser);
router.post("/login", UserController.login);
router.get("/monprofile",Middleware.auth, UserController.getUser);

//credit
router.post("/ajoutercredits" ,Middleware.auth,Middleware.isActor, UserController.addCredit);
router.post("/achatcode" ,Middleware.auth,Middleware.isActor, UserController.achatCode);
router.get("/credits", Middleware.auth,Middleware.isActor, UserController.getCredits);
export default router