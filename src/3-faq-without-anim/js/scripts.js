//1 реализация подсветки пунктов меню
//2 сделать анимацию высоты (важно определить высоту корректно, т к до значения auto выставляться она не быдет)
//
window.addEventListener('load', function(){
	let faq = document.querySelector('.faq');
	
	delegate(faq, '.ask', 'click', function(){
		let answer = this.closest('.item').querySelector('.answer');
		animToggleElem(answer, [
			{opacity:0},
			{opacity:1}
		], 500)
	});

});

function animToggleElem(elem, keyframes, duration) {
	let cl = elem.classList;

		if (cl.contains('open')) {
			let animation = elem.animate(keyframes
			, {duration, direction: 'reverse'})
			animation.addEventListener('finish', function(){
				cl.remove('open')
			})
		}
		else {
			elem.animate(keyframes, {duration})
			cl.add('open')
		}
}

function delegate(box, selector, eventName, handler){
	box.addEventListener(eventName, function(e){
		let elem = e.target.closest(selector);

		if(elem !== null && box.contains(elem)){
			handler.call(elem, e);
		}
	});
}
