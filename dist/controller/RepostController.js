import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default class RepostController {
    static createRepost = async (req, res) => {
        const idPost = Number(req.params.idPost);
        const idUser = req.params.userId;
        try {
            const actor = await prisma.actor.findUnique({
                where: {
                    idUser: +idUser
                }
            });
            if (!actor || actor.role !== "TAILOR") {
                return res.status(403).json({
                    message: "Only tailor can repost !",
                    status: 403,
                });
            }
            const Originalpost = await prisma.post.findUnique({
                where: {
                    id: idPost
                }
            });
            if (Originalpost && Originalpost.idActor === actor.id) {
                return res.status(400).json({
                    message: "Vous ne pouvez pas reposter votre propre post.",
                    status: 400,
                });
            }
            const exist = await prisma.repost.findFirst({
                where: {
                    idUser: +idUser,
                    idPost: idPost,
                },
            });
            if (exist) {
                return res.status(400).json({
                    message: "Vous avez déjà reposté ce post.",
                    status: 400,
                });
            }
            const repost = await prisma.repost.create({
                data: {
                    idUser: +idUser,
                    idPost: idPost,
                },
            });
            res.json({
                message: "Repost créé avec succès",
                data: repost,
                status: 200,
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Erreur interne du serveur",
                error: error.message,
            });
        }
    };
    static deleteRepost = async (req, res) => {
        const idRepost = Number(req.params.idRepost);
        const idUser = req.params.idUser;
        try {
            const actor = await prisma.actor.findUnique({
                where: {
                    idUser: +idUser
                }
            });
            if (!actor || actor.role !== "TAILOR") {
                return res.status(403).json({
                    message: "Only tailor can delete repost! Mouy mboli di deme ",
                    status: 403,
                });
            }
            const repost = await prisma.repost.findUnique({
                where: {
                    id: idRepost
                }
            });
            if (!repost || repost.idUser !== +idUser) {
                return res.status(403).json({
                    message: "Vous ne pouvez pas supprimer ce repost.",
                    status: 403,
                });
            }
            await prisma.repost.delete({
                where: {
                    id: idRepost
                }
            });
            res.json({
                message: "Repost supprimé avec succès",
                status: 200,
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Erreur interne du serveur",
                error: error.message,
            });
        }
    };
    static getRepostsByPost = async (req, res) => {
        const idPost = Number(req.params.idPost);
        try {
            const reposts = await prisma.repost.findMany({
                where: {
                    idPost: idPost
                },
                include: {
                    user: true,
                }
            });
            res.json({
                message: "Reposts récupérés avec succès",
                data: reposts,
                status: 200,
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Erreur interne du serveur",
                error: error.message,
            });
        }
    };
    //get all repost
    static getAllRepost = async (req, res) => {
        try {
            const reposts = await prisma.repost.findMany();
            res.json({
                message: "Reposts récupérés avec succès",
                data: reposts,
                status: 200,
            });
        }
        catch (error) {
            res.status(500).json({
                message: "Erreur interne du serveur",
                error: error.message,
            });
        }
    };
}
