import { createContext, useMemo } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io("http://localhost:5000"), []);

  console.log("Socket", socket);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
