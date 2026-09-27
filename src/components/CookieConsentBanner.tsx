import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useTranslation, LOCALE_PREFIXES, getLocaleFromPath } from "../i18n";
import { Button } from "./ui/Button";
import { colors, breakpoints } from "../styles/tokens";

// Mirrors LanguageDropdown.tsx's document.cookie pattern for the "lang"
// cookie: same Path/Max-Age/SameSite/conditional-Secure shape, one year.
const COOKIE_CONSENT = "cookie_consent";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

type ConsentValue = "accepted" | "rejected";

function readCookieConsent(): ConsentValue | null {
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_CONSENT}=`))
    ?.slice(COOKIE_CONSENT.length + 1);
  return value === "accepted" || value === "rejected" ? value : null;
}

function writeCookieConsent(value: ConsentValue) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_CONSENT}=${value}; Path=/; Max-Age=${ONE_YEAR_SECONDS}; SameSite=Lax${secure}`;
}

// Exported for future analytics code to check before loading anything
// non-essential. No such script exists yet — this is groundwork only.
// eslint-disable-next-line react-refresh/only-export-components -- standalone helper, must be callable outside this component's render tree
export function hasOptionalConsent(): boolean {
  return readCookieConsent() === "accepted";
}

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

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex: 0 0 auto;
`;

export default function CookieConsentBanner() {
  const { t } = useTranslation();
  const location = useLocation();
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
        <PolicyLink href="/privacy#cookies">{t("cookie_banner_link")}</PolicyLink>
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
