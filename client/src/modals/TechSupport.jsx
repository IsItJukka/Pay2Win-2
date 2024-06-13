import React, { useContext, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Context } from "../index.js";
import {
    grantTechSupport,
    revokeTechSupport,
    blockUser,
    unblockUser,
} from "../http/userAPI.js";

const TechSupport = ({ show, onHide, actionType }) => {
    const { user } = useContext(Context);
    const [userId, setUserId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleAction = async () => {
        setIsLoading(true);
        try {
            switch (actionType) {
                case "grant":
                    await grantTechSupport(userId);
                    break;
                case "revoke":
                    await revokeTechSupport(userId);
                    break;
                case "block":
                    await blockUser(userId);
                    break;
                case "unblock":
                    await unblockUser(userId);
                    break;
                default:
                    throw new Error("Invalid action type");
            }
            onHide();
        } catch (error) {
            console.error("Error performing action:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!show) {
        return null;
    }

    return (
        <Modal size="lg" centered show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {actionType === "grant" && "Выдать права техподдержки"}
                    {actionType === "revoke" && "Отозвать права техподдержки"}
                    {actionType === "block" && "Заблокировать пользователя"}
                    {actionType === "unblock" && "Разблокировать пользователя"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group controlId="userId">
                    <Form.Label>Введите ID пользователя:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="ID пользователя"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </Form.Group>
                <p>Вы уверены, что хотите выполнить данное действие?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="outline-danger"
                    onClick={onHide}
                    disabled={isLoading}
                >
                    Отмена
                </Button>
                <Button
                    variant="outline-success"
                    onClick={handleAction}
                    disabled={isLoading}
                >
                    {isLoading ? "Выполнение..." : "Подтвердить"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TechSupport;
