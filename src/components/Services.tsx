import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "../i18n";
import { colors, breakpoints } from "../styles/tokens";
import { Container as BaseContainer } from "./ui/Section";
import { Subheading, Heading } from "./ui/SectionHeading";
import { services } from "../data/services";

const Container = styled(BaseContainer).attrs({})``;

const HeaderRow = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  margin-top: 48px;
`;

const Column = styled.div`
  width: 100%;

  @media (min-width: ${breakpoints.md}) {
    width: calc(50% - 16px);
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px;
  background-color: transparent;
  width: 100%;

  @media (min-width: ${breakpoints.sm}) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const IconContainer = styled.span`
  flex-shrink: 0;
  display: inline-flex;
  margin-bottom: 16px;
  background-color: rgba(6, 51, 7, 0.1);
  color: ${colors.brandGreen};
  padding: 16px;
  border-radius: 9999px;

  @media (min-width: ${breakpoints.sm}) {
    margin-bottom: 0;
    margin-right: 16px;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h4`
  font-weight: 700;
  font-size: 1.25rem;
  color: ${colors.headingDark};
  margin-bottom: 8px;
`;

const Text = styled.p`
  line-height: 1.6;
  color: ${colors.bodyMuted};
`;

const ProofPoint = styled.p`
  margin-top: 8px;
  font-size: 0.875rem;
  color: ${colors.bodyMuted};
`;

const LearnMoreLink = styled(Link)`
  color: ${colors.primary};
  font-weight: 600;
  margin-top: 16px;
  display: inline-block;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default function Services() {
  const { t } = useTranslation();

  return (
    <Container>
      <HeaderRow>
        <Subheading>{t("services_section_subheading")}</Subheading>
        <Heading>{t("services_section_heading")}</Heading>
      </HeaderRow>
      <Grid>
        {services.map((s) => (
          <Column key={s.id}>
            <Card>
              <IconContainer>{s.icon}</IconContainer>
              <CardContent>
                <Title>{t(s.titleKey)}</Title>
                <Text>{t(s.descriptionKey)}</Text>
                {s.proofPointKey && <ProofPoint>{t(s.proofPointKey)}</ProofPoint>}
                <LearnMoreLink to={`/services/${s.id}`}>Learn more</LearnMoreLink>
              </CardContent>
            </Card>
          </Column>
        ))}
      </Grid>
    </Container>
  );
}
