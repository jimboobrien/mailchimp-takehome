import React from 'react';

const CommentList = ({ comments }) => {
  const isArray = Array.isArray(comments);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Get the day of the week and time (12-hour format with AM/PM)
    const options = { weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <div className='comment__list'>
      <h2>Comments:</h2>
      {!comments ? (
        <p>No comments available.</p>
      ) : isArray ? (
        comments.length > 0 ? (
          comments.map((comment) => (
            <article key={comment.id}>
              <p>{comment.message}</p>
              <footer>
                <p>
                  <span className='comment_author'>{comment.name}</span>
                  <span className='comment_separator'>on</span>
                  <span className='comment_date'>{formatDate(comment.created)}</span>
                </p>
              </footer>
            </article>
          ))
        ) : (
          <p>No comments to display.</p>
        )
      ) : (
        <p>No valid comments available.</p>
      )}
    </div>
  );
};

export default CommentList;