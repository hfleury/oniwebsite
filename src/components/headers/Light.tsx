import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import styled from "styled-components";
import logo from "../../images/logo_original.png";
import { useTranslation } from "../../i18n";
import LanguageDropdown from "../LanguageDropdown";

// Styled Components for customizability matching Treact style
const HeaderBase = styled.header`
  min-height: 80px;
`;

const NavLink = ({ children, href = "#" }: { children: React.ReactNode; href?: string }) => (
    <a
        href={href}
        className="text-lg lg:text-sm my-2 lg:my-0 lg:mx-6 font-semibold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent hover:border-primary-500 hover:text-primary-500 text-gray-700"
    >
        {children}
    </a>
);

const PrimaryLink = ({ children, href = "#" }: { children: React.ReactNode; href?: string }) => (
    <a
        href={href}
        className="lg:mx-0 px-8 py-3 rounded bg-primary-500 text-gray-100 font-bold shadow transition duration-300 hover:bg-primary-700 hover:text-gray-200 hover:shadow-lg transform hover:-translate-y-1 focus:shadow-outline"
    >
        {children}
    </a>
);

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  font-weight: 900;
  margin-left: 0;
  color: #243E63;
  &:hover {
    color: #17A1DA;
  }
`;

export default function Header() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = [
        <NavLink key="blog" href="#">{t("nav_blog")}</NavLink>,
        <NavLink key="features" href="#">{t("nav_features")}</NavLink>,
        <NavLink key="pricing" href="#">{t("nav_pricing")}</NavLink>,
        <NavLink key="login" href="#">{t("nav_login")}</NavLink>,
        <PrimaryLink key="signup" href="#">{t("nav_signup")}</PrimaryLink>
    ];

    return (
        <HeaderBase className="flex justify-between items-center max-w-screen-xl mx-auto px-8 relative">
            <div className="flex justify-between items-center w-full lg:w-auto py-4">
                <LogoLink href="#">
                    <img src={logo} alt="Oni Logo" className="h-16 w-auto mr-3" />
                </LogoLink>

                {/* Mobile Menu Toggle */}
                <div className="lg:hidden z-50">
                    <button onClick={toggleMenu} className="text-gray-500 focus:outline-none hover:text-primary-500 transition duration-300">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex flex-1 justify-end items-center">
                {navLinks}
                <div className="ml-6 border-l border-gray-200 pl-6">
                    <LanguageDropdown />
                </div>
            </nav>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-5%" }}
                        animate={{ opacity: 1, y: "0%" }}
                        exit={{ opacity: 0, y: "-5%" }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-0 inset-x-0 p-2 z-40 lg:hidden"
                    >
                        <div className="rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="px-5 pt-4 flex items-center justify-between">
                                <div>
                                    {/* Logo in mobile menu header if needed, but we have close button */}
                                    <span className="font-bold text-2xl">Oni</span>
                                </div>
                                {/* Close button is handled by the toggle above, but we need to ensure z-index handling or put it inside here. 
                    Actually, usually the toggle button stays visible or we put a close button inside the menu.
                    Let's use the external toggle for simplicity or put a close button inside.
                */}
                            </div>
                            <div className="px-5 pt-8 pb-6">
                                <nav className="grid gap-y-4">
                                    {navLinks}
                                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-center">
                                        <LanguageDropdown />
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </HeaderBase>
    );
}
