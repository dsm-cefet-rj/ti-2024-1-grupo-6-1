import React from 'react';
import styles from './Footer.module.css'
import { FaInstagram } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'

function Footer() {
    return (
        <footer className={styles.footer}>
            <span className={styles.footer__texto}>
                <a href="/" className={styles.redesFooter}>
                    <FaGithub />
                </a>

                <a href="/" title="Me acompanhe no instagram" className={styles.redesFooter}>
                   <FaInstagram/>
                </a>

                <a href="/" className={styles.redesFooter}>
                   <FaLinkedin />
                </a>
            </span>
        </footer>
    );
}

export default Footer;