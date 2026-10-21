import styled from "styled-components";
import { useTranslation } from "../i18n";
import { colors, breakpoints } from "../styles/tokens";
import { Button } from "./ui/Button";
import { buildGrowthMailto } from "../data/contact";
import { trackCtaClick } from "../analytics";

const Block = styled.section`
  margin-top: 32px;
  padding: 24px;
  border-radius: 16px;
  background-color: rgba(23, 161, 218, 0.05);
  overflow-wrap: break-word;

  @media (min-width: ${breakpoints.md}) {
    margin-top: 48px;
    padding: 40px;
  }
`;

const Title = styled.h3`
  font-weight: 700;
  font-size: 1.25rem;
  color: ${colors.headingDark};

  @media (min-width: ${breakpoints.md}) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  margin-top: 12px;
  line-height: 1.6;
  color: ${colors.bodyMuted};
  max-width: 640px;
`;

// An <a> defaults to display: inline, which would ignore Button's padding box.
const CtaLink = styled(Button)`
  display: block;
  margin-top: 24px;
  text-align: center;
  text-decoration: none;

  @media (min-width: ${breakpoints.sm}) {
    display: inline-block;
  }
`;

export default function GrowthCta({ serviceId }: { serviceId: string }) {
  const { t } = useTranslation();
  return (
    <Block>
      <Title>{t("cta_growth_title")}</Title>
      <Description>{t("cta_growth_description")}</Description>
      <CtaLink
        as="a"
        href={buildGrowthMailto({ subject: t("cta_growth_title") })}
        onClick={() => trackCtaClick("growth_mailto", { service_id: serviceId })}
      >
        {t("cta_growth_button")}
      </CtaLink>
    </Block>
  );
}
