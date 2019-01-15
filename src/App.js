import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';

const Hero = () => (
  <div className="row">
    <div className="jumbotron col-10 offset-1">
      <h1> Author Quiz </h1>
      <p> Selekt buk </p>
    </div>
  </div>
);

const Book = ({title, onClick}) => {
  return(
    <div className="answer" onClick={() => {onClick(title);}}>
      <h4>{title}</h4>
    </div>
  );
};

const Turn = ({author, books, highlight, onAnswerSelected}) => {

    const highlightToBgcolor = (highlight) => {
      const mapping = {
        'none': '',
        'correct': '#36EDB1',
        'wrong': '#ED3652'
      };
      return mapping[highlight];
    }

    return(
      <div className="row turn" style={{backgroundColor: highlightToBgcolor(highlight)}}>
        <div className="col-4 offset-1">
          <img src={author.imageUrl} className="authorimage" alt="Author" />
        </div>
        <div className="col-6">
          {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected}/>)}
        </div>
      </div>
    );
}
Turn.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
};

const Continue = ({show, onContinue}) => {
  return(
    <div className="row continue">
    { show
      ? <div className="col-11">
          <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>
          Continue
          </button>
        </div>
      : null }
    </div>
  );
}

const Footer = () => (
  <div id="footer" className="row">
    <div className="col-12">
      <p className="text-muted credit">
        Hi mom
      </p>
    </div>
  </div>
);

const AuthorQuiz = ({turnData, highlight, onAnswerSelected, onContinue}) => {
    return (
      <div className="container-fluid">
        <Hero />
        {/* props received by Turn will be author and books */}
        <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
        <Continue show={highlight === 'correct'} onContinue={onContinue} />
        <p><Link to="/add">Add an author </Link> </p>
        <Footer />
      </div>
    );

}

export default AuthorQuiz;
