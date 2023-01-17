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
	}
});

shrink_btn.addEventListener("click", () => {
	document.body.classList.toggle("shrink");
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
		imgContainer.style.zIndex = "9999";

		// Add the image element to the container
		imgContainer.appendChild(imgClone);
		imgClone.style.maxWidth = "90%";
		imgClone.style.maxHeight = "90%";

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
