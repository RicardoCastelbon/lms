import React, {
  Children,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import CreateCourseForm from "../forms/teacher/CreateCourseForm";
import { X } from "lucide-react";

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  header: string;
};

const Modal = ({ showModal, setShowModal, header, children }: Props) => {
  //   const [showModal, setShowModal] = useState<boolean>(false);
  const modalRef = useRef(null);
  // handling click outside modal to close.
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      //if close button in modal is pressed, dont run following if
      if (e.target.id !== "closeModal") {
        if (
          modalRef.current &&
          /* @ts-ignore */
          !modalRef.current.contains(e.target)
        ) {
          showModal && setShowModal(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [modalRef, showModal, setShowModal]);

  const modalClickHandler = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <>
      {/* Create course modal overlay */}
      <div
        className={`${
          showModal ? "fixed" : "hidden"
        } top-0 left-0 w-screen h-screen bg-black flex justify-center items-center`}
        style={{ opacity: "0.6" }}
      ></div>
      {/* popup modal */}
      <div
        className={`${
          showModal ? "fixed" : "hidden"
        } z-20 top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 w-5/6 h-5/6 max-w-[1000px] bg-white rounded-lg overflow-y-auto`}
        style={{ opacity: "1" }}
        ref={modalRef}
      >
        {/* modal header */}
        <div className="w-full justify-between flex p-4 border-b border-foreground">
          <h2 className="text-lg font-semibold text-foreground">{header}</h2>
          <X
            id="closeModal"
            className="hover:text-primary hover:cursor-pointer"
            onClick={modalClickHandler}
          />
        </div>
        <div className="w-full p-4">
          {/* <CreateCourseForm /> */}
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
