import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Offer.css";
import {
    fetchOffer,
    hideGood,
    publishGood,
    purchaseGood,
} from "../http/goodAPI";
import { checkToken } from "../http/userAPI";
import ConfirmPurchase from "../modals/ConfirmPurchase";
import GoodDetails from "../modals/GoodDetails";
import ErrorAuth from "../modals/ErrorAuth";
import ErrorBalance from "../modals/ErrorBalance";
import ErrorRemoved from "../modals/ErrorRemoved";

const Offer = () => {
    const { goodId } = useParams();
    const [offer, setOffer] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showErrorAuthModal, setShowErrorAuthModal] = useState(false);
    const [showErrorBalanceModal, setShowErrorBalanceModal] = useState(false);
    const [showErrorRemovedModal, setShowErrorRemovedModal] = useState(false);
    const [purchaseData, setPurchaseData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchOffer(goodId);
                setOffer(data);
                if (!data.good_visibility) {
                    setShowErrorRemovedModal(true);
                }
            } catch (error) {
                console.error("Error fetching offer:", error);
            }
        };

        const fetchUser = async () => {
            try {
                const user = await checkToken();
                if (user) {
                    setCurrentUser(user);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchData();
        fetchUser();
    }, [goodId]);

    const handleHide = async () => {
        try {
            await hideGood(goodId);
            navigate("/");
        } catch (error) {
            console.error("Error hiding offer:", error);
        }
    };

    const handlePublish = async () => {
        try {
            await publishGood(goodId);
            setOffer({ ...offer, good_visibility: true });
        } catch (error) {
            console.error("Error publishing offer:", error);
        }
    };

    const handlePurchase = () => {
        if (offer && !offer.good_visibility) {
            setShowErrorRemovedModal(true);
        } else if (!currentUser) {
            setShowErrorAuthModal(true);
        } else {
            setShowConfirmModal(true);
        }
    };

    const confirmPurchase = async () => {
        try {
            const data = await purchaseGood(goodId);
            setPurchaseData(data);
            setShowConfirmModal(false);
            setShowDetailsModal(true);
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message ===
                    "Недостаточно средств для покупки."
            ) {
                setShowErrorBalanceModal(true);
                setShowConfirmModal(false);
            } else {
                console.error("Error purchasing offer:", error);
            }
        }
    };

    if (!offer) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-first">
            <header className="first-header">
                <div className="container-header">
                    <div className="game-header">
                        <div className="game-img">
                            <img
                                src={`${process.env.REACT_APP_API_URL}${offer.game_img}`}
                                alt={offer.game_name}
                            />
                        </div>
                        <div className="game-nav-info">
                            <div className="seller-card">
                                <div className="seller-avatar">
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}${offer.user_avatar}`}
                                        alt="avatar"
                                    />
                                </div>
                                <div className="seller-info">
                                    <h4>{offer.user_login}</h4>
                                    <p>Рейтинг: {offer.user_rate}/5</p>
                                </div>
                            </div>
                            <div className="description-game">
                                <h4 style={{ fontSize: 24 }}>
                                    {offer.good_name}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-block">
                    <div className="block-side">
                        <div className="block-side-sell">
                            <h3>Цена</h3>
                            <p className="block-side-text">
                                {offer.good_price}₽
                            </p>
                            <div className="sell-main-btn">
                                <button
                                    className="gamebtn-buy"
                                    onClick={handlePurchase}
                                    disabled={
                                        currentUser &&
                                        currentUser.id === offer.user_id
                                    }
                                >
                                    Купить
                                </button>
                                {currentUser &&
                                    currentUser.id === offer.user_id && (
                                        <button
                                            className="gamebtn-hide"
                                            onClick={
                                                offer.good_visibility
                                                    ? handleHide
                                                    : handlePublish
                                            }
                                        >
                                            {offer.good_visibility
                                                ? "Скрыть"
                                                : "Опубликовать"}
                                        </button>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="game-main">
                <div className="game-main-header">
                    <div className="game-main-btn">
                        <h4>Описание</h4>
                    </div>
                    <p className="main-title-text">{offer.good_description}</p>
                </div>
            </div>
            <ConfirmPurchase
                show={showConfirmModal}
                onHide={() => setShowConfirmModal(false)}
                goodName={offer.good_name}
                sellerLogin={offer.user_login}
                goodPrice={offer.good_price}
                onConfirm={confirmPurchase}
            />
            <ErrorAuth
                show={showErrorAuthModal}
                onHide={() => setShowErrorAuthModal(false)}
            />
            <ErrorBalance
                show={showErrorBalanceModal}
                onHide={() => setShowErrorBalanceModal(false)}
                message="Недостаточно средств для совершения покупки."
            />
            <ErrorRemoved
                show={showErrorRemovedModal}
                onHide={() => setShowErrorRemovedModal(false)}
                message="Этот товар скрыт и не доступен для покупки."
            />

            {purchaseData && (
                <GoodDetails
                    show={showDetailsModal}
                    onHide={() => setShowDetailsModal(false)}
                    login={purchaseData.login}
                    password={purchaseData.password}
                    email={purchaseData.email}
                    emailPassword={purchaseData.email_password}
                    goodId={purchaseData.goodId}
                    userId={currentUser?.id}
                    sellerId={offer.user_id}
                />
            )}
        </div>
    );
};

export default Offer;
