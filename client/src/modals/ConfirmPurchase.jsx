import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmPurchase = ({
    show,
    onHide,
    goodName,
    sellerLogin,
    goodPrice,
    onConfirm,
}) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Подтверждение покупки</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ textAlign: "center", fontSize: "16px" }}>
                    <p>
                        Вы уверены что хотите приобрести{" "}
                        <strong>{goodName}</strong> у{" "}
                        <strong>{sellerLogin}</strong> за{" "}
                        <strong>{goodPrice}₽</strong>?
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Нет
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                    Да
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmPurchase;
