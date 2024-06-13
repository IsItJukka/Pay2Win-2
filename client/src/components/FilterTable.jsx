import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Table.css";
import "../styles/App.css";
import { OFFER_ROUTE } from "../utils/consts";

const FilterTable = ({ goods, setSearchText, setPriceFrom, setPriceTo }) => {
    const navigate = useNavigate();

    const visibleGoods = goods.filter(
        (product) => product.visibility !== false
    );

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
                            <th style={{ width: 690 }}>Описание</th>
                            <th style={{ width: 200 }}>Продавец</th>
                            <th style={{ width: 150 }}>Цена</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleGoods.map((product, index) => (
                            <tr
                                key={index}
                                onClick={() =>
                                    navigate(
                                        `${OFFER_ROUTE}/${product.good_id}`
                                    )
                                }
                                style={{ cursor: "pointer" }}
                            >
                                <td className="left-aligned-text">
                                    {product.good_name}
                                </td>
                                <td>
                                    <div className="seller-info">
                                        <div className="seller-avatar">
                                            <img
                                                src={
                                                    process.env
                                                        .REACT_APP_API_URL +
                                                        product.user_avatar ||
                                                    "https://via.placeholder.com/45"
                                                }
                                                alt="avatar"
                                            />
                                        </div>
                                        <div>
                                            <div>{product.user_login}</div>
                                            <div className="seller-rating">
                                                {product.user_rate}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{product.good_price} ₽</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FilterTable;
