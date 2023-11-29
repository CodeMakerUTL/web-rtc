import React from "react";
import { useStoreGlobal } from "../hooks/useStoreGlobal";

export const StoreContext = React.createContext(null);

// eslint-disable-next-line react/prop-types
export default function StoreProvider({ children }) {
  return (
    <StoreContext.Provider value={useStoreGlobal()}>
      {children}
    </StoreContext.Provider>
  );
}
