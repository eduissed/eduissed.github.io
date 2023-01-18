const shrink_btn = document.querySelector(".shrink-btn");
const search = document.querySelector(".search");
const sidebar_links = document.querySelectorAll(".sidebar-links a");
const active_tab = document.querySelector(".active-tab");
const tooltip_elements = document.querySelectorAll(".tooltip-element");

let activeIndex;
let minWidth = window.matchMedia("(min-width: 915px)").matches;

window.addEventListener("resize", function () {
	minWidth = window.matchMedia("(min-width: 915px)").matches;
	if (!minWidth) {
		active_tab.style.top = `2.5px`;
		active_tab.style.left = `${activeIndex * 48}px`;
	} else {
		active_tab.style.left = `2.5px`;
		active_tab.style.top = `${activeIndex * 58 + 2.5}px`;
		loadShrink();
	}
});

if (minWidth) {
	loadShrink();
}

function loadShrink() {
	let shrinked = localStorage.getItem("shrinked");
	if (shrinked == "true") {
		localStorage.setItem("shrinked", "true");
		document.body.classList.add("shrink");
	} else {
		localStorage.setItem("shrinked", "false");
		document.body.classList.remove("shrink");
	}
}

shrink_btn.addEventListener("click", () => {
	document.body.classList.toggle("shrink");
	if (document.body.classList.contains("shrink")) {
		localStorage.setItem("shrinked", "true");
	} else {
		localStorage.setItem("shrinked", "false");
	}
	setTimeout(moveActiveTab, 400);

	shrink_btn.classList.add("hovered");

	setTimeout(() => {
		shrink_btn.classList.remove("hovered");
	}, 500);
});

function moveActiveTab() {
	let topPosition = activeIndex * 58 + 2.5;
	let leftPosition = activeIndex * 48;
	if (minWidth) {
		active_tab.style.top = `${topPosition}px`;
	} else {
		active_tab.style.left = `${leftPosition}px`;
	}
}

function changeLink() {
	sidebar_links.forEach((sideLink) => sideLink.classList.remove("active"));
	this.classList.add("active");

	activeIndex = this.dataset.active;

	moveActiveTab();
}

sidebar_links.forEach((link) => link.addEventListener("click", changeLink));

function showTooltip() {
	let tooltip = this.parentNode.lastElementChild;
	let spans = tooltip.children;
	let tooltipIndex = this.dataset.tooltip;

	Array.from(spans).forEach((sp) => sp.classList.remove("show"));
	spans[tooltipIndex].classList.add("show");

	tooltip.style.top = `${
		(100 / (spans.length * 2)) * (tooltipIndex * 2 + 1)
	}%`;
}

tooltip_elements.forEach((elem) => {
	elem.addEventListener("mouseover", showTooltip);
});

// Add a click event listener to all existing image elements
// Add a click event listener to all existing image elements
let imgs = document.getElementsByClassName("zoomable");
for (let i = 0; i < imgs.length; i++) {
	imgs[i].addEventListener("click", function () {
		// Create a clone of the clicked image
		let imgClone = this.cloneNode();
		imgClone.id = "img-clone";

		//Create the alt text for the image that allows you to download it
		let altText = document.createElement("a");
		altText.id = "alt-text";
		altText.href = this.src;
		altText.download = `${this.alt}.png`;
		altText.innerHTML = "Descárgalo aquí";
		altText.style.position = "relative";
		altText.style.bottom = "1rem";
		altText.style.left = "0";
		altText.style.width = "100%";
		altText.style.padding = "10px";
		altText.style.color = "white";
		altText.style.textAlign = "center";
		altText.style.textDecoration = "underline";

		// Create a new div element to hold the image
		let imgContainer = document.createElement("div");
		imgContainer.id = "img-container";
		imgContainer.style.position = "fixed";
		imgContainer.style.top = "0";
		imgContainer.style.left = "0";
		imgContainer.style.width = "100%";
		imgContainer.style.height = "100%";
		imgContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
		imgContainer.style.display = "flex";
		imgContainer.style.alignItems = "center";
		imgContainer.style.justifyContent = "center";
		imgContainer.style.flexDirection = "column";
		imgContainer.style.gap = "1rem";
		imgContainer.style.zIndex = "9999";

		// Add the image element to the container
		imgContainer.appendChild(imgClone);
		imgContainer.appendChild(altText);
		imgClone.style.maxWidth = "85%";
		imgClone.style.maxHeight = "85%";

		// Add the container to the body
		document.body.appendChild(imgContainer);

		// Add a click event listener to the container to close the image when clicking outside of it
		imgContainer.addEventListener("click", function (e) {
			if (e.target == imgContainer) {
				imgContainer.remove();
			}
		});
	});
}
