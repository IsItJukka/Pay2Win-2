import React from "react";
import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-row">
                    <div className="footer-col">
                        <h4>О ПРОЕКТЕ</h4>
                        <ul>
                            <li>
                                <a href="#">Контакты</a>
                            </li>
                            <li>
                                <a href="#">Конфидециальность</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>ПРИСОЕДИНЯЙТЕСЬ</h4>
                        <div className="social-links">
                            <a href="#">
                                <img
                                    src="https://i.ibb.co/W54tk33/13840213.png"
                                    className="tele"
                                />
                            </a>
                            <a href="#">
                                <img
                                    src="https://i.ibb.co/XZR3pLb/21118281.png"
                                    className="vk"
                                />
                            </a>
                            <a href="#">
                                <img
                                    src="https://i.ibb.co/3WbdYWT/10770463.png"
                                    className="yt"
                                />
                            </a>
                            <a href="#">
                                <img
                                    src="https://i.ibb.co/xG7P78v/13840232.png"
                                    className="wts"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="legal">
                <h1 className="footer__logo">PAY2WIN</h1>
                <p className="legal-bottom"> 2024 </p>
            </div>
        </footer>
    );
};

export default Footer;
