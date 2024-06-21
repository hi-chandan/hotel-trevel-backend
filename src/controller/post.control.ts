import { Request, Response } from "express";
import { PostService, postService } from "../service/post.service";
import { HttpRes } from "../utils/httpres";
import { imgInput, postInput } from "../schema/post.schama";

export class PostControl {
  constructor(private postService: PostService) {}

  async addPost(req: Request, res: Response) {
    console.log("This si file", req.file);
    const userId = req.user.id;

    const image = req.file?.path as string;
    req.body.image = image;
    imgInput.parse(req.body);

    console.log("This is image path", req.body);
    const postData = {
      title: req.body.title,
      price: req.body.price,
      address: req.body.address,
      city: req.body.city,
      bedroom: req.body.bedroom,
      bathroom: req.body.bathroom,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      type: req.body.type,
      property: req.body.property,
    };

    const postDetail = {
      desc: req.body.desc,
      utilities: req.body.utilities,
      pet: req.body.pet,
      size: req.body.size,
      income: req.body.income,
      bus: req.body.bus,
      restaurant: req.body.restaurant,
    };
    console.log("This is postDetails", postData);
    console.log("This is postDetails", postDetail);

    const post = await this.postService.addPost(
      postData,
      postDetail,
      userId,
      image,
    );

    return HttpRes.create(post, "post is created");
  }
  async getPost(req: Request, res: Response) {
    const id = req.params.id;
    const post = await this.postService.getPost(id);

    return HttpRes.ok(post, "Your post");
  }
  async getPosts(req: Request, res: Response) {
    const posts = await this.postService.getPosts(req.query);
    console.log("this is file", req.file);

    return HttpRes.ok(posts, "all posts");
  }
  async updatePost(req: Request, res: Response) {
    const userId = req.user.id;
    const data = req.body;
    const postId = req.params.id;
    const update = await this.postService.updatePost(data, userId, postId);

    return HttpRes.ok(update, "update is complete");
  }
  async deletePost(req: Request, res: Response) {
    console.log("Wrokking properly", req.params.id);
    const userId = req.user.id;
    const postId = req.params.id;
    const deletePost = await this.postService.deletePost(userId, postId);

    return HttpRes.ok(deletePost, "deleting is complete");
  }

  async userPost(req: Request, res: Response) {
    const userId = req.user.id;

    const userPost = await this.postService.userPost(userId);

    return HttpRes.ok(userPost, "userProfile List post and Save Post");
  }
}

export const postControl = new PostControl(postService);
