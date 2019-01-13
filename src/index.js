import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';

const authors = [
    {
      name: 'Mark Twain',
      imageUrl: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE5NDg0MDU1MTUzNTA5OTAz/mark-twain-9512564-1-402.jpg',
      imageSource: 'Wikimedia',
      books: ['Huckleberry Finn', 'Donald Duck', 'Mein Kampf']
    },
    {
      name: 'Elis Lönnrot',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Elias_L%C3%B6nnrot_portrait.jpg',
      imageSource: 'Wikimedia',
      books: ['Kalevala']
    },
    {
      name: 'J.K. Rowling',
      imageUrl: 'https://static01.nyt.com/images/2012/10/14/books/review/1014BTB/1014BTB-popup.jpg',
      imageSource: 'The New York Times',
      books: ['Harry Potter']
    }
];

const getTurnData = (authors) => {
  const allBooks = authors.reduce( (p,c,i) => {
    return p.concat(c.books);
  }, []);
  const fourRandomBooks = shuffle(allBooks).slice(0,4);
  const answer = sample(fourRandomBooks);

  return {
    books: fourRandomBooks,
    author: authors.find((author) =>
        author.books.some((title) =>
          title === answer))
  }

};

const state = {
    turnData: getTurnData(authors)
};

ReactDOM.render(<App {...state} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
