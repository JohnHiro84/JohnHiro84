 export class Board {
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
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);

    this._numberOfTiles--;
  }
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex) {

      let neighborOffsets = [[-1,-1],[-1,0 ],[-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]];
      let numberOfRows = this._bombBoard.length;
      let numberOfColumns = this._bombBoard[0].length;
      let numberOfBombs = 0;

      neighborOffsets.forEach(offset => {
        let neighborRowIndex = rowIndex + offset[0];
        let neighborColumnIndex = columnIndex + offset[1];

      //make sure the neighbors are on the board, not on the outskirts
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >=0 && neighborColumnIndex < numberOfColumns){
          if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === "b"){
            //for a clicked tile return the number of neighboring bombs
            numberOfBombs++;
          }
        }
    });
    return numberOfBombs;
  }


  hasSafeTiles() {
   return(this.numberOfTiles === this.numberOfBombs);
   //add the underscore here
 }

  print() {
    console.log("Current Board after:");


    this._newboard = this._playerBoard.map(row => row.join(" | "));
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
        board.push(row);
      }
      let numberOfBombsPlaced = 0;

      while (numberOfBombsPlaced < numberOfBombs ) {
      	//place bomb in random spot
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
          if (board[randomRowIndex][randomColumnIndex] === 'b') {
            console.log("");
          } else {
            board[randomRowIndex][randomColumnIndex] = 'b';
            numberOfBombsPlaced++;
          }
        }
      return board;
  }

}
