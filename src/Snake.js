import React, { useState, useEffect, useReducer } from 'react';
import cx from 'classnames';

import app from './app.css';

const createGrid = (size = 20) => new Array(size).fill(new Array(size).fill({}));

const grid = createGrid();
const middleOfScreen = Math.floor(grid.length / 2);

export default function Snake() {
  // const [headX, setHeadX] = useState(middleOfScreen);
  // const [headY, setHeadY] = useState(middleOfScreen);
  const [direction, setDirection] = useState('E');
  const [position, dispatch] = useReducer(
    ([x, y]) => {
      switch (direction) {
        case 'N':
          return [x, y - 1];
        case 'E':
          return [x + 1, y];
        case 'S':
          return [x, y + 1];
        case 'W':
          return [x - 1, y];
        default:
          return [x, y];
      }
    },
    [middleOfScreen, middleOfScreen]
  );

  useEffect(() => {
    const handleKeyDown = e => {
      const keys = {
        ArrowLeft: 'W',
        ArrowRight: 'E',
        ArrowUp: 'N',
        ArrowDown: 'S',
      };

      keys[e.key] && setDirection(keys[e.key]);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const id = setInterval(dispatch, 500);

    return () => clearInterval(id);
  }, [dispatch]);

  const [x, y] = position;

  return (
    <div className={app.main}>
      {grid.map((row, i) => (
        <div key={i}>
          {row.map((tile, j) => (
            <div
              key={j}
              className={cx(app.tile, {
                [app.snake]: i === y && j === x,
              })}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
