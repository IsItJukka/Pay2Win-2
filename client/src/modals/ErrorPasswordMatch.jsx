import React from "react";
import { Modal, Button } from "react-bootstrap";

const ErrorPasswordMatch = ({ show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Ошибка</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div
                    style={{
                        textAlign: "center",
                        fontSize: "16px",
                        color: "white",
                    }}
                >
                    <p>Пароли не совпадают. Попробуйте еще раз.</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ErrorPasswordMatch;
