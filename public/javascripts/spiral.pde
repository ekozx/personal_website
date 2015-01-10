float theta;
float lowerBound = 10;
float inputLength;
float x;
float y;

void setup() {
  size(540, 540);
}

void draw() {
  background(0);
  frameRate(20);
  stroke(255);
  x = abs(mouseX - width/2);
  y = abs(mouseY - height/2);
  inputLength = ( constrain(x, 0, 120) + constrain(y, 0, 120) ) / 2;
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

  if(length > lowerBound) {
    for(int i = 0; i < 3; i++) {
      bezier(0,0, 0, length, length, length, length, length);
      translate(length, length);
      recurse(length);
      rotate(theta);
    }
  }
}
