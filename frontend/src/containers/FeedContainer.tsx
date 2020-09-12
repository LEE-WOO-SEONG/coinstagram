import React, { useCallback } from 'react';
import RootState from '../type';
import { useSelector, useDispatch } from 'react-redux';
import { getFeedPostsSaga } from '../redux/modules/post';
import { getPostComments, addPostComment } from '../redux/modules/comment';

// components
import Feed from '../components/feed/Feed';

function FeedContainer() {
  const dispatch = useDispatch();
  const { posts, userInfo } = useSelector((state: RootState) => state);
  const { loading, error, FeedPosts } = posts;
  const user_profile = userInfo.user && userInfo.user.user_profile;
  const user_id = userInfo.user && userInfo.user.user_id;

  const getFeedPosts = useCallback(
    (userId: string) => {
      dispatch(getFeedPostsSaga(userId));
    },
    [dispatch],
  );

  const getCommentsPost = useCallback(
    (post_id: number) => {
      dispatch(getPostComments(post_id));
    },
    [dispatch],
  );

  const addCommentPost = useCallback(
    (post_id: number, comment_text: string) => {
      dispatch(addPostComment(post_id, comment_text));
    },
    [dispatch],
  );

  return (
    <Feed
      loading={loading}
      error={error}
      feedPosts={FeedPosts}
      userProfile={user_profile}
      userId={user_id}
      getFeedPosts={getFeedPosts}
      getCommentsPost={getCommentsPost}
      addCommentPost={addCommentPost}
    />
  );
}

export default FeedContainer;
