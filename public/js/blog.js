const addCommentHandler = async (event) => {
  event.preventDefault();
  const data = {};
  const commentID = document
    .querySelector('#comment')
    .getAttribute('data-comment-id');
  const BlogId = document.querySelector('#title').getAttribute('data-blog-id');
  const comment = document.querySelector('#commentInfo').value.trim();

  const response = await fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ user_id: commentID, blog_id: BlogId, comment }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    console.log('hello');
    location.reload();
  } else {
    alert('Failed to post comment.');
  }
};

document.querySelector('#comment').addEventListener('click', addCommentHandler);
