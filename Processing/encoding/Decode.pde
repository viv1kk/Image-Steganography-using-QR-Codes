class Decode
{
  PImage dog;
  int w, h;
  
  Decode(PImage dog, int w, int h)
  {
    this.dog = dog;
    this.w = w;
    this.h = h;
  }
  
  PImage decode()
  {
    PImage img = createImage(w, h, RGB); 
    for(int y = 0; y < h; y++)
    {
      for(int x = 0; x < w; x++)
      {
        color d1 = dog.get(x,y);
        
        int r = (int) red(d1);
        int g = (int) green(d1);
        int b = (int) blue(d1);
        
        if((r+g+b)%2 == 0)
          img.set(x,y,color(0));
        else
          img.set(x,y, color(255));
      }
    }
    return img;
  }
}
