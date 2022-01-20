import { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";

function App() {
  
  const [books, setBooks] = useState(null);
  const [characters, setCharacters] = useState(null);

  const fetchBooks = async () => {
    const response = await axios.get(
      "https://www.anapioficeandfire.com/api/books?pageSize=50"
    );
    setBooks(response.data);
  };
 
  const fetchCharacters = async () => {
    const response2 = await axios.get(
      "https://www.anapioficeandfire.com/api/characters?pageSize=50"
    );
    setCharacters(response2.data);
  };

  return (
    <div className="App">
      <h1>Game of Thrones</h1>
      <h2>Jouons avec l'API</h2>

     
      <div>
        <button className="fetch-button" onClick={fetchCharacters}> Personnage </button>
        <br />
      </div>
      <div>
        <button className="fetch-button space" onClick={fetchBooks}> Livres </button>
        <br />
      </div>


      <div className="frames">
        {books &&
          books.map((book, index) => {
            const CleanDate = new Date(book.released).toDateString();
              return (
                <div className="book" key={index}>
                  <h3>Livres n°{index + 1}</h3>
                  <h2>{book.name}</h2>

                  <div className="details">
                    <p><strong>{book.numberOfPages} pages</strong></p> 
                    <p><strong>Publier par : </strong> {book.publisher} </p>
                    <p><strong>Sortie le :</strong> {CleanDate}</p>
                  </div>
                </div>
              );
          })}
      </div>

      <div className="frames">
        {characters &&
          characters.map((character, index) => {
            return (
              <div className="book" key={index}>
                <h3>Personnage n°{index + 1}</h3>
                <h2>{character.name}</h2>
              
                <div className="details">
                  <p><strong>Surnom:   </strong>{character.aliases} </p>
                  <p><strong>Nee : </strong>{character.born}</p> 
                  <p><strong>Mort : </strong>{character.died}</p> 
                  <p><strong>Genre : </strong>{character.gender}</p> 
                  <p><strong>Joue par: </strong>{character.playedBy} </p>
                  <p><strong>Culture : </strong>{character.culture}</p>  
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
