var loadbaseimage = function(event) {
	var image = document.getElementById('base-image');
	image.src = URL.createObjectURL(event.target.files[0]);
};
var loadqrimage = function(event) {
	var image = document.getElementById('qr-image');
	image.src = URL.createObjectURL(event.target.files[0]);
	// console.log(event.target.files[0])
};