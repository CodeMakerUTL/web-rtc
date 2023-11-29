import { Button } from "keep-react";
// import { useLocation } from "react-router-dom";
import { MicrophoneSlash, PhoneX, VideoCameraSlash } from "phosphor-react";
import { useCallback, useEffect } from "react";
import ReactPlayer from "react-player";
import { usePeer } from "../hooks/usePeer";
import peer from "../service/peer";
import { useNavigate } from "react-router-dom";

const CallPage = () => {
  // const { state } = useLocation();
  const {
    myStream,
    setMyStream,
    remoteStream,
    setRemoteStream,
    setRemoteUser,
    isIncomingCall,
    setIsIncomingCall,
    sendMyStream,
  } = usePeer();
  const navigate = useNavigate();
  const getUserMediaStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
  }, [setMyStream]);

  useEffect(() => {
    getUserMediaStream();
  }, [getUserMediaStream, isIncomingCall, sendMyStream]);

  const send = useCallback(() => {
    if (myStream) {
      const tracks = myStream.getTracks();

      for (const track of tracks) {
        peer.peer.addTrack(track, myStream);
      }
    }
  }, [myStream]);

  const handleCallEnd = useCallback(() => {
    peer.peer.close();
    setMyStream(null);
    setRemoteStream(null);
    setRemoteUser(null);
    setIsIncomingCall(false);
    navigate("/home");
  }, [
    navigate,
    setIsIncomingCall,
    setMyStream,
    setRemoteStream,
    setRemoteUser,
  ]);

  const handleIceStateChange = useCallback(() => {
    if (peer.peer.iceConnectionState === "disconnected") {
      console.log("disconnected =>");
      setMyStream(null);
      setRemoteStream(null);
      setRemoteUser(null);
      setIsIncomingCall(false);
      peer.peer.close();
      navigate("/home");
    }
  }, [
    navigate,
    setIsIncomingCall,
    setMyStream,
    setRemoteStream,
    setRemoteUser,
  ]);

  const handleSignalingStateChange = useCallback(() => {
    console.log(peer.peer.signalingState, "signaling state");
  }, []);

  useEffect(() => {
    peer.peer.addEventListener(
      "iceconnectionstatechange",
      handleIceStateChange
    );

    peer.peer.addEventListener(
      "signalingstatechange",
      handleSignalingStateChange
    );

    return () => {
      peer.peer.removeEventListener(
        "iceconnectionstatechange",
        handleIceStateChange
      );
      peer.peer.removeEventListener(
        "signalingstatechange",
        handleSignalingStateChange
      );
    };
  });

  return (
    <div className="bg-black fixed inset-0 justify-center flex ">
      <div
        style={{ width: "600px", height: "100vh" }}
        className="border relative"
      >
        <Button className="absolute top-3 left-4 z-10" onClick={send}>
          Send My stream
        </Button>
        <div className="h-full">
          <ReactPlayer
            width="600px"
            height="100vh"
            url={myStream}
            muted
            playing
          />
        </div>
        <div className="absolute bottom-36 right-5 border">
          {remoteStream && (
            <ReactPlayer
              width="120px"
              height="180px"
              url={remoteStream}
              playing
            />
          )}
        </div>
        <div className="flex flex-row justify-center gap-4 mr-10 absolute bottom-10 left-0 right-0">
          <Button size="md" type="outlineGray" circle={true}>
            <span>
              <MicrophoneSlash size={32} />
            </span>
          </Button>
          <Button
            onClick={handleCallEnd}
            size="md"
            color="error"
            type="primary"
            circle={true}
          >
            <span>
              <PhoneX size={32} />
            </span>
          </Button>
          <Button size="md" type="outlineGray" circle={true}>
            <span>
              <VideoCameraSlash size={32} />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallPage;
