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
//#region src/js/_preview-slider.js
function previewSliderInit() {
	const slider = document.querySelector(".preview-slider");
	if (!slider) return;
	const previews = slider.querySelectorAll(".preview-slider__preview");
	const mainSlides = slider.querySelectorAll(".preview-slider__main-image");
	const main = slider.querySelector(".preview-slider__main");
	let currentIndex = 0;
	function setActive(index) {
		currentIndex = index;
		previews.forEach((p) => p.classList.remove("preview-slider__preview--active"));
		previews[index].classList.add("preview-slider__preview--active");
		mainSlides.forEach((div) => div.classList.remove("preview-slider__main-image--active"));
		mainSlides[index].classList.add("preview-slider__main-image--active");
	}
	previews.forEach((preview, index) => {
		preview.addEventListener("click", () => setActive(index));
	});
	let startX = 0;
	let isDown = false;
	main.addEventListener("touchstart", (e) => {
		isDown = true;
		startX = e.touches[0].clientX;
	}, { passive: true });
	main.addEventListener("touchend", (e) => {
		if (!isDown) return;
		isDown = false;
		handleSwipe(e.changedTouches[0].clientX - startX);
	});
	main.addEventListener("mousedown", (e) => {
		isDown = true;
		startX = e.clientX;
	});
	main.addEventListener("mouseup", (e) => {
		if (!isDown) return;
		isDown = false;
		handleSwipe(e.clientX - startX);
	});
	function handleSwipe(diff) {
		if (Math.abs(diff) > 50) {
			if (diff < 0) currentIndex = (currentIndex + 1) % previews.length;
			else currentIndex = (currentIndex - 1 + previews.length) % previews.length;
			setActive(currentIndex);
		}
	}
	setActive(0);
}
//#endregion
//#region src/js/_faq.js
function faqInit() {
	const items = document.querySelectorAll(".faq__item");
	items.forEach((item) => {
		const question = item.querySelector(".faq__item-question");
		const answer = item.querySelector(".faq__item-answer");
		const inner = item.querySelector(".faq__item-answer-inner");
		question.addEventListener("click", () => {
			const isOpen = item.classList.contains("faq__item--active");
			items.forEach((i) => {
				i.classList.remove("faq__item--active");
				i.querySelector(".faq__item-answer").style.maxHeight = "0px";
			});
			if (!isOpen) {
				item.classList.add("faq__item--active");
				answer.style.maxHeight = inner.scrollHeight + "px";
				scrollToQuestion(question);
			}
		});
		window.addEventListener("resize", () => {
			if (item.classList.contains("faq__item--active")) answer.style.maxHeight = inner.scrollHeight + "px";
		});
	});
	function scrollToQuestion(questionEl) {
		const rect = questionEl.getBoundingClientRect();
		const offset = rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2;
		window.scrollTo({
			top: offset,
			behavior: "smooth"
		});
	}
}
//#endregion
//#region src/js/_custom-upload.js
function customUploadInit() {
	const wrappers = document.querySelectorAll(".custom-upload");
	if (!wrappers.length) return;
	wrappers.forEach((wrapper) => {
		const input = wrapper.querySelector("input[type=\"file\"]");
		const btn = wrapper.querySelector(".custom-upload__btn");
		const label = wrapper.querySelector(".custom-upload__label");
		const del = wrapper.querySelector(".custom-upload__del");
		btn.addEventListener("click", () => input.click());
		input.addEventListener("change", () => {
			if (input.files.length > 0) label.textContent = input.files[0].name;
		});
		del.addEventListener("click", () => {
			input.value = "";
			label.textContent = "";
		});
	});
}
//#endregion
//#region src/js/_feedback-popup.js
function feedbackPopupInit() {
	const popup = document.querySelector(".feedback-popup");
	if (!popup) return;
	popup.querySelector(".feedback-popup__body");
	document.addEventListener("click", (e) => {
		const openBtn = e.target.closest("[data-feedback]");
		const closeBtn = e.target.closest(".feedback-popup__close");
		if (openBtn) {
			popup.classList.add("feedback-popup--active");
			return;
		}
		if (closeBtn) {
			popup.classList.remove("feedback-popup--active");
			return;
		}
		if (popup.classList.contains("feedback-popup--active") && !e.target.closest(".feedback-popup__body")) popup.classList.remove("feedback-popup--active");
	});
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && popup.classList.contains("feedback-popup--active")) popup.classList.remove("feedback-popup--active");
	});
}
//#endregion
//#region src/js/vendors/transfer-elements.esm.min.js
/**
* @file Dynamic transfer of elements from one place to another at breakpoints.
* @copyright SineYlo, 2024
* @version 1.0.7
* @license MIT
*/
var TransferElements = class {
	constructor(...e) {
		if (0 === e.length) throw TypeError("at least one object with parameters must be specified for the constructor");
		const o = [];
		e = e.map((t) => {
			if ("[object Object]" !== this.#getObjectType(t)) throw TypeError("the arguments specified for the constructor must be objects of type 'Object'");
			["sourceElement", "breakpoints"].forEach((e) => {
				if (!Object.hasOwn(t, e)) throw TypeError(`the '${e}' parameter is not specified for the main object`);
			});
			var { sourceElement: e, breakpoints: r } = t;
			if (!(e instanceof Element)) throw TypeError("the value specified for the 'sourceElement' parameter must be an object of type 'Element'");
			if (o.includes(e)) throw TypeError(`there can only be one object in the constructor with such a 'sourceElement': '${e.cloneNode().outerHTML}'`);
			return o.push(e), t.breakpoints = this.#assembleBreakpoints(r, e), t;
		});
		const r = [...e.reduce((t, { breakpoints: e }) => (Object.keys(e).forEach((e) => {
			Number(e) && t.add(e);
		}), t), /* @__PURE__ */ new Set()).add("default")].sort((e, t) => e - t), n = r.reduce((e, t) => (e.set(t, []), e), /* @__PURE__ */ new Map());
		e.forEach(({ sourceElement: o, breakpoints: e }) => {
			Object.entries(e).forEach(([e, { targetElement: t, targetPosition: r }]) => {
				n.get(e).push({
					sourceElement: o,
					targetElement: t,
					targetPosition: r
				});
			});
		}), n.forEach((t) => {
			this.#sortBreakpointObjects(t), this.#removeSourceElements(t), this.#insertSourceElements(t, !0), t.length = 0, o.forEach((e) => {
				t.push(this.#generateBreakpointObject(e, !0));
			}), this.#sortBreakpointObjects(t);
		});
		let a = "default";
		new ResizeObserver(([{ borderBoxSize: [{ inlineSize: e }], target: t }]) => {
			var e = e + this.#getScrollbarWidth(t), t = this.#getBreakpointTrigger(r, e);
			a !== t && (e = n.get(t), this.#removeSourceElements(e), this.#insertSourceElements(e, !1), a = t);
		}).observe(document.documentElement);
	}
	#assembleBreakpoints(e, n) {
		if ("[object Object]" !== this.#getObjectType(e)) throw TypeError("the value specified for the 'breakpoints' parameter must be an object of type 'Object'");
		e = Object.entries(e);
		if (0 === e.length) throw TypeError("at least one breakpoint must be specified for the 'breakpoints' object");
		e = Object.fromEntries(e.map(([e, t]) => {
			e = Number(e);
			if (!e || e <= 0 || e > Number.MAX_SAFE_INTEGER) throw RangeError("the breakpoint trigger must be a safe (integer or fractional) number greater than zero");
			if ("[object Object]" !== this.#getObjectType(t)) throw TypeError("the breakpoint object must be of type 'Object'");
			if (!Object.hasOwn(t, "targetElement")) throw TypeError("the 'targetElement' parameter is not specified for the breakpoint object");
			var { targetElement: r, targetPosition: o } = t;
			if (!(r instanceof Element)) throw TypeError("the value specified for the 'targetElement' parameter must be an object of type 'Element'");
			if (n === r) throw TypeError("the value specified for the 'targetElement' parameter must be different from the value specified for the 'sourceElement' parameter");
			if (this.#isTargetElementDescendantOfSourceElement(r, n)) throw TypeError("the element that is specified as the value for the 'targetElement' parameter must not be a descendant of the element specified as the value for the 'sourceElement' parameter");
			if (this.#isTagOfTargetElementSelfClosing(r)) throw TypeError("the element specified as the value for the 'targetElement' parameter must be a paired tag");
			if (Object.hasOwn(t, "targetPosition")) {
				if ("number" != typeof o) throw TypeError("the value specified for the 'targetPosition' parameter must be of type 'number'");
				if (o < 0 || !Number.isSafeInteger(o)) throw RangeError("the number specified as the value for the 'targetPosition' parameter must be a non-negative safe integer");
			}
			return [e, {
				targetPosition: o ?? 0,
				...t
			}];
		}));
		return e.default = this.#generateBreakpointObject(n, !1), e;
	}
	#getChildElementsOfTargetElement(e) {
		return e.children;
	}
	#getBreakpointTrigger(e, t) {
		let r = 0, o = e.length - 2, n;
		for (; r <= o;) {
			var a = Math.floor((r + o) / 2), i = e[a];
			if (i == t) return i;
			t < i ? o = a - 1 : r = a + 1, 0 < i - t && (n = i);
		}
		return n ?? "default";
	}
	#getScrollbarWidth(e) {
		var t = window.innerWidth, e = Math.min(e.clientWidth, e.offsetWidth);
		let r = 0;
		return e !== t && (r += t - e), r;
	}
	#getObjectType(e) {
		return Object.prototype.toString.call(e);
	}
	#isTargetElementDescendantOfSourceElement(e, t) {
		for (; e = e.parentElement;) if (e === t) return !0;
		return !1;
	}
	#isTagOfTargetElementSelfClosing(e) {
		return !(/* @__PURE__ */ new RegExp(/<\/[a-zA-Z]+>$/)).test(e.outerHTML);
	}
	#sortBreakpointObjects(e) {
		1 < e.length && e.sort((e, t) => e.targetPosition - t.targetPosition);
	}
	#removeSourceElements(e) {
		e.forEach(({ sourceElement: e }) => {
			e.remove();
		});
	}
	#insertSourceElements(e, n) {
		e.forEach(({ sourceElement: e, targetElement: t, targetPosition: r }) => {
			var o = this.#getChildElementsOfTargetElement(t), o = (n && this.#throwExceptionIfMaximumTargetPositionIsExceeded(o, r), o[r]);
			o ? o.before(e) : t.append(e);
		});
	}
	#throwExceptionIfMaximumTargetPositionIsExceeded(e, t) {
		e = e.length;
		if (e < t) throw RangeError(`the number specified as the value for the 'targetPosition' parameter exceeds the maximum allowed value of '${e}'`);
	}
	#generateBreakpointObject(t, e) {
		var r = t.parentElement, r = {
			targetElement: r,
			targetPosition: [...r.children].findIndex((e) => e === t)
		};
		return e && (r.sourceElement = t), r;
	}
};
//#endregion
//#region src/js/_transfer-elements.js
function transferElementsInit() {
	const productDetail = document.querySelector(".product-detail");
	if (productDetail) {
		const productDetailSlider = document.querySelector(".product-detail__slider");
		const forProductDetailSlider = document.querySelector(".product-detail__desktop-row-item .product-detail__row:nth-child(1)");
		if (productDetailSlider && forProductDetailSlider) new TransferElements({
			sourceElement: productDetailSlider,
			breakpoints: { 768: { targetElement: forProductDetailSlider } }
		});
		const productDetailShops = document.querySelector(".product-detail__shops");
		const forProductDetailShops = document.querySelector(".product-detail__desktop-row-item .product-detail__row:nth-child(2)");
		if (productDetailShops && forProductDetailShops) new TransferElements({
			sourceElement: productDetailShops,
			breakpoints: { 768: { targetElement: forProductDetailShops } }
		});
		if (forProductDetailShops) new TransferElements({
			sourceElement: forProductDetailShops,
			breakpoints: { 768: { targetElement: productDetail } }
		});
		if (forProductDetailSlider) new TransferElements({
			sourceElement: forProductDetailSlider,
			breakpoints: { 768: { targetElement: productDetail } }
		});
	}
}
//#endregion
//#region src/js/_custom-sticky.js
function customStickyInit() {
	document.querySelectorAll(".sticky").forEach((sticky) => {
		const item = sticky.querySelector(".sticky__item");
		if (!item) return;
		let start = 0;
		let end = 0;
		let itemHeight = 0;
		let stickyHeight = 0;
		function recalc() {
			itemHeight = item.offsetHeight;
			stickyHeight = sticky.offsetHeight;
			start = sticky.offsetTop;
			end = start + stickyHeight - itemHeight;
		}
		function onScroll() {
			const scroll = window.scrollY;
			let translate = scroll - start;
			if (translate < 0) translate = 0;
			if (scroll >= end) translate = end - start;
			item.style.transform = `translateY(${translate}px)`;
		}
		recalc();
		onScroll();
		window.addEventListener("scroll", onScroll);
		window.addEventListener("resize", () => {
			recalc();
			onScroll();
		});
	});
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
	previewSliderInit();
	faqInit();
	customUploadInit();
	feedbackPopupInit();
	transferElementsInit();
	customStickyInit();
});
//#endregion
