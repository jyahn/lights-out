import React, { Component, Fragment } from "react";
import Cell from "../Cell/Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: this.createBoard(),
    };
    this.flipCellsAround = this.flipCellsAround.bind(this);
    this.simulateClicks(this.props.numClicks);
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    for (let i = 0; i < this.props.nrows; i++) {
      let row = [];
      board.push(row)
      for (let j = 0; j < this.props.ncols; j++) {
        row.push(false); // all are lit off 
      }
    }
    return board
  }


  simulateClicks(num, board) {
    let coordArr = []
    for (let i = 0; i < num; i++) {
      let firstRandCoord = Math.floor(Math.random() * this.props.nrows);
      let secondRandCoord = Math.floor(Math.random() * this.props.nrows);
      let coordToFlip = `${firstRandCoord}-${secondRandCoord}`;
      this.flipCellsAround(coordToFlip);
    }
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    flipCell(y, x);

    // TODO: flip this cell and the cells around it

    flipCell(y + 1, x);
    flipCell(y - 1, x);
    flipCell(y, x + 1);
    flipCell(y, x - 1);
    // win when every cell is turned off
    // TODO: determine is the game has been won


    this.setState({ board });
  }


  isFalse(board) {
    for (const arr of board) {
      for (const item of arr) {
        if (item !== false) return false;
      }
    }
    return true;
  }
  /** Render game board or winning message. */

  render() {
    if (this.isFalse(this.state.board)) {
      return (
        <div className="container">
          <div className="fluorescent-text" id="congratulations">Congratulations! You win.</div>
          <button className="flickering-button" id="reset-button" onClick={this.props.resetGame}>Restart Game</button>
        </div>
      )
    }
    else {
      return (
        <div>
          <table>
            <tbody>
              {this.state.board.map((row, ridx) => (
                <tr key={ridx}>
                  {row.map((cell, cidx) =>
                    <Cell
                      key={`${ridx}-${cidx}`}
                      coord={`${ridx}-${cidx}`}
                      isLit={this.state.board[ridx][cidx]}
                      flipCellsAroundMe={this.flipCellsAround}
                      mode={this.props.mode}
                    />)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  }
}


export default Board;
