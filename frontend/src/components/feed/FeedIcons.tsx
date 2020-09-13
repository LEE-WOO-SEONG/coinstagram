import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// icons
import {
  BsHeartFill,
  BsHeart,
  BsBookmarks,
  BsBookmarksFill,
  BsChat,
} from 'react-icons/bs';
import RootState from '../../type';
import { useSelector } from 'react-redux';

// styles
import { StyledDiv, IconDiv } from './FeedIconsStyle';

interface State {
  like: boolean;
  favorite: boolean;
}

interface FeedIconsProps {
  myId: string;
  postId: number;
  getPostLikes: (post_id: number) => void;
  addPostLikes: (post_id: number) => void;
}

function FeedIcons({
  myId,
  postId,
  getPostLikes,
  addPostLikes,
}: FeedIconsProps) {
  const { userLikes } = useSelector(
    (state: RootState) => state.likes.postLikes,
  );
  const postLikesInfo = userLikes.find(like => +like.post_id === postId);
  const likesCount =
    postLikesInfo === undefined ? 0 : postLikesInfo.user_id.length;
  const [state, setState] = useState<State>({
    like: false,
    favorite: false,
  });

  useEffect(() => {
    getPostLikes(postId);
  }, [getPostLikes, postId]);

  useEffect(() => {
    const isLiked =
      postLikesInfo && postLikesInfo.user_id.some(userId => userId === myId);
    if (!isLiked) return;

    setState(st => ({
      ...st,
      like: true,
    }));
  }, [postLikesInfo, myId]);

  return (
    <StyledDiv>
      <IconDiv like={state.like}>
        <div>
          <button onClick={toggleLike} className={`like-${postId}`}>
            <span tabIndex={-1}>
              {state.like ? <BsHeartFill /> : <BsHeart />}
            </span>
          </button>
          <Link to={`/post/${postId}`}>
            <span tabIndex={-1}>
              <BsChat />
            </span>
          </Link>
        </div>
        <button onClick={togleBookmark}>
          <span tabIndex={-1}>
            {state.favorite ? <BsBookmarksFill /> : <BsBookmarks />}
          </span>
        </button>
      </IconDiv>
      <div>
        {likesCount === 0 && <p>지금 좋아요를 눌러보세요</p>}
        {likesCount !== 0 && <p>{likesCount}명이 좋아합니다.</p>}
      </div>
    </StyledDiv>
  );

  function togleBookmark() {
    setState({
      ...state,
      favorite: !state.favorite,
    });
  }

  function toggleLike() {
    setState({
      ...state,
      like: !state.like,
    });

    addPostLikes(postId);
  }
}

export default FeedIcons;
