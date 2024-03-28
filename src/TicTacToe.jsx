import { useState } from 'react';
import './TicTacToe.css';

const Box = ({ value, index, onClick }) => {
  return (
    <div className="box" key={index} onClick={onClick}>
      {value}
    </div>
  );
};

const TicTacToe = () => {
  let [player, setPlayer] = useState('X');
  let [board, setBoard] = useState(new Array(9).fill(''));
  let [winner, setWinner] = useState('');
  let [winningCombos] = useState([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]);

  const handleClick = (index) => {
    if (board[index] !== '' || winner) return;
    const newBoard = [...board];
    newBoard[index] = player;

    setBoard(newBoard);
    checkWinner(newBoard);
    setPlayer((prev) => (prev === 'X' ? 'O' : 'X'));
  };

  const handleClickReset = () => {
    setBoard(new Array(9).fill(''));
    setWinner('');
    setPlayer('X');
  };

  const checkWinner = (newBoard) => {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setWinner(player);
        break;
      }
    }
  };

  return (
    <>
      <div className="board">
        {board.map((val, ind) => (
          <Box
            value={val}
            index={ind}
            onClick={winner.length ? () => null : () => handleClick(ind)}
          />
        ))}
      </div>
      <div className="buttonAndMessage">
        <div className="resetButton" onClick={handleClickReset}>
          Reset
        </div>
        <div className="message">
          {!winner.length ? `${player}'s turn` : `Winner is ${winner}`}
        </div>
      </div>
    </>
  );
};

export default TicTacToe;
