import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateDefaultCommentDto, CreateReplyCommentDto } from "./comment.dto";

@Injectable()
export class CommentRepository {
    constructor(
        private readonly prisma:PrismaService
    ) {}

    public async createDefaultComment(user_id: string, dto: CreateDefaultCommentDto) {
        return await this.prisma.comment.create({
            data: {
                content: dto.content,
                user_id: user_id,
                post_id: dto.post_id,
                parent_id: null, // top-level comment
            },
        });
    }

    public async getCommentsByPostId(post_id: string) {
        return await this.prisma.comment.findMany({
            where:{
                post_id:post_id
            },
            include: {
                user: {
                    include: {
                        profile: true
                    }
                },
            },
            orderBy: {
                created_at: 'desc'
            }
        })
    }


    public async getTotalCommentsByPostId(post_id: string) {
        return await this.prisma.comment.count({
            where: {
                post_id: post_id
            }
        });
    }

    public async createReplyComment(user_id: string, dto: CreateReplyCommentDto) {
        return await this.prisma.comment.create({
            data: {
                content: dto.content,
                user_id: user_id,
                post_id: dto.post_id,
                parent_id: dto.parent_id, // reply to a specific comment
            },
        });
    }

    public async getCommentById(id: string) {
        return await this.prisma.comment.findUnique({
            where: {
                id: id
            },
            include: {
                user: {
                    include: {
                        profile: true
                    }
                },
            }
        });
    }
}