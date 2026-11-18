import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import styled from "styled-components";
import { useTranslation } from "../../i18n";
import { services } from "../../data/services";
import { colors } from "../../styles/tokens";

const Container = styled.div`
  position: relative;
`;

const Trigger = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: inherit;
`;

const Panel = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 12px;
  min-width: 240px;
  max-width: calc(100vw - 32px);
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 8px 0;
  z-index: 50;
`;

const PanelLink = styled(Link)`
  display: block;
  padding: 8px 16px;
  font-size: 0.875rem;
  color: #2d3748;
  text-decoration: none;
  overflow-wrap: break-word;

  &:hover,
  &:focus-visible {
    background-color: #f7fafc;
    color: ${colors.primary};
  }
`;

const ListLink = styled(Link)`
  display: block;
  padding: 4px 0 4px 16px;
  color: #4a5568;
  text-decoration: none;
  overflow-wrap: break-word;

  &:hover {
    color: ${colors.primary};
  }
`;

interface ServicesMenuProps {
  // "dropdown" for the desktop header, "list" for the mobile panel.
  variant: "dropdown" | "list";
  className?: string;
  onNavigate?: () => void;
}

// The header's Services entry: a link to every service page, so each page of
// the site links to the six pages meant to rank.
export default function ServicesMenu({ variant, className, onNavigate }: ServicesMenuProps) {
  const { t } = useTranslation();

  if (variant === "list") {
    return (
      <div>
        <span className={className}>{t("nav_services")}</span>
        {services.map((service) => (
          <ListLink key={service.id} to={`/services/${service.id}`} onClick={onNavigate}>
            {t(service.titleKey)}
          </ListLink>
        ))}
      </div>
    );
  }

  return <ServicesDropdown className={className} onNavigate={onNavigate} />;
}

function ServicesDropdown({ className, onNavigate }: Omit<ServicesMenuProps, "variant">) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleNavigate = () => {
    setIsOpen(false);
    onNavigate?.();
  };

  return (
    <Container ref={containerRef}>
      <Trigger
        type="button"
        className={className}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen(!isOpen)}
      >
        {t("nav_services")}
        <ChevronDown size={16} style={{ marginLeft: "4px", opacity: 0.6 }} />
      </Trigger>
      <Panel id={panelId} hidden={!isOpen}>
        {services.map((service) => (
          <PanelLink key={service.id} to={`/services/${service.id}`} onClick={handleNavigate}>
            {t(service.titleKey)}
          </PanelLink>
        ))}
      </Panel>
    </Container>
  );
}
