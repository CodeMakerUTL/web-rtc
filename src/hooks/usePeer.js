import { useContext } from "react";
import { PeerContext } from "../provider/PeerProvider";

export const usePeer = () => useContext(PeerContext);
