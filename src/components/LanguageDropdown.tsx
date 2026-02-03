import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "../i18n";

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: 1px solid #e2e8f0;
  border-radius: 9999px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s;
  color: inherit;
  font-weight: 500;
  font-size: 0.875rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    border-color: #cbd5e0;
  }
`;

const Dropdown = styled.div<{ $isOpen: boolean; $direction: "up" | "down" }>`
  position: absolute;
  ${props => props.$direction === "up" ? `
    bottom: 100%;
    margin-bottom: 8px;
    transform-origin: bottom;
  ` : `
    top: 100%;
    margin-top: 8px;
    transform-origin: top;
  `}
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  min-width: 160px;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? "visible" : "hidden"};
  transform: ${props => props.$isOpen
    ? "translateY(0)"
    : props.$direction === "up" ? "translateY(10px)" : "translateY(-10px)"};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 50;
  overflow: hidden;
  border: 1px solid #e2e8f0;
`;

const Option = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 0.875rem;
  color: #2d3748;
  transition: all 0.2s;

  &:hover {
    background-color: #f7fafc;
    color: #2b6cb0;
  }
`;

const FlagIcon = styled.span`
  margin-right: 8px;
  font-size: 1.2rem;
  line-height: 1;
`;

const languages = [
  { code: "en", label: "English", flag: "🇺🇸", path: "/" },
  { code: "pt", label: "Português", flag: "🇧🇷", path: "/pt" },
  { code: "sv", label: "Svenska", flag: "🇸🇪", path: "/sv" },
];

interface LanguageDropdownProps {
  className?: string;
  direction?: "up" | "down";
}

export default function LanguageDropdown({ className, direction = "down" }: LanguageDropdownProps) {
  const { lang } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  const toggle = () => setIsOpen(!isOpen);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (path: string) => {
    setIsOpen(false);
    // Full page reload/redirect to switch language context
    window.location.href = path;
  };

  return (
    <Container ref={containerRef} className={className}>
      <Button onClick={toggle} type="button">
        <FlagIcon>{currentLang.flag}</FlagIcon>
        <span>{currentLang.label}</span>
        <ChevronDown size={16} style={{ marginLeft: "8px", opacity: 0.5 }} />
      </Button>
      <Dropdown $isOpen={isOpen} $direction={direction}>
        {languages.map((l) => (
          <Option
            key={l.code}
            onClick={() => handleLanguageChange(l.path)}
            style={{ fontWeight: l.code === lang ? 600 : 400 }}
          >
            <FlagIcon>{l.flag}</FlagIcon>
            {l.label}
          </Option>
        ))}
      </Dropdown>
    </Container>
  );
}
