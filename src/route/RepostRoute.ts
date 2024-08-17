import  RepostController  from "../controller/RepostController.js";
import Middleware from "../Middleware/Middelware.js";
import { Router } from "express";

const router = Router();

router.post("/repost/:idPost",Middleware.auth,Middleware.isTailor, RepostController.createRepost);
router.get("/repostByPost/:idPost",Middleware.auth,Middleware.isTailor, RepostController.getRepostsByPost);
router.delete("/deleterepost/:idRepost",Middleware.auth,Middleware.isTailor,  RepostController.deleteRepost);
router.get("/Allreposts",Middleware.auth,Middleware.isTailor,RepostController.getAllRepost);
export default router