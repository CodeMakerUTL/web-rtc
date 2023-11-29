import { useState } from "react";

export const useStoreGlobal = () => {
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  return {
    user,
    setUser,
    allUsers,
    setAllUsers,
  };
};
