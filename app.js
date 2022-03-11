// Based off of original work of kirupa.com

// Declare some variables
var dragItem = document.querySelector("#item");
var container = document.querySelector("#container");

var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;

// Listen for events to deal with the states
container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

// Initialize drag!
function dragStart(e) {
    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }
    // Check to make sure the click location is the element we want to drag. If you go back to our event listener code, notice that we are listening for our various mouse and touch events on the container and not the element we are dragging
    // we identify this event as being associated with our dragged element, we set the active variable to true:  
    if (e.target === dragItem) {
        active = true;
    }
}

// When "mousemove" or "touchmove" gets fired, the drag function is called.
function drag(e) {
    if (active) {

        e.preventDefault();

        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        //   The last thing this function does is set the new position for our dragged element:
        setTranslate(currentX, currentY, dragItem);
    }
}

// This is set by the setTranslate function which looks as follows:
function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

// the event handler that gets called when the mouseup and touchend events fire, signifying the end of the drag:
function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    active = false;
}