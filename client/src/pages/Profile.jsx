import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { observer } from "mobx-react-lite";
import { fetchUserInfoById, fetchUserGoodsById } from "../http/userAPI";
import { fetchReviewsBySellerId } from "../http/reviewAPI";
import EditProfile from "../modals/EditProfile";
import "../styles/Profile.css";

const Profile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [userGoods, setUserGoods] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetchUserInfoById(id);
                setUserInfo(userData);

                const goodsData = await fetchUserGoodsById(id);
                setUserGoods(goodsData);

                const reviewsData = await fetchReviewsBySellerId(id);
                setReviews(reviewsData);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        if (id) {
            fetchData();

            const token = localStorage.getItem("token");
            if (token) {
                const decodedToken = jwtDecode(token);
                setIsCurrentUser(decodedToken.id === parseInt(id, 10));
            }
        }
    }, [id]);

    const handleRowClick = (goodId) => {
        navigate(`/offer/${goodId}`);
    };

    return (
        <div className="profile-container">
            <EditProfile
                show={modalShow}
                onHide={() => setModalShow(false)}
                userId={id}
                currentDescription={userInfo.description}
                currentAvatar={userInfo.avatar}
            />
            <div className="profile-header">
                <div className="profile-img">
                    {userInfo.avatar && (
                        <img
                            src={`${process.env.REACT_APP_API_URL}${userInfo.avatar}`}
                            alt="User avatar"
                        />
                    )}
                    <div className="profile-nav-info">
                        <h3 className="user-name">{userInfo.login}</h3>
                        <div className="profile-inf">
                            <h6>О продавце:</h6>
                            <p id="pod" className="pod">
                                {userInfo.description === null
                                    ? "Пользователь решил не указывать какую-либо информацию о себе."
                                    : userInfo.description}
                            </p>
                            <div className="edit-profile-btns">
                                {isCurrentUser && userInfo.role !== 4 && (
                                    <button
                                        className="edit-profile"
                                        onClick={() => setModalShow(true)}
                                    >
                                        ✎
                                    </button>
                                )}
                                {userInfo.role === 2 && (
                                    <button className="edit-profile-adm">
                                        Администратор
                                    </button>
                                )}
                                {userInfo.role === 1 && (
                                    <button className="edit-profile-pols">
                                        Пользователь
                                    </button>
                                )}
                                {userInfo.role === 3 && (
                                    <button className="edit-profile-support">
                                        Тех. поддержка
                                    </button>
                                )}
                                {userInfo.role === 4 && (
                                    <button className="edit-profile-blocked">
                                        Заблокирован
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-profile">
                <div className="profile-side">
                    <div className="testimonial-item">
                        {reviews.map((review) => (
                            <div key={review.id}>
                                <div className="shadow-effect">
                                    <p>{review.comment}</p>
                                    <p>
                                        <strong>
                                            Сумма заказа: {review.good_price} ₽
                                        </strong>
                                    </p>
                                    <div className="reviews_rating-area reviews_rating-area-1">
                                        {[5, 4, 3, 2, 1].map((value) => (
                                            <React.Fragment key={value}>
                                                <input
                                                    type="radio"
                                                    id={`star-${value}-${review.id}`}
                                                    name={`rating-${review.id}`}
                                                    value={value}
                                                    checked={
                                                        review.rate === value
                                                    }
                                                    onChange={() => {}}
                                                />
                                                <label
                                                    htmlFor={`star-${value}-${review.id}`}
                                                    title={`Оценка «${value}»`}
                                                ></label>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                                <div className="testimonial-name">
                                    <a href={`/user/${review.user_id}`}>
                                        {review.login}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="osnova">
                    <div className="osnova-text">
                        <h5>Товары продавца</h5>
                    </div>
                    <table className="table-h-profile">
                        <thead className="table-t-profile">
                            <tr>
                                <th>Описание</th>
                                <th width="150px">Стоимость</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userGoods.length > 0 ? (
                                userGoods.map((good) => (
                                    <tr
                                        key={good.good_id}
                                        onClick={() =>
                                            handleRowClick(good.good_id)
                                        }
                                        style={{ cursor: "pointer" }}
                                    >
                                        <td>{good.good_name}</td>
                                        <td>{good.good_price} ₽</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2">
                                        У пользователя нет товаров.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default observer(Profile);
