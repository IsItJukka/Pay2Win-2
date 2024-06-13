import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../styles/Modal.css";

const ErrorRegistration = ({ show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Ошибка регистрации</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div
                    style={{
                        textAlign: "center",
                        fontSize: "16px",
                        color: "white",
                    }}
                >
                    <p>
                        Неверные данные для регистрации. Проверьте введенные
                        данные и попробуйте снова.
                    </p>
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

export default ErrorRegistration;
