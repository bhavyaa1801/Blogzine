import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


function Home() {

    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (authStatus) {
            appwriteService.getPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            });
        }
    }, [authStatus]);

    if (!authStatus) {
        return (
             
            <div className="bg-gradient-to-b from-[#fff7e6] to-[#f5efe6]">
                

                {/* HERO */}
                <div className="flex flex-col items-center justify-center text-center py-24 px-4">

                    <h2 className="text-3xl md:text-6xl font-serif tracking-wide mb-3 text-[#8C4411]">
                        Welcome to <span className="italic">Blogzine</span>
                    </h2>

                    <h1 className="text-4xl md:text-4xl font-bold mb-4">
                        Share Your Thoughts With The World
                    </h1>

                    <p className="text-lg text-gray-600 mb-8 max-w-xl">
                        Create, publish and explore blogs from developers and creators.
                    </p>

                    <div className="flex gap-4">
                        <Link to="/login">
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
                                Login
                            </button>
                        </Link>

                        <Link to="/signup">
                            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg">
                                Sign Up
                            </button>
                        </Link>
                    </div>

                </div>


                {/* FEATURES */}
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 py-16 px-4">

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-xl font-semibold mb-2">Create Posts</h3>
                        <p>Write and publish blogs easily.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-xl font-semibold mb-2">Like & Comment</h3>
                        <p>Engage with the community.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-xl font-semibold mb-2">Manage Profile</h3>
                        <p>Edit profile and manage posts.</p>
                    </div>

                </div>

            </div>
        );
    }

    return (
        <div className="w-full py-10">
            <Container>

                <div
                    className="
            grid gap-6
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
          "
                >
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>

            </Container>
        </div>
    );
}

export default Home;
