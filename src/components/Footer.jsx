import React from 'react';

const Footer = () => {
    return (
        <footer className="footer bg-light_bg dark:bg-dark_bg text-neutral-content p-10">
            <nav>
                <h6 className="footer-title text-black dark:text-white">Services</h6>
                <a className="link link-hover text-black dark:text-white">Branding</a>
                <a className="link link-hover text-black dark:text-white">Design</a>
                <a className="link link-hover text-black dark:text-white">Marketing</a>
                <a className="link link-hover text-black dark:text-white">Advertisement</a>
            </nav>
            <nav>
                <h6 className="footer-title text-black dark:text-white">Company</h6>
                <a className="link link-hover text-black dark:text-white">About us</a>
                <a className="link link-hover text-black dark:text-white">Contact</a>
                <a className="link link-hover text-black dark:text-white">Jobs</a>
                <a className="link link-hover text-black dark:text-white">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title text-black dark:text-white">Legal</h6>
                <a className="link link-hover text-black dark:text-white">Terms of use</a>
                <a className="link link-hover text-black dark:text-white">Privacy policy</a>
                <a className="link link-hover text-black dark:text-white">Cookie policy</a>
            </nav>
        </footer>
    );
};

export default Footer;