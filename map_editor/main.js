const canvas = document.getElementById("map");
const ctx = canvas.getContext("2d");

const selectedTile = document.getElementById("selectedTile");
const selectedLayerNumber = document.getElementById("selectedLayerNumber");
const showPlacement = document.getElementById("showPlacement");

const btnLayer0 = document.getElementById("selectL0");
const btnLayer1 = document.getElementById("selectL1");
const btnLayer2 = document.getElementById("selectL2");
const higlighLayerCheckbox = document.getElementById("higlighLayer");

const tileSetImage = new Image();
tileSetImage.src = "./images/tileset.png";

const tileSetWidth = 144;
const tileSetHeight = 144;
const tileSize = 16;

let isMouseDown = false;
let isRightMouseDown = false;

let selected = [0, 0];
let selectedLayer = 0;
let higlightedLayer = null;

let layers = [{}, {}, {}];

function addTile(dX, dY) {
  const [sX, sY] = selected;
  const key = `${dX}-${dY}`;

  layers[selectedLayer][key] = [sX, sY];

  draw();
}

function removeTile(dX, dY) {
  const key = `${dX}-${dY}`;
  delete layers[selectedLayer][key];

  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];

    for (const [key, value] of Object.entries(layer)) {
      const [dX, dY] = key.split("-");
      const [x, y] = value;

      ctx.drawImage(
        tileSetImage,
        x * tileSize,
        y * tileSize,
        tileSize,
        tileSize,
        dX * tileSize,
        dY * tileSize,
        tileSize,
        tileSize
      );
      if (higlighLayerCheckbox.checked && higlightedLayer == layer) {
        highlightTile(dX, dY);
      }
    }
  }
}

function saveCurrentMap() {
  localStorage.setItem("pixel-map", JSON.stringify(layers));
}

function deleteSavedMap() {
  localStorage.removeItem("pixel-map");
  clearMap();
}

// TODO: copy map
function copyMap() {
  navigator.clipboard.writeText(JSON.stringify(layers));
}

function clearMap() {
  layers = [{}, {}, {}];
  draw();
}

function getCoords(e) {
  const { x, y } = e.target.getBoundingClientRect();
  const mouseX = e.clientX - x;
  const mouseY = e.clientY - y;

  return [Math.floor(mouseX / tileSize), Math.floor(mouseY / tileSize)];
}

function highlightTile(x, y) {
  ctx.fillStyle = "rgba(255, 255, 0, 0.5)";
  ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
}

tileset.addEventListener("mousedown", (e) => {
  selected = getCoords(e);
  selectedTile.style.left = `${selected[0] * tileSize}px`;
  selectedTile.style.top = `${selected[1] * tileSize}px`;
});

canvas.addEventListener("mousemove", (e) => {
  const [posX, posY] = getCoords(e);
  if (posX < 0 || posY < 0) return;
  showPlacement.style.left = `${posX * tileSize}px`;
  showPlacement.style.top = `${posY * tileSize}px`;
});

canvas.addEventListener("mousedown", (e) => {
  const [posX, posY] = getCoords(e);
  if (e.button == 2) {
    isRightMouseDown = true;
    removeTile(posX, posY);
    return;
  } else if (e.button == 0) {
    isMouseDown = true;
    addTile(posX, posY);
  }
});

canvas.addEventListener("mousemove", (e) => {
  const [posX, posY] = getCoords(e);
  if (isMouseDown) {
    addTile(posX, posY);
  } else if (isRightMouseDown) {
    removeTile(posX, posY);
  }
});

canvas.addEventListener("mouseup", (e) => {
  if (e.button == 0) {
    isMouseDown = false;
  } else if (e.button == 2) {
    isRightMouseDown = false;
  }
});

canvas.addEventListener("mouseleave", (e) => {
  isMouseDown = false;
  isRightMouseDown = false;
});

btnLayer0.addEventListener("click", () => {
  selectedLayer = 0;
  higlighLayerCheckbox.checked = false;
  selectedLayerNumber.innerText = "Bottom";
  draw();
});

btnLayer1.addEventListener("click", () => {
  selectedLayer = 1;
  selectedLayerNumber.innerText = "Middle";
  higlighLayerCheckbox.checked = false;
  draw();
});

btnLayer2.addEventListener("click", () => {
  selectedLayer = 2;
  selectedLayerNumber.innerText = "Top";
  higlighLayerCheckbox.checked = false;
  draw();
});

higlighLayerCheckbox.addEventListener("click", () => {
  higlightedLayer = layers[selectedLayer];
  draw();
});

canvas.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

tileSetImage.onload = () => {
  const savedMap = localStorage.getItem("pixel-map");
  if (savedMap) {
    layers = JSON.parse(savedMap);
  }
  draw();
};
