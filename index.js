// This code gets your form element from your HTML file and stores it in a variable called form. It also sets the value of the variable lightDark to an empty string.
const form = document.getElementById("form");
let lightDark = "";

// Get the color elements from the DOM.
const colors = Array.from({ length: 5 }, (_, i) =>
  document.getElementById(`color${i + 1}`)
);

// Get the color text elements from the DOM.
const colorTexts = Array.from({ length: 5 }, (_, i) =>
  document.getElementById(`color${i + 1}-text`)
);

const buttons = document.querySelectorAll(".copy-btn");


// This code copies the text content of a button element when the button is clicked
// It first checks the text content of the button itself, and if it is empty, it copies the text content of its parent element
// It then writes the text content to the clipboard and alerts the user that the text has been copied

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const content = event.target.textContent;

    if (content === "") {
      navigator.clipboard.writeText(event.target.parentElement.textContent);
      alert("Copied the text: " + event.target.parentElement.textContent);
    } else {
      navigator.clipboard.writeText(content);
      alert("Copied the text: " + content);
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const myFormData = new FormData(form);

  let color = myFormData.get("color");
  const option = myFormData.get("option");
  color = color.substring(1, color.length);

  lightDark = lightOrDark(color);

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${color}&mode=${option}&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      data.colors.forEach((colorData, i) => {
        colors[i].style.backgroundColor = `${colorData.hex.value}`;
        colors[i].textContent = `${colorData.name.value}`;
        colorTexts[
          i
        ].innerHTML = `${colorData.hex.value}   <i class="fa-regular fa-copy" style="color: #000000;"></i>`;

        if (lightDark === "light") {
          colors[i].style.color = "black";
        } else {
          colors[i].style.color = "white";
        }
      });
    });
});



// This function determines whether a given color is light or dark. It accepts a
// single parameter color (a string representing a hex color code or an RGB color
// code) and returns a string ("light" or "dark") indicating whether the
// specified color is light or dark. See the function lightOrDark for an example
// of how to use this function.

function lightOrDark(color) {
  // Variables for red, green, blue values
  var r, g, b, hsp;

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If RGB --> store the red, green, blue values in separate variables
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    // If hex --> Convert it to RGB: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 127.5) {
    return "light";
  } else {
    return "dark";
  }
}

