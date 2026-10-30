async function listPosts(db) {
  // Before: N+1 — one query per post to fetch author
  // After: single JOIN
  const posts = await db('posts')
    .join('users', 'posts.author_id', 'users.id')
    .select(
      'posts.id',
      'posts.title',
      'posts.created_at',
      'users.name as author_name',
      'users.email as author_email'
    )
    .orderBy('posts.created_at', 'desc');

  return posts;
}

module.exports = { listPosts };
