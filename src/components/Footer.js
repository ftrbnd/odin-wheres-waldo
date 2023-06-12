import React from 'react';
import styles from '../styles/Footer.module.scss';

const Footer = () => {
    return (
        <div className={styles.Footer}>
            Photos from the
            <a href='https://a.co/d/gbFEW2Y' target='_blank' rel="noreferrer">
                {' '}Where's Spidey?{' '}
            </a>
            book
        </div>
    );
};

export default Footer;
