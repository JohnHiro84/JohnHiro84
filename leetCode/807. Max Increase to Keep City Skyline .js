
var maxIncreaseKeepingSkyline = function(grid){
  let sum = 0;
  for(i in grid){
    let yGreat;
    let xGreat = Math.max.apply(0, grid[i]);
    for(j in grid[i]){
      yGreat = 0;
      for(x in grid){
        yGreat = Math.max(yGreat, grid[x][j]);
      }
      sum = sum + Math.abs(Math.min(xGreat, yGreat) - grid[i][j]);
    }
  }
  return sum;
}
