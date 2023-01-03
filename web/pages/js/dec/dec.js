let stegoImageFile = document.getElementById('stegoUpload');


function checkUploads()
{
    if(stegoImageFile.files.length <= 0)
    {
        alert("First upload the images dumbass!!!!!!")
        return false;
    }
    return true;
}

function getImageData(image)
{
    // creating a virtual canvas
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    //setting the size of canvas to image size
    canvas.width = image.width;
    canvas.height = image.height;

    //drawing the image on canvas
    ctx.drawImage(image, 0, 0);

    // getting the image pixel data object 
    let ImageData = ctx.getImageData(0,0, image.width, image.height);

    //converting the canvas to image
    // var img = canvas.toDataURL("image/png");
    // stegoImage.src = img

    return ImageData;
}


function writeInfo(id, data)
{
    let s = document.getElementById(id);
    s.innerText = "Resolution : "+data.width+" * "+data.height;
}


function extractSize(stegoData){
    let s = 0;
    let count = 0;
    for(let j = stegoData.width-1; j >= stegoData.width-1-9 ; j--)
    {
        let indB = ((stegoData.height-1)*stegoData.width*4)+(j*4);
        // let bqr = s%2;
        let r = stegoData.data[indB];
        let g = stegoData.data[indB+1];
        let b = stegoData.data[indB+2];

        if((r+g+b)%2 == 1)
        {
            s = s + Math.pow(2, count);
        }
        count++;
    }
    return s;
}


function extractHiddenQR(stegoData)
{
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    let qrside = extractSize(stegoData);

    
    canvas.width = qrside;
    canvas.height = qrside;

    // canvas.width = stegoData.width;
    // canvas.height = stegoData.height;
    
    writeInfo("stego-info", stegoData);
    

    for(let i = 0; i < stegoData.height; i++)
    {
        for(let j = 0; j < stegoData.width; j++)
        {
            // color d1 = dog.get(x,y);
            let indB = (i*stegoData.width*4)+(j*4);
            let r = stegoData.data[indB]; 
            let g = stegoData.data[indB+1]; 
            let b = stegoData.data[indB+2]; 
            
            if((r+g+b)%2 == 0)
            {
                stegoData.data[indB] = 0;
                stegoData.data[indB+1] = 0;
                stegoData.data[indB+2] = 0;
            }
            else
            {
                stegoData.data[indB] = 255;
                stegoData.data[indB+1] = 255;
                stegoData.data[indB+2] = 255;
            }
      }
    }
    ctx.putImageData(stegoData, 0, 0);
    let img = canvas.toDataURL("image/png");
    return img;
    // stegoImage.src = img
}

let decodeHandler = function(event){
    if(checkUploads()){
        let stegoImage = stegoImageFile.files[0];
        stegoImage = URL.createObjectURL(stegoImage);

        let stegoImageObj = new Image();
        stegoImageObj.src = stegoImage;

        stegoImageObj.onload = ()=>{
            stegoImageObj = getImageData(stegoImageObj);

            let baseImage = document.getElementById('base-image');
            let qrImage = document.getElementById('qr-image');

            baseImage.src = stegoImage;
            qrImage.src = extractHiddenQR(stegoImageObj);

        };
    }
};

let downloadImage = function(event){
    let qrImage = document.getElementById('qr-image');
    let path = qrImage.getAttribute('src');
    let fn = getFileName(path);
    saveAs(path, fn);
};
function getFileName(str){
    return str.substring(str.lastIndexOf('/')+1);
}