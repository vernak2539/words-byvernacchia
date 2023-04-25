export const mouseEventsButtonOnly = {
    files: {
        "index.html": {
            readOnly: true,
            hidden: true,
            code: `<!DOCTYPE html>
<html>
  <head>
    <title>Simulating JS Events</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <button>Click Me</button>
    <br />
    <script src="index.js"></script>
  </body>
</html>
                    `,
        },
        "/index.js": {
            readOnly: true,
            active: true,
            code: `const button = document.getElementsByTagName("button")[0];

button.addEventListener("click", () => {
  console.log("click event");
});

button.addEventListener("mouseup", () => {
  console.log("mouseup event");
});

button.addEventListener("mousedown", () => {
  console.log("mousedown event");
});
            `,
        },
    },
};

export const mouseEventsDotClick = {
    files: {
        "index.html": {
            readOnly: true,
            hidden: true,
            code: `<!DOCTYPE html>
<html>
  <head>
    <title>Simulating JS Events</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <button>Click Me</button>
    <br /><br />
    <div id="simulate-with-dot-click" style="border: 1px solid #000; background: #ddd; padding: 2px; cursor: pointer;">Simulate click with .click()</div>
    <script src="index.js"></script>
  </body>
</html>
                    `,
        },
        "/index.js": {
            readOnly: true,
            active: true,
            code: `const button = document.getElementsByTagName("button")[0];
const dotClickBtn = document.getElementById("simulate-with-dot-click");

dotClickBtn.addEventListener("click", () => {
  button.click();
});

button.addEventListener("click", () => {
  console.log("click event");
});

button.addEventListener("mouseup", () => {
  console.log("mouseup event");
});

button.addEventListener("mousedown", () => {
  console.log("mousedown event");
});
            `,
        },
    },
};

export const mouseEventsEventsClick = {
    files: {
        "index.html": {
            readOnly: true,
            hidden: true,
            code: `<!DOCTYPE html>
<html>
  <head>
    <title>Simulating JS Events</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <button>Click Me</button>
    <br /><br />
    <div id="simulate-with-events" style="border: 1px solid #000; background: #E02800; padding: 2px; cursor: pointer;">Simulate click with .click()</div>
    <script src="index.js"></script>
  </body>
</html>
                    `,
        },
        "/index.js": {
            readOnly: true,
            active: true,
            code: `const button = document.getElementsByTagName("button")[0];
const dotClickBtn = document.getElementById("simulate-with-events");

const simulateMouseEvent = (element, eventName) => {
  element.dispatchEvent(
    new MouseEvent(eventName, {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: 0,
      clientY: 0,
      button: 0
    })
  )
}

export const simulateClick = (element) => {
  simulateMouseEvent(element, "mousedown")
  simulateMouseEvent(element, "mouseup")
  simulateMouseEvent(element, "click")
}

dotClickBtn.addEventListener("click", () => {
  simulateClick(button)
});

button.addEventListener("click", () => {
  console.log("click event");
});

button.addEventListener("mouseup", () => {
  console.log("mouseup event");
});

button.addEventListener("mousedown", () => {
  console.log("mousedown event");
});
            `,
        },
    },
};

const keyboardEventsHTML = `<!DOCTYPE html>
<html>
  <head>
    <title>Simulating JS Events</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <input id="simulate-keyboard-input" />
    <br /><br />
    <script src="index.js"></script>
  </body>
</html>
`;

export const keyboardEventsInputOnly = {
    files: {
        "index.html": {
            readOnly: true,
            hidden: true,
            code: keyboardEventsHTML,
        },
        "/index.js": {
            readOnly: true,
            active: true,
            code: `const input = document.getElementById("simulate-keyboard-input");

input.addEventListener("keydown", (e) => {
  console.log("keydown event: " + e.key);
});

input.addEventListener("keyup", (e) => {
  console.log("keyup event: " + e.key);
});

input.addEventListener("keypress", (e) => {
  console.log("keypress event: " + e.key);
});
            `,
        },
    },
};

export const keyboardEventsDispatchEvents = {
    files: {
        "index.html": {
            readOnly: true,
            hidden: true,
            code: `<!DOCTYPE html>
<html>
  <head>
    <title>Simulating JS Events</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <input id="simulate-keyboard-input" />
    <br /><br />
    <button id="simulate-keyboard-btn">Simulate typing of "e"</button>
    <script src="index.js"></script>
  </body>
</html>
            `,
        },
        "/index.js": {
            readOnly: true,
            active: true,
            code: `const input = document.getElementById("simulate-keyboard-input");
const btn = document.getElementById("simulate-keyboard-btn");

input.addEventListener("keydown", (e) => {
  console.log("keydown event: " + e.key);
});

input.addEventListener("keyup", (e) => {
  console.log("keyup event: " + e.key);
});

input.addEventListener("keypress", (e) => {
  console.log("keypress event: " + e.key);
});

btn.addEventListener('click', (e) => {
    input.dispatchEvent(
        new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: "e",
            keyCode: 69,
            code: "KeyE",
            which: 69,
        })
    )
    
    input.dispatchEvent(
        new KeyboardEvent('keypress', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: "e",
            keyCode: 69,
            code: "KeyE",
            which: 69,
        })
    )
    
    input.dispatchEvent(
        new KeyboardEvent('keyup', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: "e",
            keyCode: 69,
            code: "KeyE",
            which: 69,
        })
    )
})
            `,
        },
    },
};

export const keyboardEventsInputDotValue = {
    files: {
        "index.html": {
            readOnly: true,
            hidden: true,
            code: `<!DOCTYPE html>
<html>
  <head>
    <title>Simulating JS Events</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <input id="simulate-keyboard-input" />
    <br /><br />
    <button id="simulate-keyboard-btn">Simulate typing of "test me"</button>
    <script src="index.js"></script>
  </body>
</html>
            `,
        },
        "/index.js": {
            readOnly: true,
            active: true,
            code: `const input = document.getElementById("simulate-keyboard-input");
const btn = document.getElementById("simulate-keyboard-btn");

function insertChars(inputElement, string) {
  inputElement.value += string.charAt(0);

  setTimeout(function() {
    insertChars(inputElement, string.slice(1));
  }, 300);
}

btn.addEventListener('click', (e) => {
    insertChars(input, "test me");
})

input.addEventListener("keydown", (e) => {
  console.log("keydown event: " + e.key);
});

input.addEventListener("keyup", (e) => {
  console.log("keyup event: " + e.key);
});

input.addEventListener("keypress", (e) => {
  console.log("keypress event: " + e.key);
});
            `,
        },
    },
};
