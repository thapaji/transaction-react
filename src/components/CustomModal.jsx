import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useUser } from "../userContext";

export const CustomModal = ({ children, title }) => {
  const { show, setShow } = useUser();
  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          setShow(true);
        }}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};
