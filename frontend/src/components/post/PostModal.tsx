import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// styles
import { StyledDivBg } from '../header/NavModal';

const StyledBg = styled(StyledDivBg)`
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 20;
`;

const StyledModal = styled.div`
  position: absolute;
  top: calc(50% - 150px);
  left: calc(50% - 200px);
  background-color: rgb(255, 255, 255);
  border-radius: 12px;

  li + li {
    border-top: 1px solid rgb(219, 219, 219);
  }

  li {
    a {
      display: block;
    }

    a > span,
    button > span {
      display: block;
      box-sizing: border-box;
      padding: 4px 8px;
      width: 400px;
      line-height: 40px;
      text-align: center;
      border-radius: 12px;
      outline: none;

      &:hover {
        background: rgb(248, 249, 250);
      }
      &:active {
        background: rgb(241, 243, 245);
      }
    }
  }
`;

interface PostModalProps {
  popModal: () => void;
}

function PostModal({ popModal }: PostModalProps) {
  return (
    <StyledBg onClick={popModal}>
      <StyledModal>
        <ul>
          {/* {내 정보와 비교 => true && <li><button><span>팔로우 취소</span></button></li>} */}
          <li>
            <Link to="/post/:postid" onClick={popModal}>
              <span tabIndex={-1}>게시물로 이동</span>
            </Link>
          </li>
          <li>
            <Link to="/upload" onClick={popModal}>
              <span tabIndex={-1}>수정</span>
            </Link>
          </li>
          <li>
            <button>
              <span tabIndex={-1}>삭제</span>
            </button>
          </li>
          <li>
            <button onClick={popModal}>
              <span tabIndex={-1}>닫기</span>
            </button>
          </li>
        </ul>
      </StyledModal>
    </StyledBg>
  );
}

export default PostModal;
