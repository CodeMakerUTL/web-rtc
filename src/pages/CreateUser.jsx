import { Button, Label, TextInput } from "keep-react";

import { useState } from "react";
import { useSocket } from "../hooks/useSocket";

const CreateUser = () => {
  const { socket } = useSocket();
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [photo, setPhoto] = useState(null);

  const handleSubmit = () => {
    if (id && name && photo) {
      socket.emit("user_create", id, name, photo);
    } else {
      alert("Please fill all input");
    }
  };
  console.log("UC", socket);

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <form className="w-[400px] border px-4 py-6">
        <h1 className="text-2xl text-center text-green-600 mb-5">
          Create User
        </h1>
        <div className="my-3">
          <Label value="User id" />
          <TextInput
            handleOnChange={(e) => {
              setId(e.target.value);
            }}
            value={id}
            id="user_id"
            placeholder="user id"
            color="gray"
          />
        </div>
        <div className="my-3">
          <Label value="User Name" />
          <TextInput
            handleOnChange={(e) => setName(e.target.value)}
            value={name}
            id="username"
            placeholder="User name"
            color="gray"
          />
        </div>
        <div className="my-3">
          <Label value="Photo" />
          <TextInput
            handleOnChange={(e) => setPhoto(e.target.value)}
            value={photo}
            id="photo"
            placeholder="photo"
            color="gray"
          />
        </div>

        <div className="flex justify-center mt-6">
          <Button onClick={handleSubmit} size="sm">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
