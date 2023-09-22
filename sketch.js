const container = document.querySelector('.sketchSpace');
const selection = document.querySelector('select');
const OPTIONSAMOUNT = 101;
let isMouseDown = false;

//initial column and rows value
let desiredColumns = 16;

function addOptionsSelect() {
    for (let i = 1; i < OPTIONSAMOUNT; i++) {
        const option = document.createElement('option');
        option.textContent = `${i}`;
        selection.appendChild(option);
    }
    selection.addEventListener('change', selectNumberOfColumns)
}

// Function to calculate grid dimensions based on screen size
function calculateGridDimensions() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const gridSize = Math.min(screenWidth, screenHeight) * 0.9; // Adjust the factor as needed
    return gridSize;
}

// Function to create and append a dynamic grid
function createDynamicGrid(desiredColumns) {
    container.innerHTML = '';
    const gridSize = calculateGridDimensions();
    const cellSize = (gridSize / desiredColumns) - 2; // Calculate the size of each cell
    console.log(desiredColumns);
    console.log(gridSize);
    console.log(cellSize);
    container.style.width = `${gridSize}px`;
    container.style.height = `${gridSize}px`;

    for (let i = 0; i < desiredColumns * desiredColumns; i++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        gridItem.style.width = `${cellSize}px`;
        gridItem.style.height = `${cellSize}px`;
        container.appendChild(gridItem);
    }
    const cells = document.querySelectorAll(".grid-item");
    cells.forEach(function (cell) {
        cell.addEventListener('mousedown', addCellColor);
        cell.addEventListener('mousedown', () => isMouseDown = true);
        cell.addEventListener('mouseup', () => isMouseDown = false);
        cell.addEventListener('mousemove', (e)=>{
            if(isMouseDown){
                addCellColor(e);
            }
        }
        )
    })
}

function addCellColor(e) {
    const cell = e.currentTarget
    cell.style.backgroundColor = 'black';
}


//Add the options to the select
addOptionsSelect();
// Call the function initially and whenever the window is resized
createDynamicGrid(desiredColumns);

function selectNumberOfColumns(e) {
    desiredColumns = e.target.value;
    console.log(desiredColumns);
    createDynamicGrid(desiredColumns);
}

window.addEventListener("resize",()=> createDynamicGrid(desiredColumns));




