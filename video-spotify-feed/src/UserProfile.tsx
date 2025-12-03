import React, { useEffect, useState } from "react";
import { UserProfileFetchOwnProfile, UserProfileUpdate } from "./UserFetch";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
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

  const handleUpdate = async () => {
    if (!user) return;
    try {
      const updated = await UserProfileUpdate({ username, email });
      setUser(updated);
      alert("Profil erfolgreich aktualisiert!");
    } catch (err: any) {
      alert("Fehler beim Aktualisieren: " + err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-base-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Mein Profil</h1>

      <div className="overflow-x-auto">
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
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfile;
