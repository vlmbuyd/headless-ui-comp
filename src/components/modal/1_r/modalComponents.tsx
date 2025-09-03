import { ReactNode } from "react";
import Modal from "./modal";
import { useSetModals } from "./modalContext";

export const AlertModal = ({ id, text }: { id: string; text: string }) => {
  const { closeModal } = useSetModals();
  const closeThis = () => closeModal(id);

  return (
    <Modal id={id}>
      <Modal.Content>
        <p>{text}</p>
      </Modal.Content>
      <Modal.Footer>
        <button onClick={closeThis}>확인</button>
      </Modal.Footer>
    </Modal>
  );
};

export const ConfirmModal = ({
  id,
  children,
  onConfirm,
  onCancel,
  hide,
}: {
  id: string;
  children: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  hide: () => void;
}) => {
  return (
    <Modal id={id} hideOnClickOutside>
      <Modal.Header title="주의!" hide={hide} />
      <Modal.Content>{children}</Modal.Content>
      <Modal.Footer>
        <button onClick={onConfirm}>확인</button>
        <button onClick={onCancel}>취소</button>
      </Modal.Footer>
    </Modal>
  );
};
