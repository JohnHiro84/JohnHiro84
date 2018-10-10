"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    //add supr?
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: "flipTile",
    value: function flipTile(rowIndex, columnIndex) {
      if (this._playerBoard[rowIndex][columnIndex] !== " ") {
        console.log("This tile has already been flipped!");
        return;
      } else if (this._bombBoard[rowIndex][columnIndex] === "b") {
        this._playerBoard[rowIndex][columnIndex] = "b";
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);

        this._numberOfTiles--;
      }
    }
  }, {
    key: "getNumberOfNeighborBombs",
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      var numberOfRows = this._bombBoard.length;
      var numberOfColumns = this._bombBoard[0].length;
      var numberOfBombs = 0;

      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];

        //make sure the neighbors are on the board, not on the outskirts
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === "b") {
            //for a clicked tile return the number of neighboring bombs
            numberOfBombs++;
          }
        }
      });
      return numberOfBombs;
    }
  }, {
    key: "hasSafeTiles",
    value: function hasSafeTiles() {
      return this.numberOfTiles === this.numberOfBombs;
      //add the underscore here
    }
  }, {
    key: "print",
    value: function print() {
      console.log("Current Board after:");

      this._newboard = this._playerBoard.map(function (row) {
        return row.join(" | ");
      });
      this._newboard = this._newboard.join("\n");
      console.log(this._newboard);
    }
  }, {
    key: "playerBoard",
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: "generatePlayerBoard",
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var board = [];
      for (var i = 0; i < numberOfRows; i++) {
        var row = [];

        for (var j = 0; j < numberOfColumns; j++) {
          row.push(' ');
        }
        board.push(row);
      }
      return board;
    }
  }, {
    key: "generateBombBoard",
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = [];
      for (var i = 0; i < numberOfRows; i++) {
        var row = [];
        for (var j = 0; j < numberOfColumns; j++) {
          row.push(null);
        }
        board.push(row);
      }
      var numberOfBombsPlaced = 0;

      while (numberOfBombsPlaced < numberOfBombs) {
        //place bomb in random spot
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        if (board[randomRowIndex][randomColumnIndex] === 'b') {
          console.log("");
        } else {
          board[randomRowIndex][randomColumnIndex] = 'b';
          numberOfBombsPlaced++;
        }
      }
      return board;
    }
  }]);

  return Board;
}();