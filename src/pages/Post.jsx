import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const authStatus = useSelector((state) => state.auth.status);

    // SAFE ownership check (re-evaluates every render)
    const isAuthor = Boolean(
        post?.userid &&
        userData?.$id &&
        post.userid === userData.$id
    );

    //  Fetch post ONLY based on slug
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

    // Guarded delete
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


    console.log("post userid:", post?.userid);
    console.log("logged userid:", userData?.$id);
    console.log("isAuthor:", isAuthor);

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

                <div className="browser-css">
                    {parse(post.content)}
                </div>

            </Container>
        </div>
    );
}
