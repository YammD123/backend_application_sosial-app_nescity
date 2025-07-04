import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePostDto } from "./post.dto";

@Injectable()
export class PostRepository {
    constructor(
        private readonly prisma:PrismaService
    ) {}

    public async createPost(caption:string,user_id:string) {
        return await this.prisma.post.create({
            data: {
                user_id:user_id,
                caption:caption,
            }
        })
    }

    public async getPostsMe(user_id:string) {
        return await this.prisma.post.findMany({
            where: {
                user_id: user_id
            },
            include: {
                media: true,
                user: {
                    include: {
                        profile: true
                    }
                },
                like: true
            },
            orderBy: {
                created_at: 'desc'
            }
        })
    }

    public async getAllPostsByDesc(){
        return await this.prisma.post.findMany({
            include: {
                media: true,
                user: {
                    include: {
                        profile: true
                    }
                },
                like: true
            },
            orderBy: {
                created_at: 'desc'
            }
        })
    }

    public async getPostById(id:string) {
        return await this.prisma.post.findUnique({
            where: {
                id: id
            },
            include: {
                media: true,
                user: {
                    include: {
                        profile: true
                    }
                },
                like: true
            }
        })
    }

    public async getUserIdPosts(id:string) {
        return await this.prisma.post.findMany({
            where: {
                user_id: id
            },
            include: {
                user: {
                    include: {
                        profile: true
                    }
                },
                media: true,
                like: true
            }
        })
    }

    public async deletePost(user_id:string,id:string) {
        return await this.prisma.post.delete({
            where: {
                user_id:user_id,
                id:id
            }
        })
    }

    public async updatePost(user_id:string,caption:string,post_id:string) {
        return await this.prisma.post.update({
            where: {
                user_id:user_id,
                id:post_id
            },
            data: {
                caption:caption
            }
        })
    }
}
