import { Request, Response } from "express";
import prisma from "../config/prisma";
import { PrismaClient } from "@prisma/client";
import { BadRequest } from "../utils/httperrors";
import cloudinary from "cloudinary";

export class PostService {
  constructor(
    private postModel: PrismaClient["post"],
    private saveModel: PrismaClient["savepost"],
    private DetailModel: PrismaClient["postDetail"],
  ) {}

  async addPost(postData: any, postDetail: any, userId: any, image: string) {
    const result = await cloudinary.v2.uploader.upload(image, {
      folder: "check/estateApp",
    });
    postData.userId = userId;
    console.log("This is result", result);

    const post = await this.postModel.create({
      data: {
        ...postData,
        image: {
          publicId: result.public_id,
          url: result.secure_url,
        },
        postDetail: {
          create: postDetail,
        },
      },
    });
    console.log("This is post", post);
    return post;
  }
  async getPost(id: any) {
    const singlePost = await this.postModel.findUnique({
      where: { id: id },
      include: {
        postDetail: true,
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
    });

    if (!singlePost) {
      throw new BadRequest("no specific post available", 400);
    }
    return singlePost;
  }
  async getPosts(query: any) {
    const getPosts = await prisma.post.findMany({
      where: {
        title: query.search
          ? {
              contains: query.search,
              mode: "insensitive",
            }
          : undefined,
        city: query.city
          ? {
              contains: query.city,
              mode: "insensitive",
            }
          : undefined,
        type: query.type
          ? {
              equals: query.type,
            }
          : undefined,

        price: {
          gte: query.minPrice ? parseInt(query.minPrice) : undefined,
          lte: query.maxPrice ? parseInt(query.maxPrice) : undefined,
        },
      },
    });
    if (getPosts.length === 0) {
      throw new BadRequest("zero Post", 400);
    }

    return getPosts;
  }

  async updatePost(body: any, userId: string, postId: any) {
    const check = await this.postModel.findUnique({
      where: { userId: userId, id: postId },
    });
    if (!check) {
      throw new BadRequest("can't Change different post", 400);
    }

    const update = await this.postModel.update({
      where: {
        id: postId,
      },
      data: {
        ...body,
      },
    });
    return update;
  }
  async deletePost(userId: string, postId: string) {
    const check = await this.postModel.findMany({
      where: { userId: userId, id: postId },
    });
    if (check.length == 0) {
      throw new BadRequest("can't Delete different User post", 400);
    }

    console.log("This si check", check);
    await this.DetailModel.deleteMany({ where: { postId: postId } });
    const saveDelete = await this.saveModel.deleteMany({
      where: { postId: postId },
    });

    const deletePost = await this.postModel.delete({ where: { id: postId } });

    return deletePost;
  }

  async userPost(userId: any) {
    const userPost = await this.postModel.findMany({
      where: { userId: userId },
    });

    return userPost;
  }
}

export const postService = new PostService(
  prisma.post,
  prisma.savepost,
  prisma.postDetail,
);
