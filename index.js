const form = document.getElementById("form");

const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
const color3 = document.getElementById("color3");
const color4 = document.getElementById("color4");
const color5 = document.getElementById("color5");

const color1Text = document.getElementById("color1-text");
const color2Text = document.getElementById("color2-text");
const color3Text = document.getElementById("color3-text");
const color4Text = document.getElementById("color4-text");
const color5Text = document.getElementById("color5-text");

const buttons = document.querySelectorAll(".copy-btn");

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

  console.log(color);

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${color}&mode=${option}&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      color1.style.backgroundColor = `${data.colors[0].hex.value}`;
      color2.style.backgroundColor = `${data.colors[1].hex.value}`;
      color3.style.backgroundColor = `${data.colors[2].hex.value}`;
      color4.style.backgroundColor = `${data.colors[3].hex.value}`;
      color5.style.backgroundColor = `${data.colors[4].hex.value}`;

      color1Text.innerHTML = `${data.colors[0].hex.value}   <i class="fa-regular fa-copy" style="color: #000000;"></i>`;
      color2Text.innerHTML = `${data.colors[1].hex.value}   <i class="fa-regular fa-copy" style="color: #000000;"></i>`;
      color3Text.innerHTML = `${data.colors[2].hex.value}   <i class="fa-regular fa-copy" style="color: #000000;"></i>`;
      color4Text.innerHTML = `${data.colors[3].hex.value}   <i class="fa-regular fa-copy" style="color: #000000;"></i>`;
      color5Text.innerHTML = `${data.colors[4].hex.value}   <i class="fa-regular fa-copy" style="color: #000000;"></i>`;
    });
});
