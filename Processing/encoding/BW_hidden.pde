class BW_hidden
{
  PImage or;
  BW_hidden(PImage or)
  {
    this.or = or;
  }
  
  PImage convert()
  {
    PImage qr = createImage(or.width ,or.height, RGB);   

    for(int y = 0; y < or.height; y++)
    {
      for(int x = 0; x < or.width; x++)
      {
        int index = x + (y*or.width);
        int b = (int)brightness(or.pixels[index]);
        if (b  > 127)
          qr.pixels[index] = color(255);
        else
          qr.pixels[index] = color(0);
      }
    }
    return qr;
  }
}
