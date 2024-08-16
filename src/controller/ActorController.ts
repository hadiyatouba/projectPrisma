import { PrismaClient } from '@prisma/client';
import Utils from '../utils/Utils.js';

const prisma = new PrismaClient();
import { Request, Response } from "express";

export default class ActorController{

    //create a new actor
    static createActor = async (req: Request, res: Response) => {
        const {role} = req.body
        if (role !=="TAILOR" && role !=="VENDOR") {
            return res.status(400).json({
                message: "Invalid role provided. Please choose either 'TAILOR' or 'VENDOR'.",
                status: 400
            });
        }
        try {
            const actor = await prisma.actor.create({
                data: {
                    idUser:req.body.idUser,
                    address:req.body.address,
                    bio:req.body.bio,
                    role:req.body.role,
                    credits:req.body.credits,
                    vote:req.body.vote
                }
            });
            res.json({message: `${role} created successfully`,
                data: actor,
                status: 200
            });
        } catch (error: any) {
            res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    }

    static getActors = async (req: Request, res: Response) => {
        const actors = await prisma.actor.findMany();
        res.json({message: "Actors fetched successfully",
            data: actors,
            status: 200
        });
    }

    static getActorById = async (req: Request, res: Response) => {
        const actor = await prisma.actor.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        res.json({message: "Actor fetched successfully",
            data: actor,
            status: 200
        });
    }

   //update actor
    static updateActor = async (req: Request, res: Response) => {
        try {
            const{id} = req.params

            const validFields = ['idUser', 'address', 'bio', 'credits', 'vote', 'role'];

          const dataUpdate: {[key: string]: any}={}
          for (const key in req.body) {
              if (validFields.includes(key)) {
                  dataUpdate[key] = req.body[key];
              }
          }
          if (Object.keys(dataUpdate).length==0) {
            return res.status(400).json({
                message: "No valid fields provided to update",
                status: 400
            });
          }

            const actor = await prisma.actor.update({
                where: {
                    id: Number(id)
                },
                data: dataUpdate
            });
            if (!actor) {
                return res.status(404).json({
                    message: "actor not found",
                    status: 404
                });
            }
            res.json({message: "actor updated successfully",
                data: actor,
                status: 200
            });
        } catch (err: any) {
            res.status(500).json({
                message: "Internal server error",
                error: err.message,
            });
        }
    
    }

    //delete actor
    static deleteActor = async (req: Request, res: Response) => {
        try {
            const {id} = req.params
            const actor = await prisma.actor.delete({
                where: {
                    id: Number(id)
                }
            });
            if (!actor) {
                return res.status(404).json({
                    message: "Actor not found",
                    status: 404
                });
            }
            res.json({message: "Actor deleted successfully",
                data: actor,
                status: 200
            });
        } catch (err: any) {
            res.status(500).json({
                message: "Internal server error",
                error: err.message,
            });
        }
 
    }
        
    

    
}