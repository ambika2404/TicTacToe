import "./App.css";
import Square from "./Square";
import { useState, useEffect } from "react";

export default function App() {
  const [board, setBoard] = useState(Array(25).fill(""));
  const [player, setPlayer] = useState("O");
  const [winner, setWinner] = useState("");
  const totalRow = Math.sqrt(board.length);
  useEffect(() => {
    if (
      rowWin(player) === true ||
      columnWin(player) === true ||
      diagonalWin(player) === true
    ) {
      setWinner(`The winner is ${player}`);
    }
    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }, [board]);

  function diagonalWin(player) {
    var leftFlag = true;
    var rightFlag = true;

    for (let i = 0; i < totalRow; i++) {
      const leftDiag = i * (totalRow + 1);
      const rightDiag = (i + 1) * (totalRow - 1);
      if (board[leftDiag] !== player) {
        leftFlag = false;
      }
      if (board[rightDiag] !== player) {
        rightFlag = false;
      }
    }
    return leftFlag || rightFlag;
  }

  function rowWin(player) {
    var flag = false;

    for (let row = 1; row <= totalRow; row++) {
      const rowFirstBox = row * totalRow - totalRow;
      const rowLastBox = row * totalRow - 1;
      for (let r = rowFirstBox; r <= rowLastBox; r++) {
        if (board[r] !== player) {
          break;
        }
        if (r === rowLastBox) {
          flag = true;
        }
      }
    }
    return flag;
  }
  function columnWin(player) {
    var flag = false;
    const totalColumn = Math.sqrt(board.length);
    const box = board.length;

    for (let column = 0; column < totalColumn; column++) {
      let columnBox = column;
      // const columnLastBox = box - totalColumn + column;
      while (columnBox < box) {
        if (board[columnBox] !== player) {
          break;
        }
        columnBox = columnBox + totalColumn;
        if (columnBox >= box) flag = true;
      }
    }
    return flag;
  }
  function chooseSquare(i) {
    // board[i] = board[i] === "" ? player : board[i];
    if (board[i] === "") {
      const newBoard = [...board];
      newBoard[i] = player;
      setBoard(newBoard);
    }
  }

  function buildBoard(i) {
    var qq = i + 2;
    console.log(qq);
    for (let aa = i; aa < qq; aa++)
      <Square
        val={board[aa]}
        chooseSquare={() => {
          chooseSquare(aa);
        }}
      />;
  }

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {Array.from({ length: totalRow }).map((_, row) => (
          <div key={row} className="row">
            {Array.from({ length: totalRow }).map((_, col) => {
              const index = row * totalRow + col;
              return (
                <Square
                  key={index}
                  val={board[index]}
                  chooseSquare={() => {
                    chooseSquare(index);
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* <div className="row">{buildBoard(0)}</div>
        <div className="row">
          <Square
            val={board[3]}
            chooseSquare={() => {
              chooseSquare(3);
            }}
          />
          <Square
            val={board[4]}
            chooseSquare={() => {
              chooseSquare(4);
            }}
          />
          <Square
            val={board[5]}
            chooseSquare={() => {
              chooseSquare(5);
            }}
          />
        </div>
        <div className="row">
          <Square
            val={board[6]}
            chooseSquare={() => {
              chooseSquare(6);
            }}
          />
          <Square
            val={board[7]}
            chooseSquare={() => {
              chooseSquare(7);
            }}
          />
          <Square
            val={board[8]}
            chooseSquare={() => {
              chooseSquare(8);
            }}
          />
        </div>
      </div> */}
      <h1>{winner}</h1>
    </div>
  );
}
