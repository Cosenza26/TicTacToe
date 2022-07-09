import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Funtion changes state after clicking to display 'X' or 'O'
function Square(props) {

    
    
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    
    
    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
    
    
    
    
    render() {
      
      
      //Creates board 
      return (
       
        
        <div className='board'>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true
      };
    }
    //After each move it checks for a winner, displays new history and shows who is nexct
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });
    }
    
    // Moves to back to the selected move
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }

    //Displays each move 
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const  winner = calculateWinner(current.squares);
      
    
      const moves = history.map((step, move) => {
        
        const desc = move ?
          'Go to move #' + move + " row: " :
          'Go to game start';
        return (
          <li key={move}>
            <button className='historyButton' onClick={() => this.jumpTo(move)}>{desc}</button>
            
          </li>
          
        ); 
      });
  
      let status;
      if (winner) {
        status = winner;
        
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
      
      //Displays game
      return (
        <div className="game">
          

          <div className="game-info">
            <div className='statusInfo'>{status}</div>
            
          </div>

          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>

          <div className='moves'>
            <ol>{moves}</ol>
          </div>
        </div>
      );


    }
  }
  

const container = document.getElementById("root");
const root = createRoot(container);



root.render(
    <Game />);


  
    function calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];
        
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            
            return "Winner: " + squares[a];
          }
        }
        
        let fillSquare = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i] != null) {
               fillSquare++;
            }
  
        }
        if (fillSquare === 9){
            return "Draw"
        }
        return null;
      }


     

     



  
      
      