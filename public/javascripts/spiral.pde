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
  //Set the length of the drawings based on the distance between the mouse and the center
  x = abs(mouseX - width/2);
  y = abs(mouseY - height/2);
  inputLength = ( constrain(x, 0, 120) + constrain(y, 0, 120) ) / 2;
  theta = radians(120);
  translate(height/2, width/2);
  noFill();
  stroke(255);
  //Draw the 3 initial curves
  for(int i = 0; i < 3; i++) {
    bezier(0,0, 0, inputLength, inputLength, inputLength, inputLength, inputLength);
    translate(inputLength, inputLength);
    recurse(inputLength);
    translate(-inputLength, -inputLength);
    //Change the angle for a new curve
    rotate(theta);
  }
}

void recurse(float length) {
  //Decrease the length of the curve, this impacts the number of calls
  //and thus seriously impacts the performance, if the project
  //doesn't work on your computer, this number is likely why
  length *= .66;
  //Our stopping point is defined at lowerBound
  if(length > lowerBound) {
    //Create 3 more branche curves based on length
    for(int i = 0; i < 3; i++) {
      bezier(0,0, 0, length, length, length, length, length);
      //"move" the screen to each curve
      translate(length, length);
      //Creates an entire branch
      recurse(length);
      //Change location to the next branch
      translate(-length, -length);
      //Rotate to the next curve
      rotate(theta);
    }
  }
}
