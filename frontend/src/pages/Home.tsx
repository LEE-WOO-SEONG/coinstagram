import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

// styles
import StyledMain from '../components/common/StyledMain';
import useWindowWidth from '../hooks/useWindowWidth';

// components
import Header from '../components/header/Header';
import HomeMain from '../components/HomeMain';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  display: flex;
  top: 100px;
  left: 10px;

  button {
    border: 1px solid black;
    border-radius: 6px;
    padding: 5px;
    margin-top: 5px;
  }
`;

function Home() {
  const width = useWindowWidth();

  return (
    <>
      <Header />
      <StyledMain width={width}>
        <HomeMain />
      </StyledMain>
      <StyledDiv>
        <button onClick={signupEmail}>회원가입</button>
        <button onClick={login}>로그인</button>
        <button onClick={upload}>업로드</button>
        <button onClick={count}>좋아요, 댓글 count</button>
      </StyledDiv>
    </>
  );
}

export default React.memo(Home);

const token = localStorage.getItem('access_token');

async function count() {
  const res = await axios.get('/post/count/11', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(res.data);
}

async function upload() {
  const res = await axios.post(
    '/post',
    {
      post_context:
        '게시물 길게 써보기 ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁdddddddddddddddddddddddddddddddddddddㅁㄴ아리ㅓㄴ이런얄ㄷㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㅈㅂ[갲ㅂㄷㄱ[ㅂㅈㄷㄱㅈㄷㄱㅈㄱㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ.',
      post_anotheruser: '태그 유저어어',
      post_location: '건대입구',
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log(res.data);
}

async function login() {
  const res = await axios.post('/login', {
    user_id: '3',
    user_password: '3',
  });

  const { token } = res.data;
  localStorage.setItem('access_token', token);
}

async function signupEmail() {
  await axios.post('/signin/email', {
    user_id: `user${createRandom()}`,
    user_password: `asdf`,
    user_name: `${createRandom()}의 name`,
    user_email: `${createRandom()}의 email`,
  });
}

function createRandom() {
  return Math.floor(Math.random() * 10);
}
