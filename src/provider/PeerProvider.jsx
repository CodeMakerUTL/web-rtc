import { createContext, useCallback, useEffect, useState } from "react";
import peer from "../service/peer";

export const PeerContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const PeerProvider = ({ children }) => {
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [remoteUser, setRemoteUser] = useState(null);
  const [isIncomingCall, setIsIncomingCall] = useState(false);

  const handleTrackEvent = useCallback((ev) => {
    console.log("ev track", ev);
    const streams = ev.streams;
    setRemoteStream(streams[0]);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", handleTrackEvent);

    return () => {
      peer.peer.removeEventListener("track", handleTrackEvent);
      console.log("removed listener");
    };
  }, [handleTrackEvent]);

  const sendMyStream = async () => {
    if (myStream) {
      const tracks = myStream.getTracks();

      for (const track of tracks) {
        console.log("sending track", track);
        peer.peer.addTrack(track, myStream);
      }
    }
  };

  return (
    <PeerContext.Provider
      value={{
        peer,
        sendMyStream,
        myStream,
        setMyStream,
        remoteStream,
        setRemoteStream,
        remoteUser,
        setRemoteUser,
        isIncomingCall,
        setIsIncomingCall,
      }}
    >
      {children}
    </PeerContext.Provider>
  );
};
