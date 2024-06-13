import React, { useContext, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Context } from "../index.js";
import { createGame } from "../http/gameAPI.js";

const CreateGame = ({ show, onHide }) => {
    const { game } = useContext(Context);
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);

    const selectFile = (e) => {
        setFile(e.target.files[0]);
    };

    const addGame = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("img", file);

        createGame(formData).then((data) => onHide());
    };

    return (
        <Modal size="lg" centered show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить игру
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={"Введите название игры"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder={"Прикрепите превью игры"}
                        type="file"
                        onChange={selectFile}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={addGame}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateGame;
