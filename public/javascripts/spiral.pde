float theta;
float max = 10;
float inputLength = 50;

void setup() {
  size(540, 540);
}

void draw() {
  background(0);
  frameRate(30);
  stroke(255);
  // inputlength =
  //pick an angle based on proximity to center later
  theta = radians(120);
  translate(height/2, width/2);
  noFill();
  stroke(255);
  //initial curves
  //inputLength is a line height, make this dynamic on user input
  for(int i = 0; i < 3; i++) {
    bezier(0,0, 0, inputLength, inputLength, inputLength, inputLength, inputLength);
    translate(inputLength, inputLength);
    recurse(inputLength);
    rotate(theta);
  }
}

void recurse(float length) {
  length *= .66;

  if(length > max) {
    for(int i = 0; i < 3; i++) {
      bezier(0,0, 0, length, length, length, length, length);
      translate(length, length);
      recurse(length);
      rotate(theta);
    }
  }
}
