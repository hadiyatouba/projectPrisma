import  ActorController  from "../controller/ActorController.js";
import { Router } from "express";

const router = Router();
router.post("/create", ActorController.createActor);
router.get("/getactors",ActorController.getActors);
router.get("/getactor/:id", ActorController.getActorById);
router.get("/deleteactor/:id", ActorController.deleteActor);
router.put("/update/:id", ActorController.updateActor);
export default router