import { useContext } from "react";
import { LoginContext } from "../App";
import { useRef, useEffect } from "react";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

const Form = ({ reg }) => {
  if (reg) {
    return <SignupForm />;
  }
  return <LoginForm />;
};

export const ModalForm = () => {
  const { show, setShow, reg } = useContext(LoginContext);

  const ref = useRef();

  const onClose = () => {
    setShow(false);
  };

  useEffect(() => {
    if (show) {
      ref.current.showModal();
    } else {
      ref.current.close();
    }
    const close = (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
      // Uncomment for closing modal on click outside form

      // if (!ref.current || ref.current.contains(e.target)) {
      //   return;
      // }
      // onClose();
    };
    window.addEventListener("keydown", close);
    // document.addEventListener("mousedown", close);
    // document.addEventListener("touchstart", close);
    return () => {
      window.removeEventListener("keydown", close);
      // document.removeEventListener("mousedown", close);
      // document.removeEventListener("touchstart", close);
    };
  }, [][(ref, show)]);

  return (
    <dialog ref={ref} className="ModalForm" onClose={onClose}>
      <Form reg={reg} />
    </dialog>
  );
};
