import React from "react";
import { Modal, Button } from "react-bootstrap";

const ErrorCheckbox = ({ show, onHide }) => {
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
                    <p>
                        Для регистрации необходимо согласиться с лицензионным
                        соглашением и правилами сайта.
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

export default ErrorCheckbox;
