// src/components/CommentForm.js
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Api } from '../api';

interface Comment {
  id: number;
  name: string;
  created: Date;
  message: string;
}

interface CommentFormProps {
  onNewComment: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onNewComment }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const toggleForm = () => {
    setIsVisible(!isVisible);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newComment = {
      id: uuidv4(),
      name,
      message,
      created: new Date().toISOString(),
    };

    try {
      const res = Api.post('http://localhost:3001/createComment', newComment)

      if ( res.success ){
        onNewComment(); // This will trigger a re-fetch of the comments
      }

      setName('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const deletePosts = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = Api.delete('http://localhost:3001/deleteComments');
      if ( res.success ) {
        console.log('Comments deleted');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className={`comment__form ${isVisible ? 'opened' : ''}`}>
      {isVisible && (
      <form onSubmit={handleSubmit} className="form__container">
        <div className="form-group">
          <label htmlFor="name">
            Name
            <span aria-hidden="true">*</span>
            <span className="sr-only">required</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            aria-required="true"
            aria-describedby="nameHelp"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <small id="nameHelp" className="sr-only">Please enter your full name.</small>
        </div>

        <div className="form-group">
          <label htmlFor="message">
            Message
            <span aria-hidden="true">*</span>
            <span className="sr-only">required</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            aria-required="true"
            aria-describedby="messageHelp"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <small id="messageHelp" className="sr-only">Enter your message here.</small>
        </div>

        <button type="submit">Submit</button>
        <button
          className={`deletePosts`}
          onClick={deletePosts}
        >
          Delete
        </button>
      </form>
      )}
      <button
        className={`toggle-button ${isVisible ? 'visible' : ''}`}
        onClick={toggleForm}
      >
        {isVisible ? 'Hide Form' : 'Submit Comment'}
      </button>
    </div>
  );

};

export default CommentForm;