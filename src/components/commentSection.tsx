import React, { useState, useEffect } from 'react';
import CommentForm from './commentForm';
import CommentList from './commentList'; // Assuming you have a CommentList component
import { Api } from '../api';

const CommentSection = () => {
  const [comments, setComments] = useState([]);

  // Function to fetch comments
  const fetchComments = async () => {
    try {
      const response = await Api.get('http://localhost:3001/getComments'); // Fetch existing comments
      setComments(response);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // Call fetchComments when the component mounts
  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    fetchComments();
  }, [comments]);

  // Callback function to refresh comments after a new one is added
  const handleNewComment = () => {
    fetchComments(); // Refresh the comments list by refetching the data
  };

  return (
    <div className="comments__container">
      <CommentForm onNewComment={handleNewComment} /> {/* Pass the callback */}
      <CommentList comments={comments} /> {/* Render the comment list */}
    </div>
  );
};

export default CommentSection;
