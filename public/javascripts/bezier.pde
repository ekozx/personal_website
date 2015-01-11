boolean dragged = false;
boolean started = false;
Audio audio = new Audio();
float speed = 1.0;
float vol = 1.0;
String fileExt = ".wav";
float value = 0;
float value_2 = 0;

void setup() {
  size( 540, 540 );
  audio.setAttribute("src","../audio/beat1" + fileExt);
  noLoop();
}

void draw() {
  if(!started) {
    vol -= .1;
  }
  audio.volume=constrain(vol,0,1);
  audio.playbackRate = speed;
  if(dragged) {
    fill(100*speed,100*speed,100*speed, 25*speed);
  } else {
    fill(0, 0, 0, 25);
  }
  rect(0, 0, 600, 600);
  float rn = random(-500, 500);
  stroke(rn, 100, 200, 200);
  noFill();
  bezier(0, 300, 200+value_2, 300+value, 200, 300+value, 300, 300);
  bezier(300, 300, 400+value_2, 300-value, 400, 300-value, 600, 300);
}

void mouseMoved() {
  speed = map(mouseY, 0, height, 0, 2);
  value = mouseY - 300;
  redraw();
}

void mouseDragged() {
  dragged = true;
  value = mouseY - 300;
  value_2 = mouseX;
  redraw();
}

void mouseReleased() {
  dragged = false;
}

void repeat(){
  audio.play();
}

void mouseClicked() {
  if(!started) {
    vol = 1.0;
    println("You started audio on the bezier sine project.");
    audio.volume = vol;
    audio.play();
    audio.addEventListener("ended", repeat);
    started = true;
  } else {
    println("You stopped sudio on the bezier sine project.");
    started = false;
  }
}
