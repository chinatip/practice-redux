import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

var deepFreeze = require('deep-freeze');
var expect = require('expect');

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
       return state - 1;
      default:
        return state;
  }
}

const Counter = ({ 
  value,
  onIncrement,
  onDecrement
 }) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

const store = createStore(counter);

const render = () => {
  ReactDOM.render(
    <Counter value={store.getState()}
             onIncrement={() =>
              store.dispatch({
                type: 'INCREMENT'
              })
             }
             onDecrement={() =>
              store.dispatch({
                type: 'DECREMENT'
              })
             } />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();

const addCounter = (list) => {
  return [...list, 0];
};

const removeCounter = (list, index) => {
  return [
    ...list.slice(0, index), 
    ...list.slice(index + 1)
    ];
};

const incrementCounter = (list,index) => {
  return [
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index + 1)
  ];
};

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];

  deepFreeze(listBefore);

  expect(
    addCounter(listBefore)
  ).toEqual(listAfter);
};

const testRemoveCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  deepFreeze(listBefore);

  expect(
    removeCounter(listBefore, 1)
  ).toEqual(listAfter);
};

const testIncrementCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];

  expect(
    incrementCounter(listBefore, 1)
  ).toEqual(listAfter);
}
testAddCounter();
testRemoveCounter();
testIncrementCounter();
console.log('All tests passed');