import { PrismaClient } from "@prisma/client";
import prisma from "../config/prisma";
import userRouter from "../router/user.route";
import { BadRequest } from "../utils/httperrors";
export class SavePost {
  constructor(private saveModel: PrismaClient["savepost"]) {}

  async savePost(userId: string, postId: string) {
    const data = {
      userId,
      postId,
    };
    const exist = await this.saveModel.findMany({
      where: { userId: userId, postId: postId },
    });

    if (exist.length == 1) {
      throw new BadRequest("Post is already saved", 400);
    }
    const savePost = await this.saveModel.create({ data });

    return savePost;
  }
  async deleteSavePost(userId: string, postId: string) {
    const check = await this.saveModel.findUnique({
      where: { userId: userId, id: postId },
    });
    if (!check) {
      throw new BadRequest("SavePost not found", 400);
    }
    const deletePost = await this.saveModel.delete({
      where: { id: postId, userId: userId },
    });
    if (!deletePost) {
      throw new BadRequest("Can't delete the save post", 400);
    }

    return deletePost;
  }
  async getSavePosts(userId: string) {
    const getPosts = await this.saveModel.findMany({
      where: { userId: userId },
      include: {
        post: true,
      },
    });

    return getPosts;
  }
  async getListSave(userId: string) {
    const checkSave = await this.saveModel.findMany({
      where: { userId: userId },
    });

    if (checkSave.length === 0) {
      throw new BadRequest("No Save Yet", 400);
    }

    return checkSave;
  }
  async getSavePostById(saveId: any) {
    const post = await this.saveModel.findUnique({ where: { id: saveId } });

    if (!post) {
      throw new BadRequest("No such Save", 400);
    }

    return post;
  }
}
export const savePost = new SavePost(prisma.savepost);
