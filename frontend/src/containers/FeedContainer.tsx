import React, { useCallback, useEffect } from 'react';
import RootState from '../type';
import { useSelector, useDispatch } from 'react-redux';
import { addPostComment, resetComment } from '../redux/modules/comment';
import { addPostLikeSaga, deletePostLikeSaga } from '../redux/modules/like';
import { addBookmarkSaga, deleteBookmarkSaga } from '../redux/modules/bookmark';
import { resetData } from '../redux/modules/upload';

// components
import Feed from '../components/feed/Feed';
import { uploadPost } from '../redux/modules/post';

function FeedContainer() {
  const dispatch = useDispatch();
  const { posts, userInfo } = useSelector((state: RootState) => state);
  const { data } = useSelector((state: RootState) => state.upload);
  const { feedPosts } = posts.feedPosts;
  const { loading, error } = posts.feedPosts;
  const myId = userInfo.user && userInfo.user.user_id;

  useEffect(() => {
    dispatch(resetComment());
  }, [dispatch]);

  useEffect(() => {
    if (data.image_path.length === 0) return;
    dispatch(uploadPost(data));
    dispatch(resetData());
  }, [dispatch, data]);

  const addCommentPost = useCallback(
    (post_id: number, comment_text: string, myProfile: string) => {
      dispatch(addPostComment(post_id, comment_text, myProfile));
    },
    [dispatch],
  );

  const addPostLikes = useCallback(
    (post_id: number) => {
      dispatch(addPostLikeSaga(post_id));
    },
    [dispatch],
  );

  const deletePostLike = useCallback(
    (post_id: number) => {
      dispatch(deletePostLikeSaga(post_id));
    },
    [dispatch],
  );

  const addBookmark = useCallback(
    (post_id: number) => {
      dispatch(addBookmarkSaga(post_id));
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
    <Feed
      loading={loading}
      error={error}
      myId={myId}
      feedPosts={feedPosts}
      addCommentPost={addCommentPost}
      addPostLikes={addPostLikes}
      deletePostLike={deletePostLike}
      addBookmark={addBookmark}
      deleteBookmark={deleteBookmark}
    />
  );
}

export default React.memo(FeedContainer);
