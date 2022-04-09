class Encode
{
  PImage dog;
  PImage qr;
  Encode(PImage dog, PImage qr)
  {
    this.dog = dog;
    this.qr = qr;
  }
  
  PImage encode()
  {
    PImage c = createImage(dog.width ,dog.height, RGB); 
    
    for(int y = 0; y < c.height; y++)
    {
      for(int x = 0; x < c.width; x++)
      {
        color q1 = qr.get(x,y);
        color d1 = dog.get(x,y);
        
        int bqr = (int) brightness(q1);
        
        int r = (int) red(d1);
        int g = (int) green(d1);
        int b = (int) blue(d1);
        
        if(x < qr.width && y < qr.height)
        {          
          //c.set(x,y,color((int)red(c1),(int)blue(c1),(int)green(c1)));
          
         //make odd
          if(bqr%2 == 1)
          {
            if((r+g+b)%2 == 0) 
            {
              if(r == 0)
              {
                c.set(x, y, color(r+1, g, b)); // red value increment by 1 if equal to 0
              }
              else
              {
                 c.set(x, y, color(r-1, g, b)); // red value decrement by 1 if smaller than 255
              }
            }
            else
            {
              c.set(x, y, color(r, g, b));
            }
            
          }
            //make even
          else
          {
            if((r+g+b)%2 == 1) 
            {
              if(r == 255)
              {
                c.set(x, y, color(r-1, g, b)); // red value decrement by 1 if equal to 0
              }
              else
              {
                 c.set(x, y, color(r+1, g, b)); // red value increment by 1 if smaller than 255
              }
            }
            else
            {
              c.set(x, y, color(r, g, b));
            }
          }
        }
        else
        {
          c.set(x, y, color(r, g, b));
        }        
      } 
    }
    return c;
  }
}
