import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { updateUserProfile } from "../http/userAPI.js";
import jwtDecode from "jwt-decode";

const EditProfile = ({
    show,
    onHide,
    userId,
    currentDescription,
    currentAvatar,
}) => {
    const [description, setDescription] = useState(currentDescription || "");
    const [file, setFile] = useState(null);

    const selectFile = (e) => {
        setFile(e.target.files[0]);
    };

    const updateProfile = () => {
        const formData = new FormData();
        formData.append("description", description);
        if (file) {
            formData.append("avatar", file);
        }

        updateUserProfile(userId, formData).then(() => onHide());
    };

    return (
        <Modal size="lg" centered show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Редактировать профиль
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={"Введите описание"}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={updateProfile}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditProfile;
