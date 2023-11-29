import { Button, Label, TextInput } from "keep-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";
import { useStore } from "../hooks/useStore";

export default function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const { socket } = useSocket();
  const { setUser } = useStore();

  const handleSubmit = () => {
    if (id && id <= 6) {
      socket.emit("login-user", id, (response, err) => {
        if (err) {
          console.log("err", err);
        } else {
          setUser(response.data);
          navigate("/home");
        }
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <form className="w-[400px] border px-4 py-6">
        <h1 className="text-2xl text-center text-green-600 mb-5">
          Please Login
        </h1>
        <div className="my-3">
          <Label value="User id" />
          <TextInput
            handleOnChange={(e) => setId(e.target.value)}
            value={id}
            id="user_id"
            placeholder="user id"
            color="gray"
          />
        </div>
        <div className="my-3">
          <Label value="Password" />
          <TextInput id="password" placeholder="Password" color="gray" />
        </div>

        <div className="flex justify-center mt-6">
          <Button onClick={handleSubmit} size="sm">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
