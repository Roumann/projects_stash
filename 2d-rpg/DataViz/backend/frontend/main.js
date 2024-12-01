const canvas = document.getElementById("map");
const ctx = canvas.getContext("2d");
let nodes;
let zoomLevel = 1;
let panOffset = { x: 0, y: 0 };
let isDragging = false;
let lastMousePos = { x: 0, y: 0 };

function parseOsmData() {
  const rawOsmData = document.getElementById("mapData").value;
  const parsedData = JSON.parse(rawOsmData);

  nodes = parsedData.elements.filter((element) => {
    return element.type === "node";
  });

  drawMap();
}

function drawMap() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawNodes(nodes);
}

function drawNodes(nodes) {
  const lats = nodes.map((node) => node.lat);
  const lons = nodes.map((node) => node.lon);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);

  for (const node of nodes) {
    const y =
      invLerp(maxLat, minLat, node.lat) * canvas.height * zoomLevel +
      panOffset.y;
    const x =
      invLerp(minLon, maxLon, node.lon) * canvas.width * zoomLevel +
      panOffset.x;

    ctx.fillStyle = "blue";
    ctx.fillRect(x, y, 5 * zoomLevel, 5 * zoomLevel);
  }
}

function invLerp(a, b, v) {
  return (v - a) / (b - a);
}

// Handle dragging for panning
canvas.addEventListener("mousedown", (event) => {
  isDragging = true;
  lastMousePos = { x: event.clientX, y: event.clientY };
});

canvas.addEventListener("mousemove", (event) => {
  if (isDragging) {
    const dx = event.clientX - lastMousePos.x;
    const dy = event.clientY - lastMousePos.y;

    panOffset.x += dx;
    panOffset.y += dy;

    lastMousePos = { x: event.clientX, y: event.clientY };

    drawMap();
  }
});

canvas.addEventListener("mouseup", () => {
  isDragging = false;
});

canvas.addEventListener("mouseleave", () => {
  isDragging = false;
});

// Handle zooming with the mouse wheel
canvas.addEventListener("wheel", (event) => {
  const zoomFactor = 0.1;
  if (event.deltaY < 0) {
    // Zoom in
    zoomLevel *= 1 + zoomFactor;
  } else {
    // Zoom out
    zoomLevel /= 1 + zoomFactor;
  }

  drawMap();
});
