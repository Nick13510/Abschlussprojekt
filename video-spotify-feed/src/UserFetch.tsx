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

  if (!response.ok) throw new Error("Failed to fetch User profile");

  const data = await response.json();
  console.log("Fetched user profile:", data);
  return data;
};

export const UserProfileUpdate = async (updatedData: {
  username?: string;
  email?: string;
}): Promise<User> => {
  const token = localStorage.getItem("Token");
  const response = await fetch(
    "https://react-vid-app.vercel.app/api/users/profile",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    }
  );

  if (!response.ok) throw new Error("Failed to update profile");

  return response.json();
};
