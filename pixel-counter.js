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

analyzeImage();

function sumCounts(row){

    var sumCounts = 0;
    row.forEach(block => {
        sumCounts = sumCounts + block.count;
    })
    return sumCounts;

}

function analyzeImage(){

    var tolerance = 10; // tolerance for slight differences in color data due to bad jpegs.
    var aGroupedImageRows = [];
    var aBlocksOfColor = [];

    for (var i = 0; i<imgData.data.length; i+=4){

        var pixelRed = imgData.data[i];
        var pixelGreen = imgData.data[i+1];
        var pixelBlue = imgData.data[i+2];

        if (aBlocksOfColor.length == 0){
            aBlocksOfColor.push({"count":0, "red":pixelRed, "green":pixelGreen, "blue":pixelBlue, "flag": "start"});
        }

        var lastColorBlock = aBlocksOfColor[aBlocksOfColor.length-1];
        
        if ( // if the pixel in question is the same as the previous pixel
                (Math.abs(lastColorBlock.red - pixelRed) < tolerance) && 
                (Math.abs(lastColorBlock.green - pixelGreen) < tolerance) && 
                (Math.abs(lastColorBlock.blue - pixelBlue) < tolerance)
            ){
            // console.log("SAME!");
            lastColorBlock.count++;

        } else {

            // console.log("DIFFERENT!");
            var newColorBlock = {"count": 1, "red":pixelRed, "green":pixelGreen, "blue":pixelBlue, "flag":"diff"};
            aBlocksOfColor.push(newColorBlock);
        }

        // restart at row length
        if (i%(img.naturalWidth*4)==((img.naturalWidth*4)-4)){
            aGroupedImageRows.push(aBlocksOfColor);
            aBlocksOfColor = [];
            console.log(aBlocksOfColor);
        }
       
    } // end of FOR LOOP

    console.log("aGroupedImageRows:" + aGroupedImageRows.length);
    console.log(aGroupedImageRows);

    for (var i = 0; i < aGroupedImageRows.length; i++){ // how many rows

        var newRow = document.createElement("div");
        newRow.classList.add("row");

        // create infopixels with row numbers
        var newInfoPixel = document.createElement("div");
        newInfoPixel.classList.add("infopixel");
        newInfoPixel.innerHTML = "row "+(i+1);
        newRow.appendChild(newInfoPixel);

        var groupedImageRow = aGroupedImageRows[i];

        groupedImageRow.forEach(colorBlock => {

            var newChild = document.createElement("div");
            newChild.classList.add("pixel");
            newChild.style.backgroundColor = `rgb(${colorBlock.red}, ${colorBlock.green}, ${colorBlock.blue})`;
            newChild.innerHTML = colorBlock.count;
            newRow.appendChild(newChild);

        })

        result.appendChild(newRow);
    }
}

