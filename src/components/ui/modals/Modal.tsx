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

/* 
- The hook is setup-ish. It returns a state, a ref and a clickhandler (toggleModal).
- Start off with going into Modal.tsx, and import the hook, destructuring it like:
const {showModal, modalRef} = useHook()
- change the current state of showModal to use the showModal from the hook (they have the same name, comment out the state in the Modal component so you don't geterrors.). Then apply the clickhandler from the hook on line 70. (the click event for the X icon)
- comment out the ref declaration in Modal.tsx and apply the modalRef from the hook to the ref on line 62. (the div for the popup)
-Comment out the useEffect controlling the ref on lines 24-42.
SET UP THE PAGE TO USE THE HOOK:
go to your intended page from where you want to toggle the modal and repeat the steps above.
comment out the boolean state for controlling the modal and replace it with the boolean from the hook.
comment out the useEffect listening on modalRef and showModal.
apply the toggleModal to the clickhandler calling the modal popup.
I'm not sure this works */

const Modal = ({ showModal, setShowModal, header, children }: Props) => {
  //const { showModal, modalRef } = useHook();
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
function useHook(): { showModal: any; modalRef: any } {
  throw new Error("Function not implemented.");
}
