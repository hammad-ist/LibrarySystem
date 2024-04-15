import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
interface Props {
  title: string;
  show: boolean | undefined;
  onConfirm(): void;
  onCancel(): void;
}
function DeleteModal({ title, show, onConfirm, onCancel }: Props) {
  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Confirm Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
