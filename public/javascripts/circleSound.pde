//make a new HTML5 audio object named audio
Audio audio = new Audio();
// make string that will house the audio extension
String fileExt = ".wav";

//make a variable for volume and set it to 0
//(volume runs between 0 and 1)
float vol=0;
bool fadeOut=false;

int col=0;

void setup(){
  size(300,300);
  noStroke();

  //this checks to see what type of audio the browser can play
  //then assigns that file extension to our string
  // if (audio.canPlayType && audio.canPlayType("audio/ogg")) {
  //   fileExt = ".wav";
  // }
  // else {
  //   fileExt = ".mp3";
  // }
  //loads the audio file and appends the file extension
  audio.setAttribute("src","../audio/beat1" + fileExt);
  //this adds a listener to see when the file has finished playing
  //then calls a function that we named "repeat"
  audio.addEventListener("ended",repeat);
  //play the audio
  audio.play();
}

void draw() {
  background(220);
  //constrain the R value between 0 and 255
  fill(constrain(col,0,255),0,0);
  ellipse(width/2,height/2,150,150);

  //constrain the audio level between 0 and 1
  audio.volume=constrain(vol,0,1);
  //fade the volume and color out at the same rate
  if (fadeOut){
    vol-=.1;
    col-=25;
  }
}

void mousePressed(){
  //if mouse pressed within circle stop fadeout, turn volume up, and set color to red
  if (dist(mouseX,mouseY,width/2,height/2)<150/2){
    fadeOut=false;
    vol=1;
    col=255;
  }
}

void mouseReleased(){
  //turn fadeout on
  fadeOut=true;
}

//function called by the event listener when audio tracks ends
//that loops the track
void repeat(){
  audio.play();
}
