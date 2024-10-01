import React, { useState, useEffect } from 'react';
import CommentForm from './commentForm';
import CommentList from './commentList'; // Assuming you have a CommentList component
import { Api } from '../api';

interface Comment {
  id: number;
  name: string;
  created: Date;
  message: string;
}

const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [searchId, setSearchId] = useState(''); // State to store the search input value
  const [searchResult, setSearchResult] = useState<Comment | null>(null);

  // Function to fetch comments
  const fetchComments = async () => {
    try {
      const response = await Api.get('http://localhost:3001/getComments'); // Fetch existing comments
      setComments(response);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // Function to handle the search and fetch a comment by ID
  const searchCommentById = async (searchId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/getComment?id=${searchId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        const text = await response.text();
        const data = text ? JSON.parse(text) : {};
        setSearchResult(data);
      } else {
        console.error(`Error: ${response.statusText}`);
        setSearchResult(null);
      }
      //const data = await response.json();
      //setSearchResult(data);
    } catch (error) {
      console.error('Error fetching comment by ID:', error);
      setSearchResult(null);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    fetchComments();
  }, [comments]);

  const handleNewComment = () => {
    fetchComments();
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchId) {
      searchCommentById(searchId);
    }
  };


  const clearSearch = () => {
    setSearchId('');
    setSearchResult(null);
  };

  return (
    <div className="comments__container">
      <CommentForm onNewComment={handleNewComment} /> {/* Pass the callback */}
      <div className="search__container">
        <h2>Search Comments</h2>
        <form onSubmit={handleSearchSubmit} className="search__form">
          <input
            type="text"
            value={searchId}
            onChange={handleSearchInputChange}
            placeholder="Enter comment ID to search"
            className="search__input"
          />
          <button type="submit" >Search</button>
          <button type="button" onClick={clearSearch}>Clear</button>
        </form>
        {searchResult ? (
          <div className="search__result">
            <h2>Search Result:</h2>
            <article>
              <p>{searchResult.message}</p>
              <footer>
                <p>{searchResult.name} on {searchResult.created}</p>
              </footer>
            </article>
          </div>
        ) : (
          <p className="search__result">No comment found with that ID.</p>
        )}
      </div>
      <CommentList comments={comments} /> {/* Render the comment list */}
    </div>
  );
};

export default CommentSection;
