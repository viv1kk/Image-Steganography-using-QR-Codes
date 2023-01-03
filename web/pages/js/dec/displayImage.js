var loadstego = function(event) {
	var image = document.getElementById('stego-image');
	image.src = URL.createObjectURL(event.target.files[0]);
};
