import { Outlet, useNavigate } from "react-router-dom";
import { SidebarComponent } from "../components/Sidebar";
import { useStore } from "../hooks/useStore";
import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import IncomingCallModal from "../components/IncomingCallModal";
import { usePeer } from "../hooks/usePeer";
import peer from "../service/peer";

export default function Home() {
  const { allUsers, user, setAllUsers } = useStore();
  const { socket } = useSocket();
  const { remoteUser, setRemoteUser, setIsIncomingCall } = usePeer();
  const navigate = useNavigate();

  const [showIncomingModal, setShowIncomingModal] = useState(false);
  const [remoteOffer, setRemoteOffer] = useState(null);

  const handleUserOnline = useCallback(
    (user) => {
      const users = [...allUsers];
      const index = users.findIndex((item) => item.user_id == user.user_id);
      if (index != -1) {
        users[index].status = "online";
        setAllUsers([...users]);
      }
    },
    [allUsers, setAllUsers]
  );

  const handleUserOffline = useCallback(
    (user) => {
      const users = [...allUsers];
      const index = users.findIndex((item) => item.user_id == user.user_id);
      if (index != -1) {
        users[index].status = "offline";
        setAllUsers([...users]);
      }
    },
    [allUsers, setAllUsers]
  );

  const handleIncomingCall = useCallback(
    ({ from, offer }) => {
      setRemoteUser(from);
      setRemoteOffer(offer);
      setShowIncomingModal(true);
      // console.log("incoming call");
      console.log({ from, offer });
    },
    [setRemoteUser]
  );

  const handleAccept = useCallback(async () => {
    const answer = await peer.getAnswer(remoteOffer);
    // sendMyStream();
    socket.emit("call-accepted", { to: remoteUser.socket_id, answer });
    setShowIncomingModal(false);
    setIsIncomingCall(true);
    navigate("/home/video-call", { state: remoteUser });
  }, [remoteOffer, socket, remoteUser, setIsIncomingCall, navigate]);

  const handleCallAccepted = useCallback(async ({ answer }) => {
    console.log("user call accepted");
    // console.log({ answer });
    await peer.setRemoteDescription(answer);
    // sendMyStream();
  }, []);

  const handleDeny = useCallback(() => {
    console.log("Call Deny");
    setShowIncomingModal(false);
  }, []);

  useEffect(() => {
    if (allUsers && allUsers.length < 1) {
      socket.emit("get-all-user", user.user_id, (response, err) => {
        if (err) {
          console.log(err);
        } else {
          setAllUsers(response.data);
        }
      });
    }
  }, [allUsers, setAllUsers, socket, user.user_id]);

  const handleNegoNeededIncoming = useCallback(
    async ({ offer, from_id }) => {
      const answer = await peer.getAnswer(offer);
      console.log("nego incoming ", { from_id });
      socket.emit("negotiation-done", { answer, to: from_id });
    },
    [socket]
  );
  const handleNegoAccepted = useCallback(async ({ answer }) => {
    await peer.setRemoteDescription(answer);
  }, []);

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();

    socket.emit("negotiation-needed", {
      offer,
      to_user_id: remoteUser.user_id,
    });
  }, [remoteUser, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);

    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  useEffect(() => {
    // online offline
    socket.on("user-online", handleUserOnline);
    socket.on("user-offline", handleUserOffline);
    // call
    socket.on("incoming-call", handleIncomingCall);
    socket.on("call-accepted", handleCallAccepted);
    //negotiation
    socket.on("negotiation-needed", handleNegoNeededIncoming);
    socket.on("negotiation-accepted", handleNegoAccepted);

    return () => {
      socket.off("user-online", handleUserOnline);
      socket.off("user-offline", handleUserOffline);
      socket.off("incoming-call", handleIncomingCall);
      socket.off("call-accepted", handleCallAccepted);
      socket.off("negotiation-needed", handleNegoNeededIncoming);
      socket.off("negotiation-accepted", handleNegoAccepted);
    };
  }, [
    handleUserOffline,
    handleUserOnline,
    socket,
    handleIncomingCall,
    handleCallAccepted,
    handleNegoNeededIncoming,
    handleNegoAccepted,
  ]);

  return (
    <div className="flex flex-row h-[100vh]" style={{ minWidth: "600px" }}>
      <div className="border w-[250px]">
        <SidebarComponent />
      </div>
      <div className="border flex-1 h-full justify-center items-center">
        <Outlet />
      </div>
      <IncomingCallModal
        show={showIncomingModal}
        user={remoteUser}
        handleAnswer={handleAccept}
        handleDeny={handleDeny}
      />
    </div>
  );
}
