import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookmarksSaga } from '../redux/modules/bookmark';
import { getFeedPostsSaga, getRandomPostsSaga } from '../redux/modules/post';
import { getUserInfoSaga } from '../redux/modules/userInfo';
import RootState from '../type';

function useInit() {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.userInfo);
  const { followers } = useSelector((state: RootState) => state.userInfo);
  const userId = user && user.user_id;
  const followersInfo = followers.users;

  useEffect(() => {
    if (token === null) return;
    dispatch(getUserInfoSaga());
  }, [dispatch, token]);

  useEffect(() => {
    if (token === null) return;
    dispatch(getFeedPostsSaga(1));
    console.log('follow');
  }, [dispatch, userId, followersInfo, token]);

  useEffect(() => {
    if (token === null) return;
    dispatch(getBookmarksSaga(userId));
  }, [dispatch, userId, token]);

  useEffect(() => {
    if (token === null) return;
    dispatch(getRandomPostsSaga(1));
    console.log('init random');
  }, [dispatch, token]);
}

export default useInit;
