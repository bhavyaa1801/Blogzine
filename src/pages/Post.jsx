import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);

    //likes 
    const [likes, setLikes] = useState([]);
    const [liked, setLiked] = useState(false);

    //comments
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const authStatus = useSelector((state) => state.auth.status);

    // safe ownership check
    const isAuthor = Boolean(
        post?.userid &&
        userData?.$id &&
        post.userid === userData.$id
    );

    //  fetch post only based on slug
    useEffect(() => {
        if (!slug) {
            navigate("/");
            return;
        }

        appwriteService.getPost(slug).then((p) => {
            if (p) setPost(p);
            else navigate("/");
        });

    }, [slug, navigate]);


    //load likes and comments
    useEffect(() => {
        if (!post) return;

        appwriteService.getLikes(post.$id).then((res) => {
            setLikes(res.documents);
            setLiked(
                res.documents.some(l => l.userid === userData?.$id)
            );
        });

        appwriteService.getComments(post.$id)
            .then(res => setComments(res.documents));

    }, [post, userData]);

    const handleLike = async () => {
        if (!userData) return alert("Login first");

        if (liked) {
            const myLike = likes.find(
                (l) => l.userid === userData.$id
            );

            if (myLike) {
                await appwriteService.unlikePost(myLike.$id);
            }

        } else {
            await appwriteService.likePost(post.$id, userData.$id);
        }

        const res = await appwriteService.getLikes(post.$id);

        setLikes(res.documents);
        setLiked(
            res.documents.some(l => l.userid === userData.$id)
        );
    };


    //add comment

    const submitComment = async () => {
        if (!userData) return alert("Login first");
        if (!commentText.trim()) return;

        await appwriteService.addComment({
            postid: post.$id,
            userid: userData.$id,
            username: userData.name || "User",
            content: commentText
        });

        setCommentText("");

        const res = await appwriteService.getComments(post.$id);
        setComments(res.documents);
    };



    //  delete post
    const deletePost = () => {
        if (!isAuthor) {
            alert("Not allowed");
            return;
        }

        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredimage);
                navigate("/");
            }
        });
    };


    // console.log("post userid:", post?.userid);
    // console.log("logged userid:", userData?.$id);
    // console.log("isAuthor:", isAuthor);

    if (!post) return null;

    return (
        <div className="py-8">
            <Container>

                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">

                    <img
                        src={appwriteService.getFileView(post.featuredimage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {/* ✅ Only show when auth loaded AND author */}
                    {authStatus && isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>

                            <Button
                                bgColor="bg-red-500"
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                        </div>
                    )}

                </div>

                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">
                        {post.title}
                    </h1>
                </div>

                <div className="mb-6">
                    <button
                        onClick={handleLike}
                        className={`px-4 py-2 rounded-lg ${liked
                            ? "bg-red-500 text-white"
                            : "bg-gray-200"
                            }`}
                    >
                        ❤️ {likes.length}
                    </button>
                </div>

                <div className="browser-css">
                    {parse(post.content)}
                </div>

                <div className="max-w-2xl">

                    <h2 className="text-xl font-semibold mb-2">
                        Comments ({comments.length})
                    </h2>

                    <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="w-full border p-2 rounded"
                        placeholder="Write a comment..."
                    />

                    <button
                        onClick={submitComment}
                        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Post Comment
                    </button>

                    {comments.map((c) => (
                        <div
                            key={c.$id}
                            className="mt-4 p-3 bg-gray-100 rounded"
                        >
                            <p className="font-semibold">
                                {c.username}
                            </p>
                            <p>{c.content}</p>
                        </div>
                    ))}

                </div>

            </Container>
        </div>
    );
}
