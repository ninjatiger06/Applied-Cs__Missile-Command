function mouseClicked(event)
{
  mouseX = event.clientX;
  mouseY = event.clientY;

  launchMissile(mouseX, mouseY);
}

function launchMissile(x, y)
{
  if (allMissilesCleared == true) {
    return;
  }
  else {
    console.log("launchMissile()", x, y);
    userMissile = [windowWidth * (1/2), windowHeight * (31/32), x, y, 0, false, false];
    userList.append(userMissile)
    return;
  }
}

function drawAll()
{
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Create black background
  context.beginPath();
  context.rect(0, 0, windowWidth, windowHeight);
  context.fillStyle = "black";
  context.fill();

  context.beginPath()
  context.rect(windowWidth * (1/8), windowHeight * (15/16), windowWidth * (2/8), windowHeight * (1/8));
  context.fillStyle = "blue";
  context.fill();

  context.beginPath()
  context.rect(windowWidth * (7/16), windowHeight * (15/16), windowWidth * (2/16), windowHeight * (1/8));
  context.fillStyle = "red";
  context.fill();

  context.beginPath()
  context.rect(windowWidth * (5/8), windowHeight * (15/16), windowWidth * (2/8), windowHeight * (1/8));
  context.fillStyle = "blue";
  context.fill();

  colorList = ["blue", "red", "green", "yellow"]
  allMissilesCleared = true;
  for (i = 0; i < missileList.length; i++) {
    missileList[i][4] += 1;
    context.linewidth = 50;
    context.linecap = 'square';
    context.beginPath();
    context.moveTo(missileList[i][0], missileList[i][1]);

    missileY = missileList[i][1] + missileRate * missileList[i][4] * missileList[i][3]
    missileX = missileList[i][0] + missileRate * missileList[i][4] * (missileList[i][2] - missileList[i][0])

    context.lineTo(missileX, missileY);
    context.strokeStyle = colorList[i];
    context.stroke();

    checkCollision(i);

    if (missileY >= windowHeight) {
      missileList[i][5] = true;
    }

    if (missileList[i][5] == false && missileList[i][6] == false) {
      allMissilesCleared = false;
    }

    // console.log(allMissilesCleared);
  }

  if (allMissilesCleared == true) {
    console.log("Done");
    return;
  }

  window.requestAnimationFrame(drawAll);
}

function missilePoint() {
  var missile1 = [Math.random() * canvas.width, 0, Math.random() * canvas.width, canvas.height, 0, false, false];
  var missile2 = [Math.random() * canvas.width, 0, Math.random() * canvas.width, canvas.height, 0, false, false];
  var missile3 = [Math.random() * canvas.width, 0, Math.random() * canvas.width, canvas.height, 0, false, false];
  var missile4 = [Math.random() * canvas.width, 0, Math.random() * canvas.width, canvas.height, 0, false, false];
  var missilePointsList = [missile1, missile2, missile3, missile4];

  // console.log(missilePointsList);
  return missilePointsList;
}

// Get window width and height and log it
windowWidth = window.innerWidth;
windowHeight = window.innerHeight;
console.log("Window: %d x %d", windowWidth, windowHeight);

canvas = document.getElementById("mainCanvas");

// Make context
context = canvas.getContext("2d");

canvas.width = windowWidth - 40;
canvas.height = windowHeight - 20;
canvas.style.border = "1px solid black";

missileList = missilePoint();
var missileRate = 1/420;
var allMissilesCleared = true;

userList = [];
var userRate = 1/360;

document.addEventListener("click", mouseClicked);

// Make animationses
window.requestAnimationFrame(drawAll);
