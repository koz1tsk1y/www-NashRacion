//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region src/js/_header.js
function headerInit() {
	const header = document.querySelector(".header");
	if (header) header.querySelector(".header__burger-btn")?.addEventListener("click", () => {
		header.classList.toggle("header--burger-active");
	});
}
//#endregion
//#region src/js/_up-btn.js
function upBtnInit() {
	const upBtns = document.querySelectorAll(".up-btn");
	if (!upBtns.length) return;
	upBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		});
	});
}
//#endregion
//#region src/js/_cards.js
function cardsInit() {
	const blocks = document.querySelectorAll(".cards");
	if (!blocks.length) return;
	blocks.forEach((block) => {
		const tabs = block.querySelectorAll(".cards__tab");
		const items = block.querySelectorAll(".cards__item");
		if (!tabs.length) return;
		const init = () => {
			tabs.forEach((t) => t.classList.remove("cards__tab--active"));
			items.forEach((i) => i.classList.add("cards__item--hidden"));
			const firstTab = tabs[0];
			firstTab.classList.add("cards__tab--active");
			showGroup(firstTab.dataset.cardsGroup);
		};
		const showGroup = (group) => {
			items.forEach((i) => {
				i.classList.toggle("cards__item--hidden", i.dataset.cardsGroup !== group);
			});
		};
		tabs.forEach((tab) => {
			tab.addEventListener("click", () => {
				tabs.forEach((t) => t.classList.remove("cards__tab--active"));
				tab.classList.add("cards__tab--active");
				showGroup(tab.dataset.cardsGroup);
			});
		});
		init();
	});
}
//#endregion
//#region src/js/_custom-number.js
function customNumberInit() {
	const blocks = document.querySelectorAll(".custom-number");
	if (!blocks.length) return;
	blocks.forEach((block) => {
		const input = block.querySelector(".custom-number__input");
		const btnMinus = block.querySelector(".custom-number__btn-minus");
		const btnPlus = block.querySelector(".custom-number__btn-plus");
		const min = Number(block.dataset.numberMin) || 0;
		let value = Number(input.value);
		if (isNaN(value) || value < min) value = min;
		input.value = value;
		const update = (newValue) => {
			if (newValue < min) newValue = min;
			input.value = newValue;
		};
		btnMinus.addEventListener("click", () => {
			update(Number(input.value) - 1);
		});
		btnPlus.addEventListener("click", () => {
			update(Number(input.value) + 1);
		});
		input.addEventListener("input", () => {
			let v = Number(input.value.replace(/\D+/g, ""));
			if (isNaN(v)) v = min;
			update(v);
		});
	});
}
//#endregion
//#region src/js/_custom-select.js
function customSelectInit() {
	const selects = document.querySelectorAll(".custom-select");
	if (!selects.length) return;
	selects.forEach((select) => {
		const hiddenInput = select.querySelector("input[type=\"hidden\"]");
		const label = select.querySelector(".custom-select__label");
		const items = select.querySelectorAll(".custom-select__item");
		const init = () => {
			items.forEach((i) => i.classList.remove("custom-select__item--active"));
			select.classList.remove("custom-select--active");
			const firstItem = items[0];
			firstItem.classList.add("custom-select__item--active");
			label.textContent = firstItem.textContent;
			hiddenInput.value = firstItem.dataset.customSelectValue;
		};
		label.addEventListener("click", () => {
			select.classList.toggle("custom-select--active");
		});
		items.forEach((item) => {
			item.addEventListener("click", () => {
				items.forEach((i) => i.classList.remove("custom-select__item--active"));
				item.classList.add("custom-select__item--active");
				label.textContent = item.textContent;
				hiddenInput.value = item.dataset.customSelectValue;
				select.classList.remove("custom-select--active");
			});
		});
		document.addEventListener("click", (e) => {
			if (!select.contains(e.target)) select.classList.remove("custom-select--active");
		});
		init();
	});
}
//#endregion
//#region src/js/_quiz.js
function quizInit() {
	const quiz = document.querySelector(".quiz");
	if (!quiz) return;
	const tabs = quiz.querySelectorAll(".quiz__tab");
	const items = quiz.querySelectorAll(".quiz__item");
	const btnPrev = quiz.querySelector(".quiz__btn-prev");
	const btnNext = quiz.querySelector(".quiz__btn-next");
	const btnSubmit = quiz.querySelector(".quiz__submit");
	let index = 0;
	const validateStep = (step) => {
		const item = items[step];
		item.classList.remove("quiz__item--error");
		let valid = true;
		const radioGroups = [...item.querySelectorAll("input[type=\"radio\"]")].reduce((groups, radio) => {
			groups[radio.name] = groups[radio.name] || [];
			groups[radio.name].push(radio);
			return groups;
		}, {});
		for (const groupName in radioGroups) if (!radioGroups[groupName].some((r) => r.checked)) valid = false;
		item.querySelectorAll("input[type=\"text\"]").forEach((input) => {
			if (input.value.trim() === "") valid = false;
		});
		item.querySelectorAll("input[type=\"hidden\"]").forEach((input) => {
			if (input.value.trim() === "") valid = false;
		});
		if (!valid) item.classList.add("quiz__item--error");
		return valid;
	};
	const init = () => {
		tabs.forEach((t) => t.classList.remove("quiz__tab--active"));
		items.forEach((i) => i.classList.remove("quiz__item--active"));
		tabs[0].classList.add("quiz__tab--active");
		items[0].classList.add("quiz__item--active");
		index = 0;
	};
	const update = () => {
		tabs.forEach((t) => t.classList.remove("quiz__tab--active"));
		items.forEach((i) => i.classList.remove("quiz__item--active"));
		tabs[index].classList.add("quiz__tab--active");
		items[index].classList.add("quiz__item--active");
		quiz.scrollIntoView({
			behavior: "smooth",
			block: "center"
		});
	};
	btnNext.addEventListener("click", () => {
		if (!validateStep(index)) return;
		if (index < items.length - 1) {
			index++;
			update();
		}
	});
	btnPrev.addEventListener("click", () => {
		if (index > 0) {
			index--;
			update();
		}
	});
	btnSubmit.addEventListener("click", (e) => {
		if (!validateStep(index)) {
			e.preventDefault();
			return;
		}
		if (index < items.length - 1) {
			e.preventDefault();
			index++;
			update();
		}
	});
	tabs.forEach((tab, i) => {
		tab.addEventListener("click", () => {
			if (!validateStep(index)) return;
			index = i;
			update();
		});
	});
	init();
}
//#endregion
//#region src/js/main.js
document.addEventListener("DOMContentLoaded", function() {
	headerInit();
	upBtnInit();
	cardsInit();
	customNumberInit();
	customSelectInit();
	quizInit();
});
//#endregion
