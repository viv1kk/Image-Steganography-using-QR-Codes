// using rgb values to display an image

import javax.swing.*;
BW_hidden q;
Encode e;
Decode d;

PImage dog;
PImage qr;
PImage cqr;
PImage edog;
PImage ddog;

int inp = 0;

void setup()
{
  size(1325,635);
  
  JFrame f = new JFrame();  
  String s = JOptionPane.showInputDialog(f,"1. Encode Image\n2.DecodeImage"); 
  inp = Integer.parseInt(s);
  
  
  if(inp == 1) // Encode image is selected
  {
    dog = loadImage("../doggo.jpg");
    qr = loadImage("../SQR.png");

    
    // converting the qr image to pure black and white
    q = new BW_hidden(qr);
    cqr = q.convert();

    //converting the dog image to hide the qr image
    e = new Encode(dog, cqr);
    edog = e.encode();
  }
  else
  {
    //size(1325,635);
    edog = loadImage("../encoded.png");
    d = new Decode(edog, edog.width,edog.height);   // size of the image is also needed to be specified to search for qr
    ddog = d.decode();
  }
}

void draw()
{
  background(0);
  if(inp == 1)
  {
    image(dog,670,0);
    image(qr,0,0);
  }
  else
  {
    image(edog,670,0);
    image(ddog,0,0);
  }
}
