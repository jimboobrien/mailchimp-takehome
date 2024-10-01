// src/components/CommentForm.js
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Api } from '../api';

interface Comment {
  id: number;
  name: string;
  message: string;
  created: Date;
}

//* id: INTEGER
//* name: TEXT
//* created: DATETIME
//* message: TEXT

const CommentForm: React.FC = ({ onNewComment }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const toggleForm = () => {
    setIsVisible(!isVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      id: uuidv4(),
      name,
      message,
      created: new Date().toISOString(),
    };

    try {
      const res = Api.post('http://localhost:3001/createComment', newComment)

      // Call the onNewComment callback to notify the parent component
      if (onNewComment && res.id) {
        onNewComment(res.id); // Pass the new comment ID to the parent
      }
      setName('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className='comment__form'>
      <button
        className={`toggle-button ${isVisible ? 'visible' : ''}`}
        onClick={toggleForm}
      >
        {isVisible ? 'Hide Form' : 'Submit Comment'}
      </button>
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

        <button type="submit">Comment</button>
      </form>
      )}
    </div>
  );

};

export default CommentForm;