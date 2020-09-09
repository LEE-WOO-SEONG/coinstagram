import React, { useContext } from 'react';
import { ModalContext } from '../../App';
import { followContext } from '../../containers/HomeMain';
import { Link, useHistory } from 'react-router-dom';

// components
import Thumbnail from '../common/Thumbnail';

// styles
import {
  StyledDiv,
  UsernameDiv,
  LocationDiv,
  StyledBtn,
} from './FeedHeaderStyle';

interface FeedHeaderProps {
  userId: string;
  postId: number;
  location: null | string;
  userProfile: null | string;
}

function FeedHeader({
  userId,
  postId,
  location,
  userProfile,
}: FeedHeaderProps) {
  const { popPostModal } = useContext(ModalContext);
  const { setFollowInfo, changePostId } = useContext(followContext);
  const history = useHistory();

  return (
    <>
      <StyledDiv>
        <button onClick={pageMove}>
          <Thumbnail size={35} imageUrl={userProfile} />
          <UsernameDiv tabIndex={-1}>
            <dt className="a11y-hidden">user id</dt>
            <dd>{userId}</dd>
          </UsernameDiv>
        </button>
        <Link to={`/explore/tags/${location}`}>
          <LocationDiv tabIndex={-1}>
            <dt className="a11y-hidden">location</dt>
            <dd>{location}</dd>
          </LocationDiv>
        </Link>
        <StyledBtn onClick={setModal}>
          <div tabIndex={-1}>
            <span></span>
          </div>
        </StyledBtn>
      </StyledDiv>
    </>
  );

  function pageMove() {
    setTimeout(() => {
      history.push(`/${userId}`);
    }, 1000);
  }

  function setModal() {
    popPostModal();
    changePostId(postId);
    setFollowInfo(userId, userProfile, null);
  }
}

export default FeedHeader;
