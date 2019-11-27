import React, { Component } from 'react'
import "./Cell.css"


/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

class Cell extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    // call up to the board to flip cells around this cell
    this.props.flipCellsAroundMe(this.props.coord);
  }

  render() {
    let classes = "Cell" + (this.props.isLit ? " Cell-lit" : "");
    let id;
    if (this.props.mode === 'easy') {
      id = "easy-cell"
    } else if (this.props.mode === 'medium') {
      id = "med-cell"
    } else if (this.props.mode === 'hard') {
      id = "hard-cell"
    }

    return (
      <td className={classes}
        id={id}
        onClick={this.handleClick} />
    )
  }
}


export default Cell