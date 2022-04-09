// using rgb values to display an image
BW_hidden q;
Convert c;

PImage dog;
PImage qr;
PImage cqr;
PImage cdog;

void setup()
{
  dog = loadImage("../doggo.jpg");
  qr = loadImage("../SQR.png");
  size(640,635);
  
  // converting the qr image to pure black and white
  q = new BW_hidden(qr);
  cqr = q.convert();
  
  //converting the dog image to hide the qr image
  
  c = new Encode(dog, cqr);
  cdog = c.encode();
  
}

void draw()
{
  background(0);
  //image(dog,0,0);
  image(cdog,0,0);
}
