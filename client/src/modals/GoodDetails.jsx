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
    goodId,
    sellerId,
}) => {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [canReview, setCanReview] = useState(true);
    const [reviewChecked, setReviewChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const checkReview = async () => {
        try {
            const reviewExists = await hasReview({ good_id: goodId });
            console.log(reviewExists);
            setCanReview(!reviewExists.exists);
            setReviewChecked(true);
        } catch (error) {
            console.error("Ошибка при проверке наличия отзыва:", error);
        }
    };

    useEffect(() => {
        if (show) {
            setComment("");
            setRating(0);
            setErrorMessage("");
            checkReview();
        }
    }, [show, goodId]);

    const handleRatingChange = (event) => {
        setRating(parseInt(event.target.value, 10));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (rating === 0) {
            alert("Пожалуйста, выберите оценку.");
            return;
        }

        try {
            await createReview({
                rate: rating,
                good_id: goodId,
                comment: comment,
                seller_id: sellerId,
            });

            setComment("");
            setRating(0);
            const reviewExists = await hasReview({ good_id: goodId });
            setCanReview(!reviewExists.exists);
            onHide();
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setErrorMessage("Вы уже оставили отзыв для этого товара.");
            } else {
                console.error("Ошибка при отправке отзыва:", error);
                alert("Ошибка при отправке отзыва. Попробуйте снова.");
            }
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Данные аккаунта</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ textAlign: "center", fontSize: "16px" }}>
                    <p>Ваши данные для входа:</p>
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
                    <p style={{ marginTop: "20px", fontStyle: "italic" }}>
                        Желаем приятной игры!
                    </p>
                </div>
                {show && reviewChecked && (
                    <div
                        className="reviews_reviews-container"
                        style={{ marginTop: "20px" }}
                    >
                        {canReview && (
                            <form
                                className="reviews_form-group"
                                onSubmit={handleSubmit}
                            >
                                <label>
                                    Отзыв:
                                    <textarea
                                        className="reviews_textarea"
                                        name="comment"
                                        placeholder="Оставьте свой отзыв!"
                                        value={comment}
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                    ></textarea>
                                </label>
                                <div className="reviews_rating-area">
                                    {[5, 4, 3, 2, 1].map((value) => (
                                        <React.Fragment key={value}>
                                            <input
                                                type="radio"
                                                id={`star-${value}`}
                                                name="rating"
                                                value={value}
                                                checked={rating === value}
                                                onChange={handleRatingChange}
                                            />
                                            <label
                                                htmlFor={`star-${value}`}
                                                title={`Оценка «${value}»`}
                                            ></label>
                                        </React.Fragment>
                                    ))}
                                </div>
                                <button
                                    type="submit"
                                    className="reviews_submit-button"
                                >
                                    Отправить
                                </button>
                            </form>
                        )}
                        {!canReview && (
                            <p style={{ color: "red", marginTop: "10px" }}>
                                Вы уже оставили отзыв для этого товара.
                            </p>
                        )}
                    </div>
                )}
                {errorMessage && (
                    <p style={{ color: "red", marginTop: "10px" }}>
                        {errorMessage}
                    </p>
                )}
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
