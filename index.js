var prompt = require('prompt')

prompt.start()

prompt.get(['Let\'s play tic tac toe! press \'enter\' to start!'], function (err, result) {
  if (err) {
    console.log(err)
  }
  var newGame = new Game()
  return newGame
})

var Board = function () {
  return {
    1: ['_', '_', '_'],
    2: ['_', '_', '_'],
    3: ['_', '_', '_']
  }
}

var checkBoard = function (board) {
  var keepPlaying = true
  if ((board[1][0] !== '_' && board[1][0] === board[1][1] && board[1][0] === board[1][2]) ||
      (board[2][0] !== '_' && board[2][0] === board[2][1] && board[2][0] === board[2][2]) ||
      (board[3][0] !== '_' && board[3][0] === board[3][1] && board[3][0] === board[3][2]) ||
      (board[1][0] !== '_' && board[1][0] === board[2][1] && board[1][0] === board[3][2]) ||
      (board[1][2] !== '_' && board[1][0] === board[2][1] && board[1][2] === board[3][0]) ||
      (board[1][0] !== '_' && board[1][0] === board[2][0] && board[1][0] === board[3][0]) ||
      (board[1][1] !== '_' && board[1][1] === board[2][1] && board[1][1] === board[3][1]) ||
      (board[1][2] !== '_' && board[1][2] === board[2][2] && board[1][2] === board[3][2])) {
    keepPlaying = false
  }
  return keepPlaying
}

var Player = function (name, symbol) {
  this.name = name
  this.symbol = symbol
}

var player1 = new Player('PLAYER1', 'x')
var player2 = new Player('PLAYER2', 'o')

var Game = function () {
  this.board = new Board()
  this.moves = 0
  nextTurn(player1, this.board)
}

var nextTurn = function (player, board) {
  console.log('===========BOARD===========')
  console.log(board)
  console.log('===========BOARD===========')
  console.log('INSTRUCTIONS:')
  console.log('==> First enter the row, and then the column.')
  console.log('==> NOTE: rows and columns go from 1-3')
  console.log('==> have fun!')
  console.log(player.name, ': where would you like to make your first move?')
  prompt.get(['row', 'column'], function (err, result) {
    if (err) {
      console.log(err)
    }
    var nextMove = [result.row, result.column - 1]
    var validMoves = {'0': 0, '1': 1, '2': 2, '3': 3}
    if (!(nextMove[0] in validMoves) || !(nextMove[1] in validMoves)) {
      console.log('================ERROR================')
      console.log('Sorry! That\'s not a valid move.')
      console.log('================ERROR================')
      nextTurn(player, board)
    } else if (board[nextMove[0]][nextMove[1]] !== '_') {
      console.log('================ERROR================')
      console.log('Sorry! looks like that spot is taken.')
      console.log('================ERROR================')
      nextTurn(player, board)
    } else {
      board[nextMove[0]][nextMove[1]] = player.symbol
      if (checkBoard(board)) {
        if (player === player1) {
          nextTurn(player2, board)
        } else {
          nextTurn(player1, board)
        }
      } else {
        console.log('================WINNER================')
        console.log(board)
        console.log('================WINNER================')
        console.log('Congrats, ' + player.name + '! You won!')
        playAgain()
      }
    }
  })
}

var playAgain = function () {
  console.log('Would you like to play again? Enter \'y\' or \'n\'')
  prompt.get(['response'], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result.response === 'y') {
      var newGame = new Game()
      return newGame
    } else {
      console.log('Thanks for playing!')
      return
    }
  })
}
