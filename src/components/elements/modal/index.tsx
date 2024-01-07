import { ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.css";
const Modal = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: ReactNode;
}) => {
  if (!isOpen) {
    return null;
  }
  return createPortal(
    <div className={styles.modal}>
      <div className={styles.container}>{children}</div>
    </div>,
    document.getElementById("portal"),
  );
};

export default Modal;
