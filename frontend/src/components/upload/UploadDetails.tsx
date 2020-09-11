import React, { useRef } from 'react';
import { StyledText, StyledDiv, StyledButton } from './UploadDetails.style';

interface UploadDetailsProps {
  change: (event: React.ChangeEvent<HTMLButtonElement>) => void;
}
interface StyledTextProps {}

const UploadDetails: React.FC<UploadDetailsProps> = ({ change }) => {
  return (
    <>
      <div>
        <StyledText
          id="context"
          placeholder="문구를 입력 해 주세요."
          onChange={change}
        />
        <StyledDiv>
          <label htmlFor="people">사람 태그하기</label>
          <input id="people" type="text" onChange={change} />
        </StyledDiv>
        <StyledDiv>
          <label htmlFor="location">위치 추가</label>
          <input id="location" type="text" onChange={change} />
        </StyledDiv>
      </div>
    </>
  );
};

export default UploadDetails;
