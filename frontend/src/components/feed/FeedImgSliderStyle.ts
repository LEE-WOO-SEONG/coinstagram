import styled from 'styled-components';

export const StyledUl = styled.ul`
  .next-btn,
  .prev-btn {
    top: calc(50% - 16px);
  }

  .slick-slide {
    height: inherit;
  }

  .slick-dots {
    position: absolute;
    bottom: 5px;

    li {
      width: 12px;
      height: 12px;
      margin: 1px;

      button {
        width: 12px;
        height: 12px;
      }

      button::before {
        width: 12px;
        height: 12px;
        color: rgb(51, 154, 240);
      }
    }
  }
`;
