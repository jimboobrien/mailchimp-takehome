import React from 'react';

interface Comment {
  id: number;
  name: string;
  created: Date;
  message: string;
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const isArray = Array.isArray(comments);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US',
      { weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: true }
    ).format(date);
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