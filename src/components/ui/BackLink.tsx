import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors, breakpoints } from "../../styles/tokens";

export const BackLink = styled(Link)`
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
