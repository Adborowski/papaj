window.onload = function() {

    console.log("INITIALIZING PAPAJ COUNTER V0.1");
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("pope");
    ctx.drawImage(img, 0, 0);
    imgData = ctx.getImageData(0, 0, 100, 100);
    
}

function imageLoaded(){
  
  var aRows = createRowsArray();
  console.log("There are "+aRows.length + " pixel rows");

  var rowCount = 0;
  var blockArray = []

  aRows.forEach(function(aRow){

    var starterRowBlock = {"row":rowCount, "count": 1, "red":aRow[0].red, "green":aRow[0].green, "blue":aRow[0].blue}; 
    blockArray.push(starterRowBlock);

    aRow.forEach(function(oColor){

        var lastCheckedBlock = blockArray[blockArray.length-1];

        if (oColor.red == lastCheckedBlock.red && oColor.green == lastCheckedBlock.green && oColor.blue == lastCheckedBlock.blue){
            console.log("SAME");
            lastCheckedBlock.count++
        } else {
            console.log("DIFFERENT");
            var newBlock = {"row":rowCount, "count": 1, "red":oColor.red, "green":oColor.green, "blue":oColor.blue}
            blockArray.push(newBlock);
        }

    }) // end of aRow.forEach

  }) // end of aRows.foreach

  console.log(blockArray);

};

function createRowsArray(){

    var aRows = [];

    console.log(`IMAGE SIZE: ${image.getWidth()} x ${image.getHeight()}`);

    for (var y=0; y<image.getHeight(); y++){ // for each row?

        var aRow = [];       

        // console.log("ROW: "+y);

        for (var x = 0; x<image.getWidth(); x++){ // inside each row, for each pixel...

            var oColor = {}

            var red = image.getIntComponent0(x,y);
            var green = image.getIntComponent1(x,y);
            var blue = image.getIntComponent2(x,y);

            oColor.red=red;
            oColor.green=green;
            oColor.blue=blue;

            aRow.push(oColor);
        }

        aRows.push(aRow);
        
    }

    return aRows;

};

