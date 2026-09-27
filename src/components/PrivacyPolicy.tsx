import { useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "../i18n";
import { colors } from "../styles/tokens";
import { Container as BaseContainer } from "./ui/Section";
import { Heading } from "./ui/SectionHeading";

const Container = styled(BaseContainer).attrs({})``;

const Content = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const Intro = styled.p`
  line-height: 1.6;
  color: ${colors.bodyMuted};
  margin-top: 24px;
`;

const LastUpdated = styled.p`
  color: ${colors.bodyMuted};
  font-size: 0.875rem;
  margin-top: 8px;
`;

const PolicySection = styled.section`
  margin-top: 48px;
  scroll-margin-top: 96px;
`;

const SectionTitle = styled.h2`
  font-weight: 700;
  font-size: 1.5rem;
  color: ${colors.headingDark};
`;

const SectionText = styled.p`
  line-height: 1.6;
  color: ${colors.bodyMuted};
  margin-top: 16px;
`;

// One entry per policy section: id is the stable anchor Footer links (and
// FOWO-88's cookie-consent banner) target via /privacy#<id>. Driving the
// render off this table instead of repeating JSX per section keeps every
// section's markup identical and avoids re-typing t() calls seven times.
const SECTIONS = [
  { id: "controller", headingKey: "privacy_controller_heading", bodyKey: "privacy_controller_body" },
  { id: "gdpr", headingKey: "privacy_gdpr_heading", bodyKey: "privacy_gdpr_body" },
  { id: "us-privacy", headingKey: "privacy_us_privacy_heading", bodyKey: "privacy_us_privacy_body" },
  { id: "lgpd", headingKey: "privacy_lgpd_heading", bodyKey: "privacy_lgpd_body" },
  { id: "cookies", headingKey: "privacy_cookies_heading", bodyKey: "privacy_cookies_body" },
  { id: "future-processing", headingKey: "privacy_future_heading", bodyKey: "privacy_future_body" },
  { id: "contact", headingKey: "privacy_contact_heading", bodyKey: "privacy_contact_body" },
] as const;

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  // The backend only injects __INITIAL_STATE__/meta into an otherwise-empty
  // shell, so there's no server-rendered DOM at initial paint for the
  // browser's native hash-scroll to find. Once this page's sections have
  // rendered, scroll to whichever one the URL hash names (e.g. Footer's
  // "GDPR" link, /privacy#gdpr).
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    document.getElementById(hash)?.scrollIntoView();
  }, []);

  return (
    <Container>
      <Content>
        <Heading>{t("privacy_heading")}</Heading>
        <Intro>{t("privacy_intro")}</Intro>
        <LastUpdated>{t("privacy_last_updated")}</LastUpdated>
        {SECTIONS.map((section) => (
          <PolicySection key={section.id} id={section.id}>
            <SectionTitle>{t(section.headingKey)}</SectionTitle>
            <SectionText>{t(section.bodyKey)}</SectionText>
          </PolicySection>
        ))}
      </Content>
    </Container>
  );
}
