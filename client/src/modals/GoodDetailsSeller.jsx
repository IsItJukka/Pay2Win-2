import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { createReview, hasReview } from "../http/reviewAPI";
import "../styles/Reviews.css";

const GoodDetails = ({
    show,
    onHide,
    login,
    password,
    email,
    emailPassword,
}) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Данные аккаунта</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ textAlign: "center", fontSize: "16px" }}>
                    <p>Данные для входа:</p>
                    <p>
                        <strong>Логин:</strong> {login}
                    </p>
                    <p>
                        <strong>Пароль:</strong> {password}
                    </p>
                    {email && (
                        <>
                            <p>
                                <strong>Почта:</strong> {email}
                            </p>
                            <p>
                                <strong>Пароль от почты:</strong>{" "}
                                {emailPassword}
                            </p>
                        </>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default GoodDetails;
