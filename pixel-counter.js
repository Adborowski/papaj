console.log("INITIALIZING PAPAJ COUNTER");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var img = document.getElementById("pope");

canvas.width = img.naturalWidth;
canvas.height = img.naturalHeight;

console.log("IMAGE SIZE: "+ img.naturalWidth+ " x "+img.naturalHeight);
console.log("CANVAS SIZE: "+ canvas.width + " x "+ canvas.height);

ctx.drawImage(img, 0, 0);
var result = document.getElementById("result");
imgData = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight); // EDIT SIZE FOR NEW IMAGE

identifyLinesOfColor();

function identifyLinesOfColor(){

    var tolerance = 10; // tolerance for slight differences in color data due to bad jpegs.
    var aGroupedImageRows = [];
    var aBlocksOfColor = [];

    for (var i = 0; i<=imgData.data.length; i+=4){

        var pixelRed = imgData.data[i];
        var pixelGreen = imgData.data[i+1];
        var pixelBlue = imgData.data[i+2];

        var lastColorLine;

        if (aBlocksOfColor.length == 0){
            aBlocksOfColor.push({"count":0, "red":pixelRed, "green":pixelGreen, "blue":pixelBlue});
        } 
        
        lastColorLine = aBlocksOfColor[aBlocksOfColor.length-1];

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
            aBlocksOfColor.push(newColorLine);
            // console.log(newColorLine);
        }

        // restart at row length
        if (i%(img.naturalWidth*4)==0){
            aGroupedImageRows.push(aBlocksOfColor);
            aBlocksOfColor = [];
            // console.log(aBlocksOfColor);
        }
       
    } // end of FOR LOOP

    console.log("aGroupedImageRows:" + aGroupedImageRows.length);

    for (var i = 1; i < aGroupedImageRows.length; i++){ // how many rows

        var newRow = document.createElement("div");
        newRow.classList.add("row");

        // create infopixels with row numbers
        var newInfoPixel = document.createElement("div");
        newInfoPixel.classList.add("infopixel");
        newInfoPixel.innerHTML = "row "+i;
        newRow.appendChild(newInfoPixel);

        var RowOfBlocks = aGroupedImageRows[i];

        RowOfBlocks.forEach(element => {

            // console.log(RowOfBlocks);

            var newChild = document.createElement("div");
            newChild.classList.add("pixel");
            newChild.style.backgroundColor = `rgb(${element.red}, ${element.green}, ${element.blue})`;
            newChild.innerHTML = element.count;
            newRow.appendChild(newChild);

        })

        result.appendChild(newRow);
    }
}

