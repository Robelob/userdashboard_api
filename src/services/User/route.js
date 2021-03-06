import express from "express";
import createHttpError from "http-errors";

import UserModel from "./schema.js";

const postRouter = express.Router();

// ************************************* ROUTERS *************************************

// -----------------------------------POST--------------------------------------
postRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const newPost = new UserModel(req.body);
    const { _id } = await newPost.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});
// -----------------------------------GET--------------------------------------
postRouter.get("/", async (req, res, next) => {
  try {
    const getPosts = await UserModel.find({});
    if (getPosts) {
      res.send(getPosts);
    } else {
      next(createHttpError(404, `REQUEST NOT FOUND !!`));
    }
  } catch (error) {
    next(error);
  }
});
// -----------------------------------GET WITH ID--------------------------------------
postRouter.get("/:postId", async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const getPosts = await UserModel.findById(postId);
    if (getPosts) {
      res.send(getPosts);
    } else {
      next(createHttpError(404, `POST  WITH ID:- ${postId} NOTFOUND !!`));
    }
  } catch (error) {
    next(error);
  }
});
// -----------------------------------PUT--------------------------------------
postRouter.put("/:postId", async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const updatedPost = await UserModel.findByIdAndUpdate(postId, req.body, {
      new: true,
    });
    if (updatedPost) {
      res.send(updatedPost);
    } else {
      next(
        createHttpError(404, `POST  WITH ID:- ${postId} CANNOT UPDATED  !!`)
      );
    }
  } catch (error) {
    next(error);
  }
});
// -----------------------------------DELETE--------------------------------------

postRouter.delete("/:postId", async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const deletedPost = await UserModel.findByIdAndDelete(postId);
    if (deletedPost) {
      res.status(204).send(deletedPost);
    } else {
      next(createHttpError(404, `POST  WITH ID:- ${postId} NOT FOUND  !!`));
    }
  } catch (error) {
    next(error);
  }
});

export default postRouter;
