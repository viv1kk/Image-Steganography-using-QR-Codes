// using rgb values to display an image
BW_hidden q;
Encode e;
Decode d;

PImage dog;
PImage qr;
PImage cqr;
PImage edog;

PImage ddog;

void setup()
{
  dog = loadImage("../doggo.jpg");
  qr = loadImage("../SQR.png");
  size(1325,635);
  
  // converting the qr image to pure black and white
  q = new BW_hidden(qr);
  cqr = q.convert();
  
  //converting the dog image to hide the qr image
  
  e = new Encode(dog, cqr);
  edog = e.encode();
  
  d = new Decode(edog, dog.width,dog.height);   // size of the image is also needed to be specified to search for qr
  ddog = d.decode();
}

void draw()
{
  background(0);
  image(edog,670,0);
  image(ddog,0,0);
}
