"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styles from "@/styles/AdminUsers.module.css";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("/api/admin/users");
            const data = await response.json();

            if (data.success) {
                setUsers(data.users);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            const response = await fetch(`/api/admin/users/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: newRole }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success("User role updated!");
                fetchUsers();
            } else {
                toast.error(data.error || "Failed to update role");
            }
        } catch (error) {
            console.error("Error updating role:", error);
            toast.error("Failed to update role");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Users Management</h1>

            {loading ? (
                <div className={styles.loading}>Loading users...</div>
            ) : (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Joined</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span
                                            className={`${styles.badge} ${user.role === "admin"
                                                    ? styles.badgeAdmin
                                                    : styles.badgeUser
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <select
                                            value={user.role}
                                            onChange={(e) =>
                                                handleRoleChange(user._id, e.target.value)
                                            }
                                            className={styles.roleSelect}
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
