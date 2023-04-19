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
