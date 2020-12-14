
console.log("INITIALIZING PAPAJ COUNTER V0.1");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var img = document.getElementById("pope");
console.log(myCanvas.clientWidth + " x "+ myCanvas.clientHeight); // remember Canvas != image
ctx.drawImage(img, 0, 0);
var result = document.getElementById("result");
imgData = ctx.getImageData(0, 0, 45, 72); // EDIT SIZE FOR NEW IMAGE

getPixelData();

function getPixelData(){

    var tolerance = 20; // tolerance for slight differences in color data due to bad jpegs.

    var aRowBlocks = []; // ColorBlocks go into RowBlocks

    var aColorBlocks = [];

    for (var i = 0; i<imgData.data.length; i+=4){

        if (aColorBlocks.length == 0){
            aColorBlocks.push({"count":0, "red":imgData.data[0], "green":imgData.data[1], "blue":imgData.data[2]});
        }

        var pixelRed = imgData.data[i];
        var pixelGreen = imgData.data[i+1];
        var pixelBlue = imgData.data[i+2];

        var lastColorBlock = aColorBlocks[aColorBlocks.length-1];

        function diff (num1, num2) {
            if (num1 > num2) {
              return num1 - num2
                } else {
                return num2 - num1
            }
        }

        // console.log(`[CHECK] ${lastColorBlock.red} vs ${pixelRed} | tolerance: ${tolerance} | difference: ${Math.abs(lastColorBlock.red, pixelRed)}`);
        // console.log(`[CHECK] ${lastColorBlock.green} vs ${pixelGreen} | tolerance: ${tolerance} | difference: ${Math.abs(lastColorBlock.green, pixelGreen)}`);
        // console.log(`[CHECK] ${lastColorBlock.red} vs ${pixelBlue} | tolerance: ${tolerance} | difference: ${Math.abs(lastColorBlock.blue, pixelBlue)}`);

        if (
            ((Math.abs(lastColorBlock.red - pixelRed)) < tolerance) && 
            ((Math.abs(lastColorBlock.green - pixelGreen)) < tolerance) && 
            ((Math.abs(lastColorBlock.blue - pixelBlue)) < tolerance)
        ){
            // console.log("SAME!");
            lastColorBlock.count++;

        } else {

            // different color
            // console.log("DIFFERENT!");
            var newColorBlock = {"count": 1, "red":pixelRed, "green":pixelGreen, "blue":pixelBlue};
            aColorBlocks.push(newColorBlock);

        }

        // restart at row length
        if (i%180==0){ // EDIT FOR NEW IMAGE: WIDTH * 4
            aRowBlocks.push(aColorBlocks);
            aColorBlocks = [{"count":0, "red":imgData.data[i], "green":imgData.data[i+1], "blue":imgData.data[i+2]}];
        }
       
    } // end of FOR LOOP

    // differentiating between blocks of code and blocks in Minecraft is slowly making me insane

    console.log("aRowBlocks:" + aRowBlocks.length);

    for (var i = 0; i < aRowBlocks.length; i++){

        var newRow = document.createElement("div");
        newRow.classList.add("row");

        var newInfoPixel = document.createElement("div");
        newInfoPixel.classList.add("infopixel");
        newInfoPixel.innerHTML = "row"+i;
        newRow.appendChild(newInfoPixel);


        var RowOfBlocks = aRowBlocks[i];

        RowOfBlocks.forEach(element => {
            console.log(element);
            var newChild = document.createElement("div");
            newChild.classList.add("pixel");
            newChild.style.backgroundColor = `rgb(${element.red}, ${element.green}, ${element.blue})`;
            newChild.innerHTML = element.count;
            newRow.appendChild(newChild);
        })

        result.appendChild(newRow);
    }
}