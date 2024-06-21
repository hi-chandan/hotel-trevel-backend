import { Request, Response } from "express";
import { SavePost, savePost } from "../service/save.post.service";
import { HttpRes } from "../utils/httpres";

export class SaveControl {
  constructor(private saveService: SavePost) {}

  async savePost(req: Request, res: Response) {
    const userId = req.user.id;
    const postId = req.params.id;

    const savePost = await this.saveService.savePost(userId, postId);

    return HttpRes.create(savePost, "post is saved");
  }
  async deleteSavePost(req: Request, res: Response) {
    const userId = req.user.id;
    const saveId = req.params.id;

    const deletePost = await this.saveService.deleteSavePost(userId, saveId);

    return HttpRes.ok(deletePost, "removed Save");
  }
  async getSavePosts(req: Request, res: Response) {
    const userId = req.user.id;

    const getPosts = await this.saveService.getSavePosts(userId);

    return HttpRes.ok(getPosts, "all User posts");
  }
  async getListSave(req: Request, res: Response) {
    const userId = req.user.id;

    const getPosts = await this.saveService.getListSave(userId);

    return HttpRes.ok(getPosts, "all User posts");
  }
  async getSavePostById(req: Request, res: Response) {
    const saveId = req.params.id;
    const post = await this.saveService.getSavePostById(saveId);

    return HttpRes.ok(post, "User Save Post");
  }
}

export const saveControl = new SaveControl(savePost);
