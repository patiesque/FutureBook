import express, { Request, Response } from "express";
import { createUserEndpoint } from "./endpoints/users/createUser";
import { loginUserEndpoint } from "./endpoints/users/loginUser";
import { followUserEndpoint } from "./endpoints/users/followUser";
import { deleteFriendEndpoint } from "./endpoints/users/deleteFriend";
import { createPostEndpoint } from "./endpoints/post/createPost";
import { getFeedForUserEndpoint } from "./endpoints/feed/getFeedForUser";
import { getFeedTypeEndpoint } from "./endpoints/feed/getFeedType";
import { LikePostEndpoint } from "./endpoints/post/likePost";
import { dislikePostEndpoint } from "./endpoints/post/dislikePost";
import { commentPostEndpoint } from "./endpoints/post/commentPost";

const app = express();
app.use(express.json());

app.post("/createUser", createUserEndpoint);
app.post("/login", loginUserEndpoint);
app.post("/user/follow", followUserEndpoint);
app.delete("/delete/friend", deleteFriendEndpoint);

app.post("/createPost", createPostEndpoint);
app.post("/likepost", LikePostEndpoint);
app.delete("/dislike", dislikePostEndpoint);
app.post("/commentPost", commentPostEndpoint);

app.get("/feed", getFeedForUserEndpoint);
app.get("/feedtype", getFeedTypeEndpoint);

export default app;
