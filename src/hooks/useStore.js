import { useContext } from "react";
import { StoreContext } from "../provider/StoreProvider";

export const useStore = () => useContext(StoreContext);
