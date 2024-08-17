import { Router } from "express";
import Middleware from "../Middleware/Middelware.js";
import PostController from "../controller/PostController.js";
const router = Router();

//post
router.post("/", Middleware.auth,Middleware.isTailor, PostController.createPost);
router.get("/", Middleware.auth, PostController.allposts);
router.get("/myposts", Middleware.auth,Middleware.isTailor, PostController.mypost);
router.get("/byactor", Middleware.auth, PostController.getPostActor);
router.put("/:postId", Middleware.auth,Middleware.isTailor, PostController.updatepost);
router.delete("/:id", Middleware.auth,Middleware.isTailor, PostController.deletePost);
//share
router.post("/shares/", Middleware.auth, PostController.createShare);
router.get("/shares/myshares", Middleware.auth, PostController.getSharedMe);
router.get("shares/sharedwithme", Middleware.auth,Middleware.isActor, PostController.getSharesToMe);
router.delete("/shares/:id", Middleware.auth,Middleware.isActor, PostController.deleteShare);
//report
router.post("/report", Middleware.auth, PostController.createReport);
//comment
router.post("/comment/:idpost", Middleware.auth, PostController.commentPost);
router.get("/comment", Middleware.auth, PostController.getComments);
router.put("/comment/:id", Middleware.auth, PostController.updateComment);
router.delete("/comment/:id", Middleware.auth, PostController.deleteComment);

//tag 
router.post("/tag/:postId", Middleware.auth,Middleware.isActor, PostController.createtag);
router.get("/tag", Middleware.auth,Middleware.isActor, PostController.gettag);
router.get("/tagbypost/:postId", Middleware.auth, PostController.gettag);
//favoris
router.post("/favoris/:postId", Middleware.auth, PostController.addfavoris);
router.get("/myfavoris", Middleware.auth, PostController.getfavoris);


export default router;