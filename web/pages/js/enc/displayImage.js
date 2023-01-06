var loadbaseimage = function(event) {
	var image = document.getElementById('base-image');
	image.src = URL.createObjectURL(event.target.files[0]);
};


var loadqrimage = function(event) {
	var image = document.getElementById('qr-image');
	if(document.getElementById("checkbox").checked == true)
	{
		image.src = URL.createObjectURL(event.target.files[0]);
	}
	else
	{
		let qrText = document.getElementById("qrText")
		let temp = new Image()
		// let image = document.getElementById('qr-image');
		if(event.target.value.length > 0)
		{
			var qrcode = new QRCode(temp, {
                width : 512,
                height : 512
            });
            function makeCode () {		
                if (!qrText.value) {
                    alert("Input a text");
                    // qrText.focus();
                    return;
                }
                qrcode.makeCode(qrText.value);
            }
            
            makeCode();
           	temp = temp.children[1];
			temp.onload = ()=>{
				image.src = temp.src
			}
		}
		// write the code to embed image when the source is text 
	}
	// console.log(event.target.files[0])
};

var switchInputforQR = function(event){
	let qrfile = document.getElementById('qrUpload');
	let qrtxt = document.getElementById('qrText');
	if(document.getElementById(event.target.id).checked == false){
		qrfile.value = "";
		qrfile.disabled = true;
		qrtxt.value = "";
		qrtxt.disabled = false;
	}
	else{
		qrfile.value = "";
		qrfile.disabled = false;
		qrtxt.value = "";
		qrtxt.disabled = true;
	}
}; 