import React, {useState, useEffect} from 'react';
import cx from 'classnames';

import app from './app.css';

const createGrid = (size = 20) => {
  const row = new Array(size).fill({});
  const rows = new Array(size).fill(row);
  return rows;
}

const grid = createGrid();
const middle = Math.floor(grid.length / 2);

export default function Snake() {
  const [headX, setHeadX] = useState(middle);
  const [headY, setHeadY] = useState(middle);
  const [direction, setDirection] = useState('E');

  useEffect(() => {
    const handleKeyDown = (e) => {
      const keys = {
        ArrowLeft: 'W',
        ArrowRight: 'E',
        ArrowUp: 'N',
        ArrowDown: 'S',
      };

      keys[e.key] && setDirection(keys[e.key]);
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);


  useEffect(() => {
    const id = setInterval(() => {
      const setDirectionMap = {
        N: () => setHeadY(y => y - 1),
        S: () => setHeadY(y => y + 1), 
        W: () => setHeadX(x => x - 1), 
        E: () => setHeadX(x => x + 1) 
      };

      setDirectionMap[direction]();
    }, 500);

    return () => clearInterval(id);
  }, [direction]);
  
  return (
    <div className={app.main}>
      {grid.map((row, i) => (
        <div key={i} >
          {row.map((tile, j) => (
            <div
              key={j}
              className={cx(app.tile, {
                [app.snake]: i === headY && j === headX
              })}
            />
          ))}
       </div>
      ))}
    </div>
  )
}
