import React from 'react';
import useWindowWidth from '../../hooks/useWindowWidth';
import useObserver from '../../hooks/useObserver';
import { EachPostState } from '../../type';

// styles
import { StyledSection, StyledErrorDiv } from './RandomPostsStyle';
import { StyledNocontentDiv } from '../profile/ProfilePostsStyle';

// components
import Spinner from '../common/Spinner';
import OtherPostItem from '../post/OtherPostItem';
import { StyledLastComment, StyledSpinnerDiv } from '../feed/FeedStyle';

interface RandomPostsProps {
  loading: boolean;
  error: Error | null;
  randomPosts: EachPostState[];
  isLast: boolean;
  getPostCounts: (post_id: number) => void;
}

function RandomPosts({ loading, error, randomPosts, isLast, getPostCounts }: RandomPostsProps) {
  const width = useWindowWidth();
  const observerObj = useObserver('random', isLast);

  return (
    <StyledSection width={width}>
      {!loading && error !== null && (
        <StyledErrorDiv>
          <p>
            게시물 로딩에 실패하였습니다.{' '}
            <span aria-label="아쉬운 표정" role="img">
              😥
            </span>{' '}
            <br />
            페이지 새로고침 후 다시 실행해 주시기바랍니다.
          </p>
        </StyledErrorDiv>
      )}
      {!loading && error === null && randomPosts.length === 0 && (
        <StyledNocontentDiv>
          추천할 게시물이 없네요{' '}
          <span aria-label="아쉬운 표정" role="img">
            😊
          </span>
        </StyledNocontentDiv>
      )}
      {
        <ul>
          {randomPosts.map(post => (
            <OtherPostItem key={post.id} postId={post.id} postOwnerId={post.user_id} getPostCounts={getPostCounts} imageThumbnail={post.image_path} />
          ))}
        </ul>
      }
      <div style={{ position: 'relative', height: 80 }} ref={observerObj.lastItemRef}>
        {loading && (
          <StyledSpinnerDiv>
            <Spinner />
          </StyledSpinnerDiv>
        )}
        {isLast && <StyledLastComment>마지막 게시물입니다.</StyledLastComment>}
      </div>{' '}
    </StyledSection>
  );
}

export default React.memo(RandomPosts);
