import React, { useState, useRef, useContext, useEffect } from "react";
import { useClickOutside } from "./useClickOutside.js";
import "../styles/Drop.css";
import {
    ADMIN_ROUTE,
    PROFILE_ROUTE,
    SHOP_ROUTE,
    ADD_GOOD_ROUTE,
    PURCHASE_ROUTE,
    SELLS_ROUTE,
    BALANCE_ROUTE,
} from "../utils/consts.js";
import { Context } from "../index.js";
import { fetchDropInfo } from "../http/userAPI.js";
import { useNavigate } from "react-router-dom";

function Drop() {
    const navigate = useNavigate();
    const { user } = useContext(Context);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchDropInfo();
                setUserInfo(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    // выход из аккаунта
    const logOut = () => {
        localStorage.removeItem("token");
        user.setUser({});
        user.setIsAuth(false);
    };

    const [isOpen, setOpen] = useState(false);
    const menuRef = useRef(null);
    useClickOutside(menuRef, () => {
        if (isOpen) setOpen(false);
    });

    return (
        <div className="social-icon">
            <button className="menu-button" onClick={() => setOpen(!isOpen)}>
                {userInfo.avatar && (
                    <img
                        src={process.env.REACT_APP_API_URL + userInfo.avatar}
                        alt="User avatar"
                    />
                )}
            </button>
            <nav className={`menu ${isOpen ? "active" : ""}`} ref={menuRef}>
                <ul className="menu__list">
                    <li className="menu__item-login">{userInfo.login}</li>

                    <li
                        className="menu__item"
                        onClick={() =>
                            navigate(`${PROFILE_ROUTE}/${userInfo.id}`)
                        }
                    >
                        Профиль
                    </li>
                    {userInfo.role !== 4 && (
                        <li
                            className="menu__item"
                            onClick={() => navigate(`${ADD_GOOD_ROUTE}`)}
                        >
                            Добавить товар
                        </li>
                    )}
                    {userInfo.role !== 4 && (
                        <li
                            className="menu__item"
                            onClick={() => navigate(`${PURCHASE_ROUTE}`)}
                        >
                            Мои покупки
                        </li>
                    )}
                    {userInfo.role !== 4 && (
                        <li
                            className="menu__item"
                            onClick={() => navigate(`${SELLS_ROUTE}`)}
                        >
                            Мои продажи
                        </li>
                    )}
                    {userInfo.role !== 4 && (
                        <li
                            className="menu__item"
                            onClick={() => navigate(`${BALANCE_ROUTE}`)}
                        >
                            Баланс - {userInfo.balance} ₽
                        </li>
                    )}
                    {(userInfo.role === 2 || userInfo.role === 3) && (
                        <li className="menu__item">
                            <a
                                style={{ display: "block", width: "100%" }}
                                href={ADMIN_ROUTE}
                            >
                                Админка
                            </a>
                        </li>
                    )}
                    <li className="menu__item">
                        <a
                            style={{ display: "block", width: "100%" }}
                            onClick={() => logOut()}
                            href={SHOP_ROUTE}
                        >
                            Выйти
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Drop;
