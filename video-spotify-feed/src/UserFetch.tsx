export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
}

export const UserProfileFetchOwnProfile = async (): Promise<User> => {
  const token = localStorage.getItem("Token");

  const response = await fetch(
    "https://react-vid-app.vercel.app/api/users/profile",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  const data = await response.json();
  console.log("Fetched user profile:", data);
  return data;
};

export const UserFetchAll = async (): Promise<User[]> => {
  const token = localStorage.getItem("Token");

  const response = await fetch("https://react-vid-app.vercel.app/api/users", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Failed to fetch users");

  return response.json();
};
