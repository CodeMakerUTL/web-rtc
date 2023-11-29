import { Avatar, Button } from "keep-react";
import { useLocation, useNavigate } from "react-router-dom";
import { VideoCamera, PhoneOutgoing } from "phosphor-react";
import { usePeer } from "../hooks/usePeer";
import { useCallback } from "react";
import { useSocket } from "../hooks/useSocket";
import { useStore } from "../hooks/useStore";
import peer from "../service/peer";

const UserDetails = () => {
  const { state } = useLocation();
  const { setRemoteUser } = usePeer();
  const { socket } = useSocket();
  const { user } = useStore();

  const navigate = useNavigate();

  const handleCallOffer = useCallback(async () => {
    const offer = await peer.getOffer();
    console.log(offer);
    socket.emit(
      "call-user",
      { offer, to: state.user_id, from: user },
      (res, err) => {
        if (res) {
          if (res.status == 1) {
            setRemoteUser(state);
            navigate("/home/video-call", { state });
          } else {
            alert("User not online");
          }
        } else {
          console.log(err);
        }
      }
    );
  }, [navigate, setRemoteUser, socket, state, user]);

  return (
    <div className="mt-3 flex flex-col h-full">
      <nav className="bg-gray-100 px-2 py-2 flex flex-row justify-between">
        <div className="mb-3 flex flex-row items-center ">
          <Avatar
            shape="circle"
            size="sm"
            img={state.photo ? state.photo : undefined}
            status={state.status}
            statusPosition="bottom-left"
          />
          <div className="ml-4">
            <p className="my-0 mb-[-5px] py-0">{state.username}</p>
            <small>{state.status}</small>
          </div>
        </div>
        <div className="flex flex-row gap-4 mr-10">
          <Button size="md" type="outlineGray" circle={true}>
            <span>
              <PhoneOutgoing size={32} />
            </span>
          </Button>
          <Button
            onClick={handleCallOffer}
            size="md"
            type="outlineGray"
            circle={true}
          >
            <span>
              <VideoCamera size={32} />
            </span>
          </Button>
        </div>
      </nav>
      <div className="flex-1 justify-center items-center flex">
        <div className="flex flex-row gap-4 mr-10 bg-gray-100 py-10 px-10">
          <Button size="md" type="outlineGray" circle={true}>
            <span>
              <PhoneOutgoing size={32} />
            </span>
          </Button>
          <Button
            onClick={handleCallOffer}
            size="md"
            type="outlineGray"
            circle={true}
          >
            <span>
              <VideoCamera size={32} />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
