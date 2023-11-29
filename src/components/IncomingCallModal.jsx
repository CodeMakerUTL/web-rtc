/* eslint-disable react/prop-types */
import { Avatar, Button, Modal } from "keep-react";
import { CloudArrowUp } from "phosphor-react";

export default function IncomingCallModal({
  show,
  handleAnswer,
  handleDeny,
  user,
}) {
  return (
    <Modal
      icon={<CloudArrowUp size={28} color="#1B4DFF" />}
      size="md"
      show={show}
      shape="circle"
    >
      <Modal.Header>{user?.user_name} Call You</Modal.Header>
      <Modal.Body>
        <div className="space-y-6 flex justify-center items-center">
          <Avatar img={user?.photo} size="lg" />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button type="outlineGray" width="half" onClick={handleAnswer}>
          Received
        </Button>
        <Button type="primary" width="half" onClick={handleDeny}>
          Deny
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
