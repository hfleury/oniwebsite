import { useState } from "react";
import { useHref, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useTranslation, LOCALE_PREFIXES, getLocaleFromPath } from "../i18n";
import { Button } from "./ui/Button";
import { colors, breakpoints } from "../styles/tokens";
import { readCookieConsent, writeCookieConsent } from "../consent";

// The banner never shows on the Privacy Policy page itself. In production,
// useLocation()'s pathname is already relative to BrowserRouter's basename
// (locale-prefix-free), so stripping a prefix here is a no-op; stripping it
// still resolves correctly if a raw, locale-prefixed pathname reaches this
// check directly (e.g. under test).
function isPrivacyRoute(pathname: string): boolean {
  const prefix = LOCALE_PREFIXES[getLocaleFromPath(pathname)];
  const stripped = prefix && pathname.startsWith(prefix) ? pathname.slice(prefix.length) || "/" : pathname;
  return stripped === "/privacy";
}

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
  background: ${colors.secondary};
  color: #edf2f7;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.15);

  @media (min-width: ${breakpoints.md}) {
    flex-wrap: nowrap;
  }
`;

const Message = styled.p`
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
  flex: 1 1 320px;
`;

const PolicyLink = styled.a`
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: ${colors.primary};
  }
`;

// Below md the buttons share a line when it fits and stack when it doesn't,
// so long PT/SV labels never push the reject button off-screen.
const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  flex: 1 1 auto;

  & > button {
    flex: 1 1 auto;
  }

  @media (min-width: ${breakpoints.md}) {
    flex: 0 0 auto;
    flex-wrap: nowrap;
  }
`;

export default function CookieConsentBanner() {
  const { t } = useTranslation();
  const location = useLocation();
  // Locale-prefixed via the router basename; a plain <a> keeps the full page
  // load so PrivacyPolicy scrolls to #cookies.
  const policyHref = useHref("/privacy#cookies");
  const [dismissed, setDismissed] = useState(() => readCookieConsent() !== null);

  if (dismissed || isPrivacyRoute(location.pathname)) {
    return null;
  }

  const handleAccept = () => {
    writeCookieConsent("accepted");
    setDismissed(true);
  };

  const handleReject = () => {
    writeCookieConsent("rejected");
    setDismissed(true);
  };

  return (
    <Wrapper>
      <Message>
        {t("cookie_banner_message")}{" "}
        <PolicyLink href={policyHref}>{t("cookie_banner_link")}</PolicyLink>
      </Message>
      <Actions>
        <Button type="button" $variant="gradient" $padding="10px 24px" onClick={handleAccept}>
          {t("cookie_banner_accept")}
        </Button>
        <Button type="button" $variant="solid" $padding="10px 24px" onClick={handleReject}>
          {t("cookie_banner_reject")}
        </Button>
      </Actions>
    </Wrapper>
  );
}
