let baseImageFile = document.getElementById('baseUpload');
let qrImageFile = document.getElementById('qrUpload');
let stegoImage = document.getElementById('stego-image');


function checkUploads()
{
    if(baseImageFile.files.length <= 0 || qrImageFile.files.length <= 0)
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



// this function makes the qr image pure black and white
function makeBW(qrData)
{
    for(let i = 0; i < qrData.height; i++)
    {
        for(let j = 0; j < qrData.width; j++)
        {
            let indQ = (i*qrData.width*4)+(j*4);

            let r = (qrData.data[indQ]);
            let g = (qrData.data[indQ+1]);
            let b = (qrData.data[indQ+2]);

            if(((r+g+b)/3) > 127)
            {
                qrData.data[indQ] = 255;
                qrData.data[indQ+1] = 255;
                qrData.data[indQ+2] = 255;
            }
            else{
                qrData.data[indQ] = 0;
                qrData.data[indQ+1] = 0;
                qrData.data[indQ+2] = 0;
            }
        }
    }
    return qrData;
}


function writeInfo(id, data)
{
    let s = document.getElementById(id);
    s.innerText = "Resolution : "+data.width+" * "+data.height;
}

function saveQRRes(baseData, s)
{
    for(let j = baseData.width-1; j >= baseData.width-1-9 ; j--)
    {
        let indB = ((baseData.height-1)*baseData.width*4)+(j*4);
        let bqr = s;
        let r = baseData.data[indB];
        let g = baseData.data[indB+1];
        let b = baseData.data[indB+2];
        console.log(s%2)
        // make odd
        if(bqr%2 == 1)
        {
            if((r+g+b)%2 == 0) 
            {
                if(r == 0)
                    baseData.data[indB] += 1; // red value increment by 1 if equal to 0
                else
                    baseData.data[indB] -= 1; // red value decrement by 1 if smaller than 255
            }
        }
        else //make even
        {
            if((r+g+b)%2 == 1) 
            {
                if(r == 255)
                    baseData.data[indB] -= 1; // red value decrement by 1 if equal to 0
                else
                    baseData.data[indB] += 1; // red value increment by 1 if smaller than 255
            }
        }
        s = Math.floor(s/2);
    }
    return baseData;
}




function bothReady(baseData, qrData)
{
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    
    baseData = baseData.data;
    qrData = qrData.data

    canvas.width = baseData.width;
    canvas.height = baseData.height;
    qrData = makeBW(qrData);
    // console.log(findSquareSize(qrData));

    writeInfo("base-info", baseData)
    writeInfo("qr-info", qrData)
    
    for(let i = 0; i < baseData.height; i++)
    {
        if(i < qrData.height)
        {
            for(let j = 0; j < baseData.width; j++)
            {
                if(j < qrData.width)
                {
                    let indB = (i*baseData.width*4)+(j*4);
                    let indQ = (i*qrData.width*4)+(j*4);

                    let bqr = (qrData.data[indQ]+qrData.data[indQ+1]+qrData.data[indQ+2])/3;

                    let r = baseData.data[indB];
                    let g = baseData.data[indB+1];
                    let b = baseData.data[indB+2];

                    // make odd
                    if(bqr%2 == 1)
                    {
                        if((r+g+b)%2 == 0) 
                        {
                            if(r == 0)
                                baseData.data[indB] += 1; // red value increment by 1 if equal to 0
                            else
                                baseData.data[indB] -= 1; // red value decrement by 1 if smaller than 255
                        }
                    }
                    else //make even
                    {
                        if((r+g+b)%2 == 1) 
                        {
                            if(r == 255)
                                baseData.data[indB] -= 1; // red value decrement by 1 if equal to 0
                            else
                                baseData.data[indB] += 1; // red value increment by 1 if smaller than 255
                        }
                    }
                }
            }
        }
    }

    baseData = saveQRRes(baseData, qrData.width);

    // decodedImage(baseData);
    ctx.putImageData(baseData, 0, 0);
    var img = canvas.toDataURL("image/png");
    stegoImage.src = img
    
}


let downloadImage = function(event){
    let path = stegoImage.getAttribute('src');
    let fn = getFileName(path);
    saveAs(path, fn);
};
function getFileName(str){
    return str.substring(str.lastIndexOf('/')+1);
}

let encodeHandler = function(event){
    if (checkUploads()) {
        // storing the images 
        let baseImage = baseImageFile.files[0];
        let qrImage = qrImageFile.files[0];

        //image src
        baseImage = URL.createObjectURL(baseImage);
        qrImage = URL.createObjectURL(qrImage);


        var baseImageObj = new Image();
        baseImageObj.src = baseImage;

        var qrImageObj = new Image();
        qrImageObj.src = qrImage;

        console.log(baseImageObj)

        // draw the 2 images in canvas - it will not be displayed 
        // var canvas = document.getElementById("myCanvas")

        let baseImageData = {ready : 0}, qrImageData = {ready:0};

        qrImageObj.onload = ()=>{
            qrImageData.data = getImageData(qrImageObj);
            qrImageData.ready = 1;
            if(baseImageData.ready == 1)
                bothReady(baseImageData, qrImageData)
        }

        baseImageObj.onload = ()=>{
            baseImageData.data = getImageData(baseImageObj);
            baseImageData.ready = 1;
            if(qrImageData.ready == 1)
                bothReady(baseImageData, qrImageData)
        }
    }
};
