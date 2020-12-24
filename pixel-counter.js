console.log("INITIALIZING PAPAJ COUNTER V2.0");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var img = document.getElementById("pope");

console.log("IMAGE SIZE: "+ img.naturalWidth+ " x "+img.naturalHeight);
console.log(myCanvas.clientWidth + " x "+ myCanvas.clientHeight); // remember Canvas != image

ctx.drawImage(img, 0, 0);
var result = document.getElementById("result");
imgData = ctx.getImageData(0, 0, 43, 71); // EDIT SIZE FOR NEW IMAGE

identifyLinesOfColor();

function identifyLinesOfColor(){

    var tolerance = 20; // tolerance for slight differences in color data due to bad jpegs.
    var aRowBlocks = []; // ColorBlocks go into RowBlocks
    var aColorLines = [];

    for (var i = 0; i<=imgData.data.length; i+=4){

        var pixelRed = imgData.data[i];
        var pixelGreen = imgData.data[i+1];
        var pixelBlue = imgData.data[i+2];

        var lastColorLine;

        if (aColorLines.length == 0){
            aColorLines.push({"count":0, "red":pixelRed, "green":pixelGreen, "blue":pixelBlue});
        } 
        
        lastColorLine = aColorLines[aColorLines.length-1];

        if ( // if the pixel in question is the same as the previous pixel
                (Math.abs(lastColorLine.red - pixelRed) < tolerance) && 
                (Math.abs(lastColorLine.green - pixelGreen) < tolerance) && 
                (Math.abs(lastColorLine.blue - pixelBlue) < tolerance)
            ){
            // console.log("SAME!");
            lastColorLine.count++;

        } else {

            // console.log("DIFFERENT!");
            var newColorLine = {"count": 1, "red":pixelRed, "green":pixelGreen, "blue":pixelBlue};
            aColorLines.push(newColorLine);

        }

        // restart at row length
        if (i%(img.naturalWidth*4)==0){
            aRowBlocks.push(aColorLines);
            aColorLines = [];
        }
       
    } // end of FOR LOOP

    console.log("aRowBlocks:" + aRowBlocks.length);

    // from now on we only handle infopixels
    for (var i = 1; i < aRowBlocks.length; i++){ // how many rows

        var newRow = document.createElement("div");
        newRow.classList.add("row");

        // create infopixels with row numbers
        var newInfoPixel = document.createElement("div");
        newInfoPixel.classList.add("infopixel");
        newInfoPixel.innerHTML = "row "+i;
        newRow.appendChild(newInfoPixel);

        var RowOfBlocks = aRowBlocks[i];

        RowOfBlocks.forEach(element => {

            console.log(RowOfBlocks);
            if (RowOfBlocks.count == 0){console.log("empty")};
            var newChild = document.createElement("div");
            newChild.classList.add("pixel");
            newChild.style.backgroundColor = `rgb(${element.red}, ${element.green}, ${element.blue})`;
            newChild.innerHTML = element.count;
            newRow.appendChild(newChild);

        })

        result.appendChild(newRow);
    }
}

