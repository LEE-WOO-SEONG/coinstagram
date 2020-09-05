import React from 'react';
import Header from '../containers/Header';
import StyledMain from '../styles/StyledMain';
import styled from 'styled-components';
import useWindowWidth from '../hooks/useWindowWidth';
import { WidthProps } from '../styles/StyledMain';

// containers
import UploadContainer from '../containers/UploadContainer';

const UploadMain = styled(StyledMain)`
  max-width: 600px;
  padding: ${(props: WidthProps) =>
    props.width !== undefined && props.width < 655 && '55px 0 0'};
`;
const StyledSection = styled.section`
  border: 1px solid rgb(219, 219, 219);
`;

function Upload() {
  const width = useWindowWidth();

  return (
    <>
      <Header />
      <UploadMain width={width}>
        <StyledSection>
          <h3 className="a11y-hidden">게시물 업로드</h3>
          <UploadContainer />
        </StyledSection>
      </UploadMain>
    </>
  );
}

export default Upload;
