import { ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.css";
const Modal = ({
  isOpen,
  handleToggleModal,
  children,
}: {
  isOpen: boolean;
  children: ReactNode;
  handleToggleModal: () => void;
}) => {
  console.log(isOpen);
  if (!isOpen) {
    return null;
  }
  return createPortal(
    <div className={styles.modal}>
      <div className={styles.container}>
        <button onClick={handleToggleModal} className={styles.close}>
          Close
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("portal"),
  );
};

export default Modal;
