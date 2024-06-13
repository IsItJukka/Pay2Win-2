import React, { useState, useEffect, useContext } from "react";
import "../styles/App.css";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { registration, login } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import ErrorAuth from "../modals/ErrorAuth";
import ErrorRegistration from "../modals/ErrorRegistration";
import ErrorCheckbox from "../modals/ErrorCheckbox";
import ErrorPasswordMatch from "../modals/ErrorPasswordMatch.jsx";

const Auth = observer(() => {
    const { user } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [loginValue, setLoginValue] = useState("");
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [showErrorAuth, setShowErrorAuth] = useState(false);
    const [showErrorRegistration, setShowErrorRegistration] = useState(false);
    const [showErrorCheckbox, setShowErrorCheckbox] = useState(false);
    const [showErrorPasswordMatch, setShowErrorPasswordMatch] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const isLogin = location.pathname === LOGIN_ROUTE;

    const click = async (event) => {
        event.preventDefault();
        try {
            if (isLogin) {
                let data = await login(email, password);
                user.setUser(data.user);
                user.setIsAuth(true);
                localStorage.setItem("user", data.token);
                navigate(SHOP_ROUTE);
            } else {
                if (!isCheckboxChecked) {
                    setShowErrorCheckbox(true);
                    return;
                }
                if (password !== passwordConfirm) {
                    setShowErrorPasswordMatch(true);
                    return;
                }
                let data = await registration(loginValue, email, password);
                user.setUser(data.user);
                user.setIsAuth(true);
                localStorage.setItem("user", data.token);
                navigate(SHOP_ROUTE);
            }
        } catch (error) {
            console.error(error);
            if (isLogin) {
                setShowErrorAuth(true);
            } else {
                setShowErrorRegistration(true);
            }
        }
    };

    useEffect(() => {
        if (location.pathname === LOGIN_ROUTE) {
            setLoginValue("");
        }
    }, [location.pathname]);

    return (
        <div className="container">
            <form className="auth">
                <div className="auth-buttons">
                    <Link
                        className={`auth-button ${isLogin ? "active" : ""}`}
                        to={LOGIN_ROUTE}
                    >
                        Войти
                    </Link>
                    <Link
                        className={`auth-button ${!isLogin ? "active" : ""}`}
                        to={REGISTRATION_ROUTE}
                    >
                        Регистрация
                    </Link>
                </div>
                {isLogin ? (
                    <>
                        <div className="field">
                            <input
                                name="email"
                                type="email"
                                placeholder="E-Mail"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="email" className="field__label">
                                Введите ваш E-Mail
                            </label>
                        </div>
                        <div className="field">
                            <input
                                name="password"
                                type="password"
                                placeholder="Пароль"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="password" className="field__label">
                                Введите ваш пароль
                            </label>
                        </div>
                        <div className="auth-button__container">
                            <button
                                className="auth-button__submit"
                                onClick={click}
                            >
                                Войти
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="field">
                            <input
                                name="login"
                                type="login"
                                placeholder="Логин"
                                onChange={(e) => setLoginValue(e.target.value)}
                            />
                            <label htmlFor="login" className="field__label">
                                Латинские буквы и цифры
                            </label>
                        </div>
                        <div className="field">
                            <input
                                name="email"
                                type="email"
                                placeholder="E-Mail"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="email" className="field__label">
                                Требуется для активации учётной записи
                            </label>
                        </div>
                        <div className="field">
                            <input
                                name="password"
                                type="password"
                                placeholder="Пароль"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="password" className="field__label">
                                Минимум шесть символов
                            </label>
                        </div>
                        <div className="field">
                            <input
                                name="passwordConfirm"
                                type="password"
                                placeholder="Повторите пароль"
                                onChange={(e) =>
                                    setPasswordConfirm(e.target.value)
                                }
                            />
                            <label
                                htmlFor="passwordConfirm"
                                className="field__label"
                            >
                                Повторите пароль
                            </label>
                        </div>
                        <div className="field">
                            <label
                                className="field__label"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <input
                                    type="checkbox"
                                    name="agree"
                                    style={{ marginRight: "15px" }}
                                    required
                                    onChange={() =>
                                        setIsCheckboxChecked(!isCheckboxChecked)
                                    }
                                />
                                С лицензионным соглашением, включая правила
                                сайта
                                <br />
                                ознакомился, принимаю в полном объёме
                            </label>
                        </div>
                        <div className="auth-button__container">
                            <button
                                className="auth-button__submit"
                                onClick={click}
                            >
                                Зарегистрироваться
                            </button>
                        </div>
                    </>
                )}
            </form>
            <ErrorAuth
                show={showErrorAuth}
                onHide={() => setShowErrorAuth(false)}
            />
            <ErrorRegistration
                show={showErrorRegistration}
                onHide={() => setShowErrorRegistration(false)}
            />
            <ErrorCheckbox
                show={showErrorCheckbox}
                onHide={() => setShowErrorCheckbox(false)}
            />
            <ErrorPasswordMatch
                show={showErrorPasswordMatch}
                onHide={() => setShowErrorPasswordMatch(false)}
            />
        </div>
    );
});

export default Auth;
