import React, { useEffect, useState } from "react";
import "../styles/Table.css";
import "../styles/App.css";
import { fetchUserSells } from "../http/userAPI";
import { getPurchaseData } from "../http/goodAPI";
import GoodDetailsSeller from "../modals/GoodDetailsSeller";

const SellsTable = () => {
    const [sells, setSells] = useState([]);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    useEffect(() => {
        const getSells = async () => {
            try {
                const data = await fetchUserSells();
                setSells(data);
            } catch (err) {
                setError(err.message);
            }
        };
        getSells();
    }, []);

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

    const filteredSells = sells.filter((sell) => {
        const matchesDescription = sell.name
            .toLowerCase()
            .includes(searchText.toLowerCase());
        const matchesPrice =
            (priceFrom === "" || sell.price >= parseFloat(priceFrom)) &&
            (priceTo === "" || sell.price <= parseFloat(priceTo));
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
                        {filteredSells.map((product, index) => (
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
                                        Проверить данные
                                    </button>
                                </td>
                                <td>{product.price} ₽</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedProduct && (
                <GoodDetailsSeller
                    show={showDetailsModal}
                    onHide={() => setShowDetailsModal(false)}
                    login={selectedProduct.good_login}
                    password={selectedProduct.good_password}
                    email={selectedProduct.good_email}
                    emailPassword={selectedProduct.good_email_password}
                />
            )}
        </div>
    );
};

export default SellsTable;
