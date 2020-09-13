const express = require('express');
const router = express.Router();
const { verifyToken } = require('./jwtMiddleware');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const pool = require('../config/database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
/**
 * add post
 * /post
 * {
 *  user_id,
 *  post_context = "",
 *  post_anotheruser = "",
 *  post_location = "",
 * }
 */
router.post('/post', verifyToken, async (req, res) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  const { user_id } = jwt.verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
  );
  const {
    post_context = '',
    post_anotheruser = '',
    post_location = '',
  } = req.body;
  console.log('testAPI');
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `insert into posts(user_id, post_context, post_anotheruser, post_location)
    values( ?, ?, ?, ?)`;
      await connection.query(sql, [
        user_id,
        post_context,
        post_anotheruser,
        post_location,
      ]);
      res.send({ success: true });
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json('SQL ERROR');
    } finally {
      await connection.release();
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});
/**
 * posts data (20)
 * /posts
 */
router.get('/posts', verifyToken, async (req, res) => {
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = 'select * from posts order by id desc limit 20 ;';
      const [check] = await connection.query(sql);
      res.send(check);
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json('SQL ERROR');
    } finally {
      await connection.release();
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});
/**
 * get post detail
 * /post/:post_id
 */
router.get('/post/:post_id', verifyToken, async (req, res) => {
  const { post_id } = req.params;
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `SELECT distinct a.id as post_id, a.user_id, a.post_context, a.post_anotheruser,a.created_at, a.post_location, GROUP_CONCAT(c.name) as hashtag, d.user_name, (SELECT COUNT(*) FROM post_like where post_id = ?) "like" FROM 
      (SELECT * FROM posts where id = ?) a left outer join post_tags b on a.id = b.post_id
      left outer join tag c on b.tag_id = c.id
      left outer join users d on a.user_id = d.user_id;`;
      const [check] = await connection.query(sql, [post_id, post_id]);
      res.send(check[0]);
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json('SQL ERROR');
    } finally {
      await connection.release();
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});
/**
 * add comment
 * /comment
 * {
 *  post_id
 *  comment_text
 * }
 */
router.post('/comment', async (req, res) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  const { user_id } = jwt.verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
  );
  const { post_id, comment_text } = req.body;
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql =
        'insert into comments(post_id, user_id, comment_text) values(?, ?, ?);';
      await connection.query(sql, [post_id, user_id, comment_text]);
      sql = 'SELECT * FROM comments ORDER BY id DESC LIMIT 1';
      const [newComment] = await connection.query(sql);
      res.send(newComment[0]);
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      res.status(500).json('SQL ERROR');
    } finally {
      await connection.release();
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});
/**
 * add child comment
 * /comment/child
 * {
 *  post_id
 *  comment_text
 *  parent
 * }
 */
router.post('/comment/child', async (req, res) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  const { user_id } = jwt.verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
  );
  const { post_id, comment_text, parent } = req.body;
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      // 부모 댓글이 있나 확인
      sql = 'select count(*) from comments where id = ?';
      const [isParent] = await connection.query(sql, parent);
      if (isParent === 0) {
        res.status(500).json('댓글이 없습니다.');
      }
      sql = 'select * from comments where parent is null and id = ?;';
      const [isparent] = await connection.query(sql, parent);
      if (isparent.length === 0) {
        throw Error('부모 댓글이 아닙니다.');
      }
      sql =
        'insert into comments(post_id, user_id, comment_text, parent) values(?, ?, ?, ?);';
      await connection.query(sql, [post_id, user_id, comment_text, parent]);
      sql = 'SELECT * FROM comments where id = ? or parent = ?';
      const [newComment] = await connection.query(sql, [parent, parent]);
      res.send(newComment);
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json('SQL ERROR');
    } finally {
      await connection.release();
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});
/**
 * get post comment
 * /comment/post/:id
 */
router.get('/comment/post/:post_id', verifyToken, async (req, res) => {
  const { post_id } = req.params;
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `SELECT * FROM comments where post_id = ?`;
      const [check] = await connection.query(sql, post_id);
      res.send(check);
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json('SQL ERROR');
    } finally {
      await connection.release();
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});
/**
 * get post detail
 * /user/post/:user_id
 */
router.get('/user/post/:user_id', verifyToken, async (req, res) => {
  const { user_id } = req.params;
  let sql = ``;
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `select * from posts where user_id = ? order by id desc`;
      const [check] = await connection.query(sql, user_id);
      res.send(check);
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json('SQL ERROR');
    } finally {
      await connection.release();
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});
/**
 * login user friend post
 * /user/relationship/post
 */
router.get('/user/relationship/post', verifyToken, async (req, res) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  const userData = jwt.verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
  );
  const user = userData;
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = `select user_id from users where user_id in(select followee_id from users_relationship where follower_id = ?);`;
      const [followee_id] = await connection.query(sql, user.user_id);
      sql = `select * from posts where user_id = ? order by id desc;`;
      let sqls = '';
      let params = [];
      if (followee_id.length === 0) return res.json(followee_id);
      followee_id.map(({ user_id }) => {
        params = [user_id];
        sqls += mysql.format(sql, params);
      });
      console.log(sqls);
      const [test] = await connection.query(sqls);
      const result = test.filter((el) => el.length !== 0);
      console.log('result', result);
      res.json(...result);
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json('SQL ERROR');
    } finally {
      await connection.release();
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});
/**
 * add image
 * /images
 */
try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('upload 폴더 생성');
  fs.mkdirSync('uploads');
}
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 확장자
      const basename = path.basename(file.originalname, ext); // 베이스 이름
      done(null, basename + '_' + new Date().getTime() + ext); // 베이스이름(시간).확장자
    },
  }),
  limits: { fileSize: 100 * 1027 * 1024 }, // 100MB
  // 단 이미지나 동영상은 백엔드를 거치지 않고
  // 프론트에서 바로 클라우드로 보내는게 좋다.
});
router.post('/images', verifyToken, upload.array('image'), async (req, res) => {
  const file = req.files.map(({ path }) => {
    const change = path.split(' ');
    const changePath = change[0];
    const changeFilename = change[1].split('.')[0];
    const changeFiletype = change[1].split('.')[1];
    return { changePath, changeFilename, changeFiletype };
  });
  console.log(file);
  console.log(req.file);
  res.json(req.files.map((v) => v.filename));
});

/**
 * add post like
 * /post/like
 * {
 *  post_id
 * }
 */
router.post('/post/like', async (req, res) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  const userData = jwt.verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
  );
  const { user_id } = userData;
  const { post_id } = req.body;

  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = 'insert into post_like values (?, ?)';

      await connection.query(sql, [post_id, user_id]);

      sql = 'select count(*) as likeCount from post_like where post_id = ?';
      const [check] = await connection.query(sql, post_id);
      res.send(check[0]);
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json('SQL ERROR');
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});

/**
 * add comment like
 * /comment/child
 * {
 *  post_id
 *  post_id
 * }
 */
router.post('/comment/like', async (req, res) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  const userData = jwt.verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
  );
  const { user_id } = userData;
  const { comment_id, post_id } = req.body;
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = 'insert into comment_like values (?, ?, ?)';
      await connection.query(sql, [user_id, comment_id, post_id]);
      sql =
        'select count(*) as comment_like from comment_like where comment_id = ? and post_id = ?';
      const [check] = await connection.query(sql, [comment_id, post_id]);
      res.send(check[0]);
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json('SQL ERROR');
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});

/**
 * add bookmark
 * /bookmark
 * {
 *  post_id
 * }
 */
router.post('/bookmark', async (req, res) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  const userData = jwt.verify(
    token,
    // eslint-disable-next-line no-undef
    process.env.JWT_SECRET,
  );
  const { user_id } = userData;
  const { post_id } = req.body;
  let sql = '';
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      sql = 'insert into bookmark values (?, ?)';
      await connection.query(sql, [user_id, post_id]);
      sql = `select b.post_title, (select count(*) from bookmark where user_id = ?) as userBookmark,
      (select count(*) from bookmark where post_id = ?) as postBookmark
      from bookmark as a inner join posts as b where a.post_id = ? and a.post_id = b.id;`;
      const [check] = await connection.query(sql, [user_id, post_id, post_id]);
      res.send(check[0]);
    } catch (error) {
      await connection.rollback(); // ROLLBACK
      await connection.release();
      console.log(error);
      res.status(500).json('SQL ERROR');
    }
  } catch (error) {
    res.status(500).json('DB CONNECT ERROR');
  }
});

module.exports = router;
