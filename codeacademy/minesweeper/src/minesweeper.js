/*
class Game {
  constructor(numberOfRows,numberOfColumns,numberOfBombs) {

    this._board = new Board(numberOfRows,numberOfColumns,numberOfBombs);


  }
  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex,columnIndex);
    if(this._playerBoard[rowIndex][columnIndex] ==="b") {
      console.log("you hit a bomb, game is over");
      this_.board.print();
    } else if(this._board.safeTiles() === false) {
      console.log("you win");
    } else  {
      console.log("Current board");
      print();
    }
    }
  }


class Board {
	constructor(numberOfRows, numberOfColumns, numberOfBombs) {
//add supr?
	    this._numberOfBombs = numberOfBombs;
	    this._numberOfTiles = (numberOfRows * numberOfColumns);
	    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
	    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
	}

	get playerBoard() {
            return this._playerBoard;
  }

  flipTile (rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== " ") {
      console.log("This tile has already been flipped!");
      return;

    } else if(this._bombBoard[rowIndex][columnIndex] ==="b") {
      this._playerBoard[rowIndex][columnIndex] = "b";

    } else {
        this._playerBoard[rowIndex][columnIndex] = this._getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex) {

      this._neighborOffsets = [[-1,-1],[-1,0 ],[-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]];
      this._numberOfRows = this._bombBoard.length;
      this._numberOfColumns = this._bombBoard[0].length;
      this._numberOfBombs = 0;

      this._neighborOffsets.forEach(offset => {
        this._neighborRowIndex = rowIndex + offset[0];
        this._neighborColumnIndex = columnIndex + offset[1];

      //make sure the neighbors are on the board, not on the outskirts
        if (this._neighborRowIndex >= 0 && this._neighborRowIndex < this._numberOfRows && this._neighborColumnIndex >=0 && this._neighborColumnIndex < this._numberOfColumns){
          if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === "b"){
            //for a clicked tile return the number of neighboring bombs
            this._numberofBombs++;
          }
        }
    });
    return this._numberofBombs;
  }


  hasSafeTiles() {
   return(this.numberOfTiles !== this.numberOfBombs);
  }

  print() {
    console.log("Current Board after:");


    this._newboard = this._board.map(row => row.join(" | "));
    this._newboard = this._newboard.join("\n");
    console.log(this._newboard);
  }

static generatePlayerBoard(numberOfRows, numberOfColumns) {
      let board = [];
      for(let i=0; i < numberOfRows; i++){
        let row = [];

          for(let j=0; j <numberOfColumns; j++){
            row.push(' ');
        }
        board.push(row);

      }
      return board;

  }

static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      let board = [];
      for(let i=0; i < numberOfRows; i++){
        let row = [];
        for(let j=0; j <numberOfColumns; j++){
            row.push(null);
        }
      let numberOfBombsPlaced = 0;

      while (numberOfBombsPlaced < numberOfBombs ) {
      	//place bomb in random spot
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
          if (board[randomRowIndex][randomColumnIndex] === 'b') {

          } else {
            board[randomRowIndex][randomColumnIndex] = 'b';
            numberofBombsPlaced++;
          }
        }
      return board;
  }

}
}

let goodr = new Game(3, 3, 3);
goodr();
*/
