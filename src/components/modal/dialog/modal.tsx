import { ReactNode, RefObject, SyntheticEvent, useCallback } from "react";
import cx from "../cx";

const Modal = ({
  modalRef,
  hideOnClickOutside = false,
  children,
  hide,
  className,
}: {
  modalRef: RefObject<HTMLDialogElement>;
  hideOnClickOutside?: boolean;
  children: ReactNode;
  hide: () => void;
  className?: string;
}) => {
  const handleClick = useCallback(
    (e: SyntheticEvent) => {
      if (hideOnClickOutside && modalRef.current === e.target) {
        hide();
      }
    },
    [hideOnClickOutside]
  );

  return (
    <dialog
      className={cx("Dialog", className)}
      ref={modalRef}
      onClick={handleClick}
    >
      {children}
    </dialog>
  );
};

const ModalHeader = ({
  title,
  children,
  hide,
}: {
  title?: string;
  children?: ReactNode;
  hide?: () => void;
}) => {
  return (
    <div className={cx("ModalHeader")}>
      <div className={cx("title")}>{title}</div>
      {children}
      <button className={cx("close")} onClick={hide} />
    </div>
  );
};

const ModalContent = ({ children }: { children: ReactNode }) => {
  return <div className={cx("ModalContent")}>{children}</div>;
};

const ModalFooter = ({ children }: { children: ReactNode }) => {
  return <div className={cx("ModalFooter")}>{children}</div>;
};

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default Modal;
