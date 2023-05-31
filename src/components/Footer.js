import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer = () => {
    return (
        <div className={styles.Footer}>
            Keebtown poster by
            <a href='https://mykeyboard.eu/catalogue/keeb-town-poster_5222/' target='_blank' rel="noreferrer">
                {' '}mykeyboard.eu
            </a>
        </div>
    );
};

export default Footer;
