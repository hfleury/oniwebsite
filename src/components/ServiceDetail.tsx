import styled from "styled-components";
import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "../i18n";
import { colors, breakpoints } from "../styles/tokens";
import { Container as BaseContainer } from "./ui/Section";
import { Subheading, Heading } from "./ui/SectionHeading";
import { services } from "../data/services";

const Container = styled(BaseContainer).attrs({})``;

const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const IconContainer = styled.span`
  display: inline-flex;
  margin-bottom: 24px;
  background-color: rgba(6, 51, 7, 0.1);
  color: ${colors.brandGreen};
  padding: 16px;
  border-radius: 9999px;
`;

const Text = styled.p`
  line-height: 1.6;
  color: ${colors.bodyMuted};
  margin-top: 16px;
`;

const TechHeading = styled.h3`
  font-weight: 700;
  font-size: 1.25rem;
  color: ${colors.headingDark};
  margin-top: 32px;
`;

const TechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
  padding: 0;
  list-style: none;
`;

const TechItem = styled.li`
  padding: 8px 16px;
  border-radius: 9999px;
  background-color: rgba(23, 161, 218, 0.1);
  color: ${colors.primary};
  font-weight: 600;
  font-size: 0.875rem;
`;

const BackLink = styled(Link)`
  color: ${colors.primary};
  font-weight: 600;
  margin-top: 32px;
  display: inline-block;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @media (min-width: ${breakpoints.md}) {
    margin-top: 48px;
  }
`;

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container>
      <Content>
        <IconContainer>{service.icon}</IconContainer>
        <Subheading>{t("services_section_subheading")}</Subheading>
        <Heading>{t(service.titleKey)}</Heading>
        <Text>{t(service.descriptionKey)}</Text>
        <TechHeading>Technologies</TechHeading>
        <TechList>
          {service.technologies.map((tech) => (
            <TechItem key={tech}>{tech}</TechItem>
          ))}
        </TechList>
        <BackLink to="/">Back to home</BackLink>
      </Content>
    </Container>
  );
}
