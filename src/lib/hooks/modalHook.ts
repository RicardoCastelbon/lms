import React, { useState, useEffect, useRef } from "react";

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

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
  }, [modalRef, showModal]);

  const toogleModal = () => {
    setShowModal((prev) => !prev);
  };

  return {
    showModal,
    toogleModal,
    modalRef,
  };
};
