import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
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
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.75 // 25% chance of lighting up
  }

  constructor(props) {
    super(props);
    this.state = {
      board: this.createBoard(),
    };
    this.flipCellsAround = this.flipCellsAround.bind(this);

    // TODO: set initial state
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < this.props.nrows; i++) {
      let row = [];
      board.push(row)
      for (let j = 0; j < this.props.ncols; j++) {
        let random = Math.random()
        row.push(random > this.props.chanceLightStartsOn);
      }
    }
    console.log(board);
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let hasWon = this.state.hasWon;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    console.log(y)
    console.log(x)


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
    console.log(this.state.board);

    if (this.isFalse(this.state.board)) {
      return <h1>You won. Congratulations.</h1>
    }
    else {
      return (
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
                  />)}
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
  }
}


export default Board;
