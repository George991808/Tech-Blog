const blogFormHandler = async (event) => {
  event.preventDefault();
  const data = {};
  const name = document.querySelector('#title').value.trim();
  const post = document.querySelector('#description').value.trim();

  const response = await fetch('/api/blogs', {
    method: 'POST',
    body: JSON.stringify({ name, post }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to post blog.');
  }
};

document
  .querySelector('.blog-form')
  .addEventListener('submit', blogFormHandler);
