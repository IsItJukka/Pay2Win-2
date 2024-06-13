import React, { useEffect, useState } from "react";
import "../styles/Table.css";
import "../styles/App.css";
import { fetchUserPurchases } from "../http/userAPI";
import { getPurchaseData } from "../http/goodAPI";
import { hasReview } from "../http/reviewAPI";
import GoodDetails from "../modals/GoodDetails";

const PurchaseTable = () => {
    const [purchases, setPurchases] = useState([]);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [hasUserReview, setHasUserReview] = useState(false); // Добавляем состояние, чтобы отслеживать наличие отзыва у пользователя

    useEffect(() => {
        const getPurchases = async () => {
            try {
                const data = await fetchUserPurchases();
                setPurchases(data);
            } catch (err) {
                setError(err.message);
            }
        };
        getPurchases();
    }, []);

    useEffect(() => {
        const checkIfReviewExists = async () => {
            if (selectedProduct) {
                try {
                    const reviewExists = await hasReview({
                        good_id: selectedProduct.good_id,
                    });
                    setHasUserReview(reviewExists.exists); // Обновляем состояние, указывающее на наличие отзыва у пользователя
                } catch (error) {
                    console.error("Ошибка при проверке наличия отзыва:", error);
                }
            }
        };

        checkIfReviewExists();
    }, [selectedProduct]);

    const handleGetData = async (good_id, product) => {
        try {
            const details = await getPurchaseData(good_id);
            const productWithDetails = { ...product, ...details };
            setSelectedProduct(productWithDetails);
            setShowDetailsModal(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const filteredPurchases = purchases.filter((purchase) => {
        const matchesDescription = purchase.name
            .toLowerCase()
            .includes(searchText.toLowerCase());
        const matchesPrice =
            (priceFrom === "" || purchase.price >= parseFloat(priceFrom)) &&
            (priceTo === "" || purchase.price <= parseFloat(priceTo));
        return matchesDescription && matchesPrice;
    });

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="table-interactions">
            <div className="table-interactions-two">
                <div>
                    <input
                        id="search"
                        onChange={(e) => setSearchText(e.target.value)}
                        type="text"
                        placeholder="Поиск по описанию..."
                        className="basic-input"
                    />
                </div>
                <div className="price">
                    <div>
                        <input
                            id="price_from"
                            onChange={(e) => setPriceFrom(e.target.value)}
                            type="number"
                            placeholder="Цена от"
                            className="basic-input"
                        />
                    </div>
                    <div>
                        <input
                            id="price_to"
                            onChange={(e) => setPriceTo(e.target.value)}
                            type="number"
                            placeholder="Цена до"
                            className="basic-input"
                        />
                    </div>
                </div>
            </div>

            <div className="table-table">
                <table className="table-table-header">
                    <thead>
                        <tr>
                            <th style={{ width: 60 }}>ID</th>
                            <th style={{ width: 690 }}>Описание</th>
                            <th style={{ width: 180 }}>Действия</th>
                            <th style={{ width: 150 }}>Цена</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPurchases.map((product, index) => (
                            <tr key={index}>
                                <td>{product.good_id}</td>
                                <td className="left-aligned-text">
                                    {product.name}
                                </td>
                                <td className="actions-cell">
                                    <button
                                        onClick={() =>
                                            handleGetData(
                                                product.good_id,
                                                product
                                            )
                                        }
                                        className="submit-btn"
                                    >
                                        Получить данные
                                    </button>
                                </td>
                                <td>{product.price} ₽</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedProduct && (
                <GoodDetails
                    show={showDetailsModal}
                    onHide={() => setShowDetailsModal(false)}
                    login={selectedProduct.good_login}
                    password={selectedProduct.good_password}
                    email={selectedProduct.good_email}
                    emailPassword={selectedProduct.good_email_password}
                    goodId={selectedProduct.good_id}
                    sellerId={selectedProduct.seller}
                    hasUserReview={hasUserReview} // Передаем состояние, указывающее на наличие отзыва у пользователя
                />
            )}
        </div>
    );
};

export default PurchaseTable;
