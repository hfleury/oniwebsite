import styled from "styled-components";
import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "../i18n";
import { colors } from "../styles/tokens";
import { Container as BaseContainer } from "./ui/Section";
import { Subheading, Heading } from "./ui/SectionHeading";
import { BackLink } from "./ui/BackLink";
import { caseStudies } from "../data/caseStudies";
import { services } from "../data/services";
import GrowthCta from "./GrowthCta";

const Container = styled(BaseContainer).attrs({})``;

const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const SectionTitle = styled.h3`
  font-weight: 700;
  font-size: 1.25rem;
  color: ${colors.headingDark};
  margin-top: 32px;
  overflow-wrap: break-word;
`;

const Text = styled.p`
  line-height: 1.6;
  color: ${colors.bodyMuted};
  margin-top: 12px;
  max-width: 720px;
`;

const ServiceLink = styled(Link)`
  display: inline-block;
  margin-top: 12px;
  color: ${colors.primary};
  font-weight: 600;
  text-decoration: none;
  overflow-wrap: break-word;
  max-width: 100%;

  &:hover {
    text-decoration: underline;
  }
`;

export default function CaseStudyDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const caseStudy = caseStudies.find((cs) => cs.id === id);

  if (!caseStudy) {
    return <Navigate to="/" replace />;
  }

  const service = services.find((s) => s.id === caseStudy.serviceId);
  const sections = [
    { labelKey: "case_studies_label_context", textKey: caseStudy.contextKey },
    { labelKey: "case_studies_label_problem", textKey: caseStudy.problemKey },
    { labelKey: "case_studies_label_approach", textKey: caseStudy.approachKey },
    { labelKey: "case_studies_label_result", textKey: caseStudy.resultKey },
  ];

  return (
    <Container>
      <Content>
        <Subheading>{t("case_studies_subheading")}</Subheading>
        <Heading>{t(caseStudy.titleKey)}</Heading>
        {sections.map(({ labelKey, textKey }) => (
          <section key={labelKey}>
            <SectionTitle>{t(labelKey)}</SectionTitle>
            <Text>{t(textKey)}</Text>
          </section>
        ))}
        {service && (
          <section>
            <SectionTitle>{t("case_studies_label_related_service")}</SectionTitle>
            <ServiceLink to={`/services/${service.id}`}>{t(service.titleKey)}</ServiceLink>
          </section>
        )}
        <GrowthCta serviceId={caseStudy.serviceId} />
        <BackLink to="/">{t("services_back_to_home")}</BackLink>
      </Content>
    </Container>
  );
}
