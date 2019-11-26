import React, { Component, Fragment } from 'react'
import Board from "./Board"

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: ""
    }
    this.handleClick = this.handleClick.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  handleClick(evt, mode) {
    evt.preventDefault();
    this.setState({
      mode
    })
  }

  resetGame() {
    this.setState({
      mode: ''
    })
  }


  render() {
    console.log("state in game", this.state)
    return (
      <Fragment>
        <Fragment>
          {this.state.mode === '' ?
            <div>
              <h1> Choose your difficulty: </h1>
              <button onClick={(e) => { this.handleClick(e, 'easy') }}>Easy</button>
              <button onClick={(e) => { this.handleClick(e, 'medium') }}>Medium</button>
              <button onClick={(e) => { this.handleClick(e, 'hard') }}>Hard</button>
            </div> : null}
        </Fragment>
        <div>
          {this.state.mode === 'easy' ? < Board nrows={4} ncols={4} numClicks={4} resetGame={this.resetGame} /> : null}
          {this.state.mode === 'medium' ? < Board nrows={5} ncols={5} numClicks={5} resetGame={this.resetGame} /> : null}
          {this.state.mode === 'hard' ? < Board nrows={5} ncols={5} numClicks={7} resetGame={this.resetGame} /> : null}
        </div >
      </Fragment>
    )
  }
}

export default Game