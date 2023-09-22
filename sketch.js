const container = document.querySelector('.sketchSpace')

// Function to calculate grid dimensions based on screen size
function calculateGridDimensions() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const gridSize = Math.min(screenWidth, screenHeight) * 0.9; // Adjust the factor as needed
    console.log(gridSize);
    return gridSize;
}

// Function to create and append a dynamic grid
function createDynamicGrid() {
    const gridSize = calculateGridDimensions();
    //This could 
    const numCols = 16; // Number of columns
    const cellSize = (gridSize / numCols)-2; // Calculate the size of each cell

    container.style.width = `${gridSize}px`;
    container.style.height = `${gridSize}px`;

    for (let i = 0; i < numCols * numCols; i++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        gridItem.style.width = `${cellSize}px`;
        gridItem.style.height = `${cellSize}px`;
        container.appendChild(gridItem);
    }

}

function addCellColor(e){
    const cell = e.currentTarget
    cell.style.backgroundColor = 'black';
}

// Call the function initially and whenever the window is resized
createDynamicGrid();

window.addEventListener("resize", createDynamicGrid);
const cells = document.querySelectorAll(".grid-item");
cells.forEach(function(cell){
    cell.addEventListener('click', addCellColor);
})

