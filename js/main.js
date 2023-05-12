const SHRINK_BTN = document.querySelector(".shrink-btn");
const SEARCH = document.querySelector(".search");
const SIDEBAR_LINKS = document.querySelectorAll(".sidebar-links a");
const ACTTIVE_TAB = document.querySelector(".active-tab");
const TOOLTIP_ELEMENTS = document.querySelectorAll(".tooltip-element");
const SECTIONS = document.querySelectorAll("div.section");
const OPEN = document.getElementById("last-open");

let activeIndex;
let minWidth = window.matchMedia("(min-width: 915px)").matches;
let widthOpen = window.matchMedia("(max-width: 715px)").matches;

let colors = [
	"var(--main-blue-color-lighter)",
	"var(--main-red-color)",
	"var(--main-green-color)",
	"var(--main-blue-color-dark)",
];

window.addEventListener("load", function () {
	const loadingScreen = document.getElementById("loading-screen");
	loadingScreen.classList.add("hide");
});

if (widthOpen && OPEN) {
	OPEN.open = true;
}

//Moving the active tab to the active link
function moveTab() {
	if (!minWidth) {
		ACTTIVE_TAB.style.top = `2.5px`;
		ACTTIVE_TAB.style.left = `${activeIndex * 48}px`;
		loadShrink();
	} else {
		ACTTIVE_TAB.style.left = `2.5px`;
		ACTTIVE_TAB.style.top = `${activeIndex * 58 + 2.5}px`;
		loadShrink();
	}
}

//Loading the shrinked state
function loadShrink() {
	let shrinked = localStorage.getItem("shrinked");
	if (minWidth) {
		if (shrinked == "true") {
			localStorage.setItem("shrinked", "true");
			document.body.classList.add("shrink");
		} else {
			localStorage.setItem("shrinked", "false");
			document.body.classList.remove("shrink");
		}
	} else {
		document.body.classList.remove("shrink");
	}
}

//Shrink and unshrink the sidebar
SHRINK_BTN.addEventListener("click", () => {
	document.body.classList.toggle("shrink");
	if (document.body.classList.contains("shrink")) {
		localStorage.setItem("shrinked", "true");
	} else {
		localStorage.setItem("shrinked", "false");
	}

	SHRINK_BTN.classList.add("hovered");

	setTimeout(() => {
		SHRINK_BTN.classList.remove("hovered");
	}, 500);
});

//Change the state of the link as you srcoll or click on it

function changeLink() {
	SIDEBAR_LINKS.forEach((sideLink) => sideLink.classList.remove("active"));
	this.classList.add("active");

	activeIndex = this.dataset.active;
}

SIDEBAR_LINKS.forEach((link) => link.addEventListener("click", changeLink));

function changeLinkState() {
	let index = SECTIONS.length;

	while (--index && window.scrollY + 50 < SECTIONS[index].offsetTop) {}

	SIDEBAR_LINKS.forEach((link) => link.classList.remove("active"));
	SIDEBAR_LINKS[index].classList.add("active");

	activeIndex = index;
	moveTab();
}

window.addEventListener("scroll", changeLinkState);

//Hide and show the tool tip bar
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

TOOLTIP_ELEMENTS.forEach((elem) => {
	elem.addEventListener("mouseover", showTooltip);
});

//Adding a zoom effect to the .zoomable class
let imgs = document.getElementsByClassName("zoomable");
for (let i = 0; i < imgs.length; i++) {
	imgs[i].addEventListener("click", function () {
		let imgClone = this.cloneNode();
		imgClone.id = "img-clone";
		imgClone.classList.remove("infog", "marker");

		let altText = document.createElement("a");
		altText.id = "alt-text";
		altText.href = this.src;
		altText.download = `${this.alt}.png`;
		altText.innerHTML = "Descarga esta imagen";
		altText.style.position = "relative";
		altText.style.bottom = "1rem";
		altText.style.left = "0";
		altText.style.width = "30%";
		altText.style.margin = "1rem 0";
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
		imgContainer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
		imgContainer.style.backdropFilter = "blur(3px)";
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

//Add a p element that has the text of the alt attribute inside all the images with the .resource class inside the .qrs div
let qrsResource = document.querySelectorAll("img.qr");
qrsResource.forEach((img) => {
	let p = document.createElement("p");
	p.style.color = `${colors[Math.floor(Math.random() * colors.length)]}`;
	p.style.fontWeight = "bold";
	p.innerHTML = img.alt;
	img.parentNode.appendChild(p);
});

let qrsList = document.querySelectorAll("img.marker");
qrsList.forEach((img) => {
	let p = document.createElement("p");
	p.innerHTML = img.alt;
	img.parentNode.appendChild(p);
});

//loading the shrinked state
window.addEventListener("resize", () => {
	minWidth = window.matchMedia("(min-width: 915px)").matches;
	loadShrink();
});
