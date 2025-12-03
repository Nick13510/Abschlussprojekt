import React, { useEffect, useState } from "react";
import { UserProfileFetchOwnProfile, UserFetchAll } from "./UserFetch";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any | null>(null);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    UserProfileFetchOwnProfile()
      .then((data) => {
        setUser(data);
        setUsername(data.username);
        setEmail(data.email);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    UserFetchAll()
      .then((data) => setAllUsers(data))
      .catch((err) => console.error("Fetch all users error:", err));
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Mein Profil</h1>

      <div className="overflow-x-auto mb-6">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-base-200">
              <th>1</th>
              <td>{user?.username}</td>
              <td>{user?.email}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Alle User</h2>
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((u, idx) => (
              <tr key={u.id} className="bg-base-200">
                <th>{idx + 1}</th>
                <td>{u.username}</td>
                <td>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfile;
