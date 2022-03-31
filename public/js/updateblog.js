let blogSelectedId = 0;
const blogFormHandler = async (event) => {
  event.preventDefault();
  const button = event.target;
  blogSelectedId = button.getAttribute('data-blog-id');
  const data = {};
  const name = document.querySelector('#title').value.trim();
  const post = document.querySelector('#description').value.trim();

  const response = await fetch('/api/blogs/' + blogSelectedId, {
    method: 'PUT',
    body: JSON.stringify({ name, post }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/blog/' + blogSelectedId);
  } else {
    alert('Failed to post blog.');
  }
};

document
  .querySelector('.blog-form')
  .addEventListener('submit', blogFormHandler);
