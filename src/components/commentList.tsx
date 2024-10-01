import React from 'react';

const CommentList = ({ comments }) => {
  return (
    <div className='comment__list'>
      <h2>Comments:</h2>
      {comments.map((comment) => (
        <article key={comment.id}>
          <p>{comment.message}</p>
          <footer>
            <p>{comment.name} on {comment.created}</p>
          </footer>
        </article>
      ))}
    </div>
  );
};

export default CommentList;