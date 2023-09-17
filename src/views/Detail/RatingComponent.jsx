import React, { useState, useEffect } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";



function RatingComponent() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const onStarClick = (nextRating) => {
    setRating(nextRating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes hacer algo con el rating y el comentario, como enviarlos a un servidor o realizar una acción específica.
    console.log('Calificación:', rating);
    console.log('Comentario:', comment);
  };

  return (
    <div>
      <h2>Rate with Stars</h2>
      <StarRatingComponent
        name="rating"
        starCount={5} // Número de estrellas
        value={rating} // Valor de la calificación actual
        onStarClick={(nextRating) => setRating(nextRating)} // Función para actualizar la calificación
      />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            name="comment"
            rows="4"
            cols="50"
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
        <div>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}

export default RatingComponent;