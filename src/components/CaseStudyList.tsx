import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "../i18n";
import { colors } from "../styles/tokens";
import type { CaseStudy } from "../data/caseStudies";
import { trackCtaClick } from "../analytics";

// Same fluid grid as Services: 1 to 3 columns depending on the available
// width, with no fixed breakpoints.
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
  gap: 32px;
  max-width: 1280px;
  margin: 48px auto 0;
`;

// Column → Card → margin-top: auto keeps every card's link on the same line.
const Column = styled.div`
  display: flex;
`;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px;
  width: 100%;
`;

const Title = styled.h3`
  font-weight: 700;
  font-size: 1.25rem;
  color: ${colors.headingDark};
  margin-bottom: 8px;
  overflow-wrap: break-word;
  max-width: 100%;
`;

const Summary = styled.p`
  line-height: 1.6;
  color: ${colors.bodyMuted};
`;

const ReadMoreLink = styled(Link)`
  color: ${colors.primary};
  font-weight: 600;
  margin-top: auto;
  padding-top: 16px;
  display: inline-block;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default function CaseStudyList({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const { t } = useTranslation();

  return (
    <Grid>
      {caseStudies.map((cs) => (
        <Column key={cs.id}>
          <Card>
            <Title>{t(cs.titleKey)}</Title>
            <Summary>{t(cs.summaryKey)}</Summary>
            <ReadMoreLink
              to={`/case-studies/${cs.id}`}
              onClick={() => trackCtaClick("case_studies_read_more", { case_study_id: cs.id })}
            >
              {t("case_studies_read_more")}
            </ReadMoreLink>
          </Card>
        </Column>
      ))}
    </Grid>
  );
}
