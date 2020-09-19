import styled, { css } from 'styled-components';

export const StyledDiv = styled.div`
  position: relative;
  min-height: 170px;
`;

export const StyledArticle = styled.article`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
    }
  }
  background-color: rgb(250, 250, 250);
  border-radius: 10px;
  animation: fadeIn 1s;
  transition: transform 0.3s;

  ${props =>
    props.width < 655
      ? css`
          margin-top: 20px;
          border: 1px solid rgb(219, 219, 219);
        `
      : css`
          box-shadow: 5px 5px 10px rgb(219, 219, 219);
          margin-top: 50px;
          &.selected {
            transform: translateY(-10px);
          }
        `}

  ${props =>
    props.width > 1000
      ? css`
          display: inline-block;
          box-sizing: border-box;
          width: 32%;
          & {
            margin-left: 2%;
          }
          &:nth-of-type(3n + 1) {
            margin-left: 0;
          }
        `
      : css`
          & {
            margin-left: 0;
          }
        `}
`;

export const StyledPreviewDiv = styled.div`
  position: relative;
  box-sizing: border-box;
  padding: 50px;
  height: 500px;
  border: 1px solid rgb(219, 219, 219);

  p {
    float: left;
    margin: 13px 40px 0 0;
    padding: 5px 40px;
    background-color: rgb(51, 154, 240);
    border-radius: 5px;
    font-size: 20px;
    font-weight: bold;
    color: rgb(250, 250, 250);
  }

  a {
    font-size: 40px;
    color: rgb(51, 154, 240);
  }
`;

export const StyledSpinnerDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;
