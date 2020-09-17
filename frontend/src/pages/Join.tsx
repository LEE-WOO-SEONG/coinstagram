import React from 'react';

import { Link } from 'react-router-dom';
import JoinContainer from '../containers/JoinContainer';
import JoinHeader from '../components/Join/JoinHeader';
import JoinAppDownload from '../components/Join/JoinAppDownload';
import JoinAskLogin from '../components/common_login,join/JoinAskLogin';
import JoinPolicy from '../components/Join/JoinPolicy';
import { StyledDiv, StyledJoinWrapper } from '../components/Join/JoinStyle';
import useAuth from '../hooks/useAuth';

function Join() {
  // useAuth();

  return (
    <StyledDiv>
      <StyledJoinWrapper>
        <JoinHeader />
        <JoinContainer />
        {/* <JoinLoginButton content="가입" /> */}
        <JoinPolicy />
      </StyledJoinWrapper>
      <Link to={'/login'}>
        <JoinAskLogin askContent="계정이 있으신가요?" content="로그인" />
      </Link>
      <JoinAppDownload />
    </StyledDiv>
  );
}

export default React.memo(Join);
