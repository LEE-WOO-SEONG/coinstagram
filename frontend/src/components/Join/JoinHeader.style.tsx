import styled from 'styled-components';
import { StyledH1 } from '../header/Logo';

export const MainLogo = styled(StyledH1)`
  font-size: 50px;
  text-align: center;
  margin-top: 30px;
  font-weight: 600;
`;
export const Header = styled.div`
  height: 150px;
`;

export const StyledH2 = styled.h2`
  color: #828282;
  font-size: 1.2rem;
  text-align: center;
  margin: 10px 0;
`;
export const OrBorder = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0 20px;

  .leftLine,
  .rightLine {
    height: 1px;
    background: #dbdbdb;
    width: 100%;
    position: relative;
    top: 0.65em;
  }
`;
