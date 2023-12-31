const container = document.querySelector('.sketchSpace');
const selection = document.querySelector('select');
const OPTIONSAMOUNT = 101;
const FLOORFACTOR = 1000000000; //added for the cells to fit the grid when large numbers appear
const colorSelector = document.querySelector('input');
const clearButton = document.querySelector('button');
let colorSelected = colorSelector.value;
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
    container.style.width = `${gridSize}px`;
    container.style.height = `${gridSize}px`;

    const columnSize = `repeat(${desiredColumns}, 1fr)`;
    container.style.gridTemplateColumns = columnSize;
    container.style.gridTemplateRows = columnSize;
    const totalGridItems = desiredColumns * desiredColumns;

    for (let i = 0;  i < totalGridItems; i++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        gridItem.setAttribute("draggable", "false")
        container.appendChild(gridItem);
    }
    
    const cells = document.querySelectorAll(".grid-item");
    cells.forEach(function (cell) {
        cell.addEventListener('mousedown', addCellColor);
        cell.addEventListener('mousedown', () => isMouseDown = true);
        window.addEventListener('mouseup', () => isMouseDown = false);
        cell.addEventListener('mousemove', (e) => {
            if (isMouseDown) {
                addCellColor(e);
            }
        }
        )
    })
}

function addCellColor(e) {
    const cell = e.currentTarget
    cell.style.backgroundColor = colorSelected;
}

function selectNumberOfColumns(e) {
    desiredColumns = e.target.value;

    createDynamicGrid(desiredColumns);
}

function selectColor(e) {
    colorSelected = e.target.value
}

function clearSketch(cells) {
    cells = document.querySelectorAll(".grid-item");
    cells.forEach(function (cell) {
        cell.style.backgroundColor = "white";
    });
}


colorSelector.addEventListener("change", selectColor)


//Add the options to the select
addOptionsSelect();
// Call the function initially and whenever the window is resized
createDynamicGrid(desiredColumns);

clearButton.addEventListener('click', clearSketch)

//this for preventing the drag event to suddenly fire
container.onmousedown = (e) => {
    isMouseDown = true;
    e.preventDefault();
};


