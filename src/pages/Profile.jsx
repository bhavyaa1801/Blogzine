import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { Container, Button, Input } from "../components";

// use dispatch jha pr global state chnage krni ho

export default function Profile() {

    const userData = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();

    const [name, setName] = useState(userData?.name || "");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    if (!userData) {
        return <div className="p-10">Please login</div>;
    }

    const updateName = async () => {
        try {
            setLoading(true);
            setMsg("");

            const updated = await authService.updateName(name);

            // update redux with new user data
            dispatch(login({ userData: updated }));

            setMsg("Name updated successfully ✅");

        } catch (e) {
            setMsg("Update failed ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-10">
            <Container>

                <div className="bg-[#FFF9EE] p-8 rounded-xl shadow-md max-w-xl">

                    <h2 className="text-2xl font-bold mb-6 text-[#8C4411]">
                        User Profile
                    </h2>

                    {/* USER INFO */}
                    <div className="mb-6 space-y-2 text-sm">
                        <p><b>User ID:</b> {userData.$id}</p>
                        <p><b>Email:</b> {userData.email}</p>
                        <p><b>Status:</b> {userData.emailVerification ? "Verified" : "Not Verified"}</p>
                    </div>

                    {/* NAME UPDATE */}
                    <Input
                        label="Display Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mb-4"
                    />

                    <Button
                        onClick={updateName}
                        disabled={loading}
                        className="w-full"
                    >
                        {loading ? "Updating..." : "Update Name"}
                    </Button>

                    {msg && (
                        <p className="mt-4 text-sm text-[#8C4411]">
                            {msg}
                        </p>
                    )}

                </div>

            </Container>
        </div>
    );
}
