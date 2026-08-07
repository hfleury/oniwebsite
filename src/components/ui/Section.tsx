import styled from "styled-components";
import { breakpoints } from "../../styles/tokens";

export const Container = styled.div<{
  $padding?: string;
  $paddingLg?: string;
  $background?: string;
  $color?: string;
}>`
  position: relative;
  padding: ${props => props.$padding ?? '80px 32px'};
  background-color: ${props => props.$background ?? 'transparent'};
  ${props => props.$color && `color: ${props.$color};`}

  @media (min-width: ${breakpoints.lg}) {
    padding: ${props => props.$paddingLg ?? '100px 48px'};
  }
`;

export const SplitContent = styled.div<{ $reverse?: boolean }>`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${breakpoints.lg}) {
    flex-direction: ${props => props.$reverse ? 'row-reverse' : 'row'};
    justify-content: space-between;
  }
`;
