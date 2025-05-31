let n= 10
let ccolor = 'green'
let mcolor = 'blue'

function draw() {
  const length = 1000 // le côté du canvas
  let squaresPerSide = 0
  
  let num = document.getElementById("num");
  num.innerHTML = n;

  if ((Math.floor(Math.sqrt(n))+1)%2){ // si la quantité est impaire on le garde comme ça 
    squaresPerSide = Math.floor(Math.sqrt(n))+1
  }else{// sinon on le rends impair
    squaresPerSide = Math.floor(Math.sqrt(n))+2
  }
  const squareSize = length/squaresPerSide
  
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = ccolor;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < squaresPerSide; i++) {
      for (let j = 0; j < squaresPerSide; j++) {
        ctx.strokeRect(i * squareSize, j * squareSize, squareSize, squareSize);
      }
    }
    x = Math.floor(squaresPerSide/2)
    y = Math.floor(squaresPerSide/2)
    ctx.strokeStyle = mcolor;
    ctx.lineWidth = 5;
    ctx.strokeRect(x * squareSize, y * squareSize, squareSize, squareSize);
    ctx.lineWidth=1;
    ctx.strokeStyle = "black";

    ctx.fillStyle = ccolor;
     // Déplacement en spirale
    let dx = 1, dy = 0;
    let steps = 1; // nombre d'étapes avant de tourner
    let stepCount = 0;
    let turnCount = 0;
    let largeurMax = 8

    for (let num = 1; num <= n; num++) {

      const px = x * squareSize + squareSize / 2- largeurMax/2;
      const py = y * squareSize + squareSize / 2+ largeurMax/2;
      
      //ctx.fillText(num.toString(), px, py);
      result = is_prime(num)
      if (result){
        ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
      }

      if(num==n){
        ctx.strokeStyle = mcolor;
        ctx.lineWidth = 5;
        ctx.strokeRect(x * squareSize, y * squareSize, squareSize, squareSize);
        ctx.lineWidth=1;
        ctx.strokeStyle = "black";
      }

      x += dx;
      y += dy;
      stepCount++;

      if (stepCount === steps) {
        stepCount = 0;
        turnCount++;
        // Tourner à gauche : (dx, dy) => (-dy, dx)
        [dx, dy] = [dy, -dx];

        // Tous les deux virages, on augmente le nombre d'étapes
        if (turnCount % 2 === 0) {
          steps++;
        }
      }

    }

        x = Math.floor(squaresPerSide/2)
    y = Math.floor(squaresPerSide/2)

    
  }

 
}

function setParams(event){
    event.preventDefault()
    ccolor = document.getElementById("ccolor").value;
    mcolor = document.getElementById("mcolor").value;
    number = document.getElementById("number").value;
    // settings variables
    n= number;
    ccolor = ccolor;
    mcolor = mcolor;
    draw();
}

function is_prime(n){
    if(n==1){
        return false
    }
    for (let index = 2; index <= Math.floor(Math.sqrt(n)); index++) {
        if ((n%index)== 0 ) { // n est divisible par index
            return false
        }
    }
    return true
}

function exportToPNG() {
  const canvas = document.getElementById("canvas");
  const link = document.createElement("a");
  link.download = "ulam.png"; // nom du fichier
  link.href = canvas.toDataURL("image/png"); // conversion en data URL PNG
  link.click(); // déclenche le téléchargement
}
