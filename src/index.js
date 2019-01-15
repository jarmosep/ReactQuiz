import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter} from 'react-router-dom';
import './index.css';
import AuthorQuiz from './App';
import AddAuthorForm from './AddAuthorForm';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';

let authors = [
    {
      name: 'Mark Twain',
      imageUrl: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE5NDg0MDU1MTUzNTA5OTAz/mark-twain-9512564-1-402.jpg',
      books: ['Huckleberry Finn', 'Tom Sawyer Abroad', 'The Mysterious Stranger', 'Letters from the Earth']
    },
    {
      name: 'Elias Lönnrot',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Elias_L%C3%B6nnrot_portrait.jpg',
      books: ['Kalevala', 'Kansanlauluja', 'Flora Fennica', 'Kasvikon oppisanoja']
    },
    {
      name: 'J.K. Rowling',
      imageUrl: 'https://static01.nyt.com/images/2012/10/14/books/review/1014BTB/1014BTB-popup.jpg',
      books: ['Harry Potter and the Chamber of Secrets', 'The Casual Vacancy', 'The Cuckoo\'s Calling']
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

const resetState = () => {
  return{
    turnData: getTurnData(authors),
    highlight: ''
  };
}

let state = resetState();

const onAnswerSelected = (answer) => {
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
}

const App = () => {
  return(
    <AuthorQuiz {...state}
    onAnswerSelected={onAnswerSelected}
    onContinue={() => {
      state = resetState();
      render();
    }}/>
  );
}

const AuthorWrapper = withRouter(({history}) =>
   <AddAuthorForm onAddAuthor={(author) => {
    console.log(author);
    authors.push(author);
    history.push('/');
    }} />
);

const render = () => {
  ReactDOM.render(
    <BrowserRouter>
      <React.Fragment>
        <Route exact path="/" component={App} />
        <Route path="/add" component={AuthorWrapper} />
      </React.Fragment>
    </BrowserRouter>, document.getElementById('root'));
}

render();
serviceWorker.unregister();
