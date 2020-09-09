import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  height: 64px;
  padding: 8px 16px;
`;

export const IconDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    font-size: 25px;
    &:hover {
      color: rgb(73, 80, 87);
    }

    span {
      outline: none;
    }

    &#like {
      ${props =>
        props.like === true &&
        css`
          color: rgb(250, 82, 82);
          &:hover {
            color: rgb(255, 107, 107);
          }
        `};
    }
  }

  a {
    display: inline-block;
    margin-left: 15px;
    font-size: 26px;
    &:hover {
      color: rgb(73, 80, 87);
    }

    span {
      outline: none;
    }
  }
`;
