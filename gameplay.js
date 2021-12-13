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
    // userMissile = [startingX, startingY, endingX, endingY, lol idk, missileReachedDestination, missileCollided, blastRadius, frameCounter, frameMaxReached]
    userMissile = [windowWidth * (1/2), windowHeight * (31/32), x, y, 0, false, false, 1, 0, false];
    userList.push(userMissile);
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

  colorList = ["blue", "red", "green", "yellow", "orange", "purple", "white"]
  allMissilesCleared = true;
  for (i = 0; i < missileList.length; i++) {
    missileList[i][4] += 1;
    context.linewidth = 50;
    context.linecap = 'round';
    context.beginPath();
    context.moveTo(missileList[i][0], missileList[i][1]);

    if (missileList[i][5] == false) {
      missileY = missileList[i][1] + missileRate * missileList[i][4] * missileList[i][3];
      missileX = missileList[i][0] + missileRate * missileList[i][4] * (missileList[i][2] - missileList[i][0]);
    }

    context.lineTo(missileX, missileY);
    context.strokeStyle = colorList[i];
    context.stroke();

    checkCollision(i, "ground");

    if (missileY >= windowHeight) {
      missileList[i][5] = true;
    }

    if (missileList[i][5] == false && missileList[i][6] == false) {
      allMissilesCleared = false;
    }

    // console.log(allMissilesCleared);
  }

  if (userList.length > 0) {
    for (i = 0; i <userList.length; i++) {
      userList[i][4] += 1;
      context.linewidth = 50;
      context.linecap = 'round';
      context.beginPath();
      context.moveTo(userList[i][0], userList[i][1]);

      if (userList[i][5] == false) {
        userX = userList[i][0] + userRate * userList[i][4] * (userList[i][2] - userList[i][0]);
        userY = userList[i][1] + userRate * userList[i][4] * (userList[i][3] - userList[i][1]);
    }

    else if (userList[i][5] == true) {
      userX = userList[i][2];
      userY = userList[i][3];
      checkCollision(userList[i], "missile");
    }

      context.lineTo(userX, userY);
      context.strokeStyle = "white";
      context.stroke();

      if (userX == userList[i][2] && userY == userList[i][3]) {
        userList[i][5] = true;
        console.log("user %d landed", i);
        console.log(userList[i][8], userList[i][9]);

        context.beginPath();
        context.arc(userX, userY, userList[i][7], 0*Math.PI, 2*Math.PI)
        // console.log(userX, userY);
        context.strokeStyle = "white";
        context.stroke();

        if (userList[i][8] == 120) {
          userList[i][9] = true;
        }

        else if (userList[i][8] == 0 && userList[i][9] == true) {
          userList[i][9] == false;
        }

        if (userList[i][8] % 4 == 0 && userList[i][9] == false) {
          userList[i][7] += 1;
        }

        else if (userList[i][8] % 3 ==0 && userList[i][9] == true) {
          userList[i][7] -= 1;
          if (userList[i][7] < 0) {
            userList[i][7] = 0;
          }
        }

        userList[i][8] += 1;
      }
    }
  }

  if (allMissilesCleared == true) {
    console.log("Done");
    return;
  }

  window.requestAnimationFrame(drawAll);
}

function checkCollision(item, target) {
  if (target == "ground") {
    // console.log(missileList[i][4], windowHeight * (15/16))
    if (missileY >= windowHeight * (15/16) && missileX >= windowWidth * (1/8) && missileX <= windowWidth * (3/8)) {
      console.log("Missile %d landed!", item);
      // console.log(missileList);
      missileList[i][6] = true;
    }
    else if (missileY >= windowHeight * (15/16) && missileX >= windowWidth * (7/16) && missileX <= windowWidth * (9/16)) {
      console.log("Missile %d landed!", item);
      // console.log(missileList);
      missileList[i][6] = true;
    }
    else if (missileY >= windowHeight * (15/16) && missileX >= windowWidth * (5/8) && missileX <= windowWidth * (7/8)) {
      console.log("Missile %d landed!", item);
      // console.log(missileList);
      missileList[i][6] = true;
    }
  }
  else if (target == "missile") {
    for (i = 0; i < missileList.length; i++) {
      if (item[2] == missileList[i][2] && item[3] == missileList[i][3]) {
        missileList[i][7] == true;
      }
    }
  }
}

function missilePoint() {
  // [starting x, starting y, ending x, ending y, landed, on target, has been hit]
  var missile1 = [Math.random() * canvas.width, 0, Math.random() * canvas.width, canvas.height, 0, false, false, false];
  var missile2 = [Math.random() * canvas.width, 0, Math.random() * canvas.width, canvas.height, 0, false, false, false];
  var missile3 = [Math.random() * canvas.width, 0, Math.random() * canvas.width, canvas.height, 0, false, false, false];
  var missile4 = [Math.random() * canvas.width, 0, Math.random() * canvas.width, canvas.height, 0, false, false, false];
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
var missileRate = 1/630;
var allMissilesCleared = true;

userList = [];
var userRate = 1/210;

document.addEventListener("click", mouseClicked);

// Make animationses
window.requestAnimationFrame(drawAll);
