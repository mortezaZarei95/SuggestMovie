import { Fragment, useRef, ComponentType, useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import { setPopUp } from "redux/Common/slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { IpopUpBTN } from "types/types";
import classes from "./style.module.scss";

export default function WithPopUp<T>(WrappedComponent: ComponentType<T>) {
  const Component = (props: T) => {
    const sectionRef = useRef(null);

    const dispatch = useAppDispatch();

    const { popUpState, popUpButtons, popUpText } = useAppSelector(
      (state) => state.Common
    );

    const [state, setState] = useState<boolean>(false);

    const toggleModal = () => {
      setState(!state);
      if (popUpState && state)
        dispatch(setPopUp({ state: false, text: "", buttons: [] }));
    };

    const dosomeThing = (item: IpopUpBTN) => {
      item.onClick();
      toggleModal();
    };

    useEffect(() => {
      popUpState && toggleModal();
    }, [popUpState]);

    return (
      <Fragment>
        <Modal centered isOpen={state && popUpState} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Modal</ModalHeader>
          <ModalBody>
            <span>{popUpText}</span>
          </ModalBody>
          <ModalFooter className={classes.buttons}>
            {popUpButtons.map((item, index) => (
              <Button
                key={index}
                color={item.color}
                size="md"
                onClick={() =>
                  item.isCloseBTN ? toggleModal() : dosomeThing(item)
                }
              >
                {item.value}
              </Button>
            ))}
          </ModalFooter>
        </Modal>
        {/* )} */}
        <WrappedComponent {...props} />
      </Fragment>
    );
  };
  return Component;
}
