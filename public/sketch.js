var socket;
let X0,Y0;
let drawing=false;
let sc,sw;

function setup(){
  //socket = io.connect("http://localhost:3000");
  socket = io();
  socket.on('mousePressed',newDrawing);
  frameRate(500);
  createCanvas(200,200);
  background(51);
}

function draw(){

  if(drawing){
    console.log('sending'+mouseX+","+mouseY);

    if(keyIsDown(SHIFT)){
      sc=51; sw=20;
    } else {
      sc=255; sw=2;
    }

    let data = {
      X0:X0,
      Y0:Y0,
      X:mouseX,
      Y:mouseY,
      width:sw,
      col:sc
    }
    socket.emit('mousePressed',data)

    stroke(sc); strokeWeight(sw);
    line(X0,Y0,mouseX,mouseY);
    X0=mouseX; Y0=mouseY;
  }
}

function newDrawing(data){
  stroke(data.col); strokeWeight(data.width);
  line(data.X0,data.Y0,data.X,data.Y);
}

function mousePressed(){
  X0=mouseX;
  Y0=mouseY;
  drawing=true;
}

function mouseReleased(){
  drawing=false;
}
