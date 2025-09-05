import React from "react";
import NotFound from "@/app/not-found";
import ProfileUserPage from "./user-profile";

interface IProps {
  params: Promise<{ id: string }>;
}

const UserDetailsPage = async ({ params }: IProps) => {
  const { id } = await params;
  if (!id) {
    return <NotFound />;
  }
  return <ProfileUserPage id={id} />;
};

export default UserDetailsPage;
