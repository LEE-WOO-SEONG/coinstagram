import axios from 'axios';
import { EachPostState } from '../../type';

const baseUrl = '/post';

interface IPostService {
  getRandomPosts: (token: string | null) => Promise<EachPostState[]>;
  getFollowersPosts: (token: string | null) => Promise<EachPostState[]>;
  getUserPosts: (
    token: string | null,
    user_id: string,
  ) => Promise<EachPostState[]>;
  getSelectedPost: (
    token: string | null,
    post_id: number,
  ) => Promise<EachPostState>;
  deletePost: (token: string | null, post_id: number) => void;
}

const PostService: IPostService = class {
  static async getRandomPosts(token: string | null) {
    const res = await axios.get<EachPostState[]>(`${baseUrl}s`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  static async getFollowersPosts(token: string | null) {
    const res = await axios.get<EachPostState[]>(
      `/user/relationship${baseUrl}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  }

  static async getUserPosts(token: string | null, user_id: string) {
    const res = await axios.get<EachPostState[]>(`/user${baseUrl}/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  static async getSelectedPost(token: string | null, post_id: number) {
    const res = await axios.get<EachPostState>(`${baseUrl}/${post_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }

  static async deletePost(token: string | null, post_id: number) {
    const res = await axios.delete(`${baseUrl}/${post_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);
  }

  // static async patchPosts..
};

export default PostService;
