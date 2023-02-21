import styled, { css } from "styled-components";

import {
  background,
  border,
  boxShadow,
  color,
  compose,
  flexbox,
  layout,
  position,
  space,
  typography,
} from "styled-system";

export const StyledFlexBox = styled.div`
  box-sizing: border-box;
  cursor: ${({ cursor }) => cursor};
  display: flex;
  position: relative;
  ${compose(
  flexbox,
  position,
  space,
  layout,
  color,
  border,
  boxShadow,
  background,
  typography
)}

  .category-active{
    color: #8C9EFF;
    font-size: 16px;
    line-height: 26px;
    font-weight: 400;
    padding-left:2rem;
    padding-top: 0.5rem;
    margin-top:0.5rem;
    padding-bottom: 1rem;
    border-left: 5px solid  #8C9EFF;
  }
  .category{
    color:#7C7C7C;
    font-size: 16px;
    line-height: 26px;
    font-weight: 400;
    padding-left:2rem;
    padding-top: 0.5rem;
    margin-top:0.5rem;
    padding-bottom: 1rem;
    border-left: 5px solid  #FFFFFF;

  }
`;

export const StyledLabel = styled.label`
  box-sizing: border-box;
  position: relative;
  ${compose(
  flexbox,
  position,
  space,
  layout,
  color,
  border,
  boxShadow,
  background,
  typography
)}
`;

export const textEllipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledText = styled.div`
  cursor: ${({ cursor }) => cursor};
  ${compose(space, color, typography, position, layout)}
  ${({ ellipsis }) => (ellipsis ? textEllipsis : "")}
`;

export const StyledImage = styled.img`
  cursor: ${({ cursor }) => cursor};
  ${compose(space, position, layout, border, color)}
`;

export const StyledButton = styled.button`
  box-sizing: border-box;
  position: relative;
  ${compose(
  flexbox,
  position,
  space,
  layout,
  color,
  border,
  boxShadow,
  background,
  typography
)}
`;
