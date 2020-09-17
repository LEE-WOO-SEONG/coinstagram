import React, { useCallback, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfoSaga } from '../redux/modules/userInfo';
import { deletePostSaga } from '../redux/modules/post';
import { deleteBookmarkSaga } from '../redux/modules/bookmark';
import { ModalContext } from '../App';
import RootState from '../type';

// components
import FollowUsersContainer from '../containers/FollowUsersContainer';
import RecommendUsersContainer from '../containers/RecommendUsersContainer';
import FeedContainer from '../containers/FeedContainer';
import PostModal from './common/PostModal';

const StyledDiv = styled.div`
  position: relative;

  .list-container {
    max-width: 614px;
  }

  .recommend-container {
    position: absolute;
    top: 0;
    right: 315px;
  }
`;

export interface ModalState {
  user_id: string;
  user_profile: null | string;
  targetEl: null | HTMLSpanElement;
}

function HomeMain() {
  const { users } = useSelector((state: RootState) => state.userInfo.followers);
  const { user } = useSelector((state: RootState) => state.userInfo);
  const myId = user && user.user_id;
  const dispatch = useDispatch();
  const {
    follow,
    popFollowModal,
    popPostModal,
    postId,
    postModal,
    user_id,
    user_profile,
  } = useContext(ModalContext);

  useEffect(() => {
    if (myId) return;
    dispatch(getUserInfoSaga());
  }, [dispatch, myId]);

  const deletePost = useCallback(
    (post_id: number) => {
      dispatch(deletePostSaga(post_id));
    },
    [dispatch],
  );

  const deleteBookmark = useCallback(
    (post_id: number) => {
      dispatch(deleteBookmarkSaga(post_id));
    },
    [dispatch],
  );

  return (
    <>
      <StyledDiv>
        <div className="list-container">
          <FollowUsersContainer />
          <FeedContainer />
        </div>
        <div className="recommend-container">
          <RecommendUsersContainer />
        </div>
      </StyledDiv>
      {postModal && (
        <PostModal
          popPostModal={popPostModal}
          popFollowModal={popFollowModal}
          postId={postId}
          userId={user_id}
          userProfile={user_profile}
          followers={users}
          follow={follow}
          deletePost={deletePost}
          deleteBookmark={deleteBookmark}
        />
      )}
    </>
  );
}

export default React.memo(HomeMain);
