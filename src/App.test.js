import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme, {mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

const state = {
  turnData: {
    books: ['Harry Potter', 'Tale of two titties', 'Piss poop'],
    author: {
        name: 'J.K. Rowling',
        imageUrl: 'https://static01.nyt.com/images/2012/10/14/books/review/1014BTB/1014BTB-popup.jpg',
        imageSource: 'The New York Times',
        books: ['Harry Potter', 'Tale of two titties']
    },
  },
  highlight: 'none'
}


describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App {...state} onAnswerSelected={()=>{}}/>, div);
  });

  describe("When no answer has been selected", ()=>{
    let wrapper;
    beforeAll(()=> {
      wrapper = mount(<App {...state} onAnswerSelected={()=>{}}/>);
    });

    it("should have no bg color", () => {
        expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
    });
  });

  describe("When the wrong answer has been selected", ()=>{
    let wrapper;
    beforeAll(()=> {
      wrapper = mount(<App {...(Object.assign({}, state, {highlight:'wrong'}))} onAnswerSelected={()=>{}}/>);
    });

    it("should have red bg color", () => {
        expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('#ED3652');
    });
  });

  describe("When the correct answer has been selected", ()=>{
    let wrapper;
    beforeAll(()=> {
      wrapper = mount(<App {...(Object.assign({}, state, {highlight:'correct'}))} onAnswerSelected={()=>{}}/>);
    });

    it("should have green bg color", () => {
        expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('#36EDB1');
    });
  });

  describe("When the first answer is selected", ()=>{
    let wrapper;
    const handleAnswerSelected = jest.fn();
    beforeAll(()=> {
      wrapper = mount(
        <App {...state} onAnswerSelected={handleAnswerSelected} />);
      wrapper.find('.answer').first().simulate('click');
    });
    it("onAnswerSelected should be called", ()=>{
      expect(handleAnswerSelected).toHaveBeenCalled();
    });
    it("should receive Harry Potter", ()=> {
      expect(handleAnswerSelected).toHaveBeenCalledWith("Harry Potter");
    })
  });
});
