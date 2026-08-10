import styled from "styled-components";
import { colors, breakpoints } from "../../styles/tokens";

export const Subheading = styled.p<{ $textAlign?: string }>`
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: ${colors.primary};
  font-size: 0.875rem;
  margin-bottom: 16px;
  ${props => props.$textAlign && `text-align: ${props.$textAlign};`}
`;

export const Heading = styled.h2<{
  $lineHeight?: string;
  $marginBottom?: string;
  $textAlign?: string;
}>`
  font-weight: 900;
  font-size: 2rem;
  color: ${colors.headingDark};
  ${props => props.$lineHeight && `line-height: ${props.$lineHeight};`}
  ${props => props.$marginBottom && `margin-bottom: ${props.$marginBottom};`}
  ${props => props.$textAlign && `text-align: ${props.$textAlign};`}

  @media (min-width: ${breakpoints.md}) {
    font-size: 3rem;
  }

  span {
    color: ${colors.primary};
  }
`;
