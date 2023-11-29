"use client";
import { Avatar } from "keep-react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../hooks/useStore";

export const SidebarComponent = () => {
  const navigate = useNavigate();
  const { user, allUsers } = useStore();

  const handleClick = (user) => {
    navigate(`/home/user/${user.user_id}`, { state: user });
  };
  return (
    <div className="p-3">
      <div className="mb-3 flex flex-row items-center bg-blue-600 text-white px-2 py-2">
        <Avatar
          shape="circle"
          size="sm"
          img={user.photo}
          status="online"
          statusPosition="bottom-left"
        />
        <div className="ml-4">
          <p className="my-0 mb-[-5px] py-0">{user.user_name}</p>
          <small>{user.status}</small>
        </div>
      </div>
      <hr />
      <div className="mb-4" />
      {allUsers.map((user) => (
        <div
          key={user.user_id}
          className="mb-3 flex cursor-pointer flex-row items-center bg-gray-100 px-2 py-2"
          onClick={() => {
            handleClick(user);
          }}
        >
          <Avatar
            shape="circle"
            size="sm"
            img={user.photo}
            status={user.status}
            statusPosition="bottom-left"
          />
          <div className="ml-4">
            <p className="my-0 mb-[-5px] py-0">{user.user_name}</p>
            <small>{user.status}</small>
          </div>
        </div>
      ))}
    </div>
  );
};
