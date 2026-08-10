import styled from "styled-components";
import { colors } from "../../styles/tokens";

export const Button = styled.button<{
  $variant?: 'solid' | 'featured' | 'gradient';
  $padding?: string;
  $uppercase?: boolean;
  $letterSpacing?: string;
  $shadow?: string;
  $hoverShadow?: string;
}>`
  border-radius: 9999px;
  font-weight: 700;
  transition: all 0.3s;
  padding: ${props => props.$padding ?? '12px 32px'};
  ${props => props.$uppercase && `text-transform: uppercase;`}
  ${props => props.$letterSpacing && `letter-spacing: ${props.$letterSpacing};`}

  ${props => {
    switch (props.$variant) {
      case 'featured':
        return `
          background-color: white;
          color: ${colors.brandGreen};
          &:hover {
            background-color: #f7fafc;
          }
        `;
      case 'gradient':
        return `
          background: linear-gradient(135deg, rgb(23, 161, 218) 0%, rgb(15, 104, 145) 100%);
          color: white;
          &:hover {
            box-shadow: 0 10px 15px -3px rgba(23, 161, 218, 0.2);
          }
        `;
      default:
        return `
          background-color: ${colors.primary};
          color: white;
          ${props.$shadow ? `box-shadow: ${props.$shadow};` : ''}
          &:hover {
            background-color: #0e81b3;
            transform: translateY(-1px);
            ${props.$hoverShadow ? `box-shadow: ${props.$hoverShadow};` : ''}
          }
        `;
    }
  }}
`;
