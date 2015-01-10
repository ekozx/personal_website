float theta;

void setup() {
  size(540, 540);
}

void draw() {
  background(0);
  frameRate(30);
  stroke(255);
  //pick an angle based on proximity to center later
  theta = radians(30);
  translate(height/2, width/2);

  noFill();
  stroke(255);
  //initial curves
  bezier(0,0, 0, 50, 50, 50, 50, 50);
  bezier(0,0, 0, -50, -50, -50, -50, -50);
  bezier(0,0, -50, 0, -50, 50, -50, 50);
  bezier(0,0, 50, 0, 50, -50, 50, -50);
}
