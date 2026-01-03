"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Footer from "@/components/Footer";
import styles from "@/styles/Profile.module.css";
import FinalNav from "@/components/FinalNav";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login?callbackUrl=/profile");
        }
        if (session?.user) {
            setFormData({
                name: session.user.name || "",
                email: session.user.email || "",
            });
        }
    }, [session, status, router]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/users/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: formData.name }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Profile updated successfully!");
                setEditMode(false);
                router.refresh();
            } else {
                toast.error(data.error || "Failed to update profile");
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (passwordData.newPassword.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/users/profile/password", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    oldPassword: passwordData.oldPassword,
                    newPassword: passwordData.newPassword,
                }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Password changed successfully!");
                setPasswordData({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
            } else {
                toast.error(data.error || "Failed to change password");
            }
        } catch (error) {
            console.error("Password change error:", error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (status === "loading") {
        return (
            <>
                <FinalNav />
                <div style={{ textAlign: "center", padding: "100px 20px" }}>
                    <h2>Loading...</h2>
                </div>
                <Footer />
            </>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <>
            <FinalNav/>
                <div className={styles.container}>
                    <h1 className={styles.title}>My Profile</h1>

                    {/* Profile Info */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2>Profile Information</h2>
                            {!editMode && (
                                <button
                                    onClick={() => setEditMode(true)}
                                    className={styles.editBtn}
                                >
                                    Edit
                                </button>
                            )}
                        </div>

                        {editMode ? (
                            <form onSubmit={handleUpdateProfile} className={styles.form}>
                                <div className={styles.inputGroup}>
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={styles.input}
                                        required
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        className={styles.input}
                                        disabled
                                    />
                                    <small>Email cannot be changed</small>
                                </div>

                                <div className={styles.btnGroup}>
                                    <button
                                        type="submit"
                                        className={styles.saveBtn}
                                        disabled={loading}
                                    >
                                        {loading ? "Saving..." : "Save Changes"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditMode(false)}
                                        className={styles.cancelBtn}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className={styles.infoDisplay}>
                                <div className={styles.infoItem}>
                                    <strong>Name:</strong> {session.user.name}
                                </div>
                                <div className={styles.infoItem}>
                                    <strong>Email:</strong> {session.user.email}
                                </div>
                                <div className={styles.infoItem}>
                                    <strong>Role:</strong> {session.user.role || "User"}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Change Password */}
                    <div className={styles.section}>
                        <h2>Change Password</h2>
                        <form onSubmit={handleChangePassword} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label>Current Password</label>
                                <input
                                    type="password"
                                    name="oldPassword"
                                    value={passwordData.oldPassword}
                                    onChange={handlePasswordChange}
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label>New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    className={styles.input}
                                    placeholder="Min 6 characters"
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label>Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className={styles.saveBtn}
                                disabled={loading}
                            >
                                {loading ? "Changing..." : "Change Password"}
                            </button>
                        </form>
                    </div>
                </div>
            <Footer />
        </>
    );
}
