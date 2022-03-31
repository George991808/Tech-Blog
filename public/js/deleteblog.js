let blogSelectedId = 0;

const deleteButton = async (event) => {
  console.log(event);
  const button = event.target;
  blogSelectedId = button.getAttribute('data-blog-id');
  const response = await fetch('/api/blogs/' + blogSelectedId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    location.reload();
  } else {
    alert('Failed to delete blog');
  }
};

document.querySelector('.deletebtn').addEventListener('click', deleteButton);
