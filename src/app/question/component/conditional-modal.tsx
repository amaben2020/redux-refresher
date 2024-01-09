import Modal from "@/components/elements/modal";
import { resetQuestions, resetScore } from "@/redux/features/quiz/quizSlice";
import Image from "next/image";
import { useDispatch } from "react-redux";
import averageSVG from "./../../../assets/average.svg";
import failSVG from "./../../../assets/fail.svg";
import successSVG from "./../../../assets/success.svg";

const ConditionalModal = ({ grade, handleToggleModal, isOpen }: any) => {
  const dispatch = useDispatch();
  return grade === "pass" ? (
    <Modal handleToggleModal={handleToggleModal} isOpen={isOpen}>
      {" "}
      <div>
        PASS SVG with score
        <Image src={successSVG} height={150} width={100} alt="" />
        <button
          onClick={() => {
            dispatch(resetScore());
            dispatch(resetQuestions());
          }}
        >
          Try Again
        </button>
      </div>
    </Modal>
  ) : grade === "average" ? (
    <Modal handleToggleModal={handleToggleModal} isOpen={isOpen} alt="">
      {" "}
      <div>
        <Image height={150} width={100} src={averageSVG} alt="" />
      </div>
      Average SVG with score
    </Modal>
  ) : (
    <Modal handleToggleModal={handleToggleModal} isOpen={isOpen}>
      {" "}
      <div>
        <Image height={150} width={100} src={failSVG} alt="" />
      </div>
      Fail SVG with score and go to setting
    </Modal>
  );
};

export default ConditionalModal;
