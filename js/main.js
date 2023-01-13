const shrink_btn = document.querySelector(".shrink-btn");
const search = document.querySelector(".search");
const sidebar_links = document.querySelectorAll(".sidebar-links a");
const active_tab = document.querySelector(".active-tab");
const tooltip_elements = document.querySelectorAll(".tooltip-element");

let activeIndex;

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

	active_tab.style.top = `${topPosition}px`;
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

function zoom(img) {
	// Get the modal
	let modal = document.getElementById("myModal");

	// Get the image and insert it inside the modal - use its "alt" text as a caption
	let modalImg = document.getElementById("img01");
	let captionText = document.getElementById("caption");
	img.onclick = function () {
		modal.style.display = "block";
		modalImg.src = this.src;
		captionText.innerHTML = this.alt;
	};

	// Get the <span> element that closes the modal
	let span = document.getElementsByClassName("close")[0];

	// When the user clicks on <span> (x), close the modal
	span.onclick = function () {
		modal.style.display = "none";
	};
}

let images = document.getElementsByClassName("marker");

for (let i = 0; i < images.length; i++) {
	zoom(images[i]);
}
