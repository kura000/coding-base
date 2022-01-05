//=======================================================
//
// ナビの開閉
//
//=======================================================
import {lockBodyScroll, unlockBodyScroll} from "./lockBodyScroll"

function toggleNav(){
	const navTrigger = document.getElementById('js-nav-trigger');
	console.log(navTrigger);
	const header = document.querySelector('.l-header');
	console.log(header);
	const headerMenu = document.querySelector('.l-header__menu');
	console.log(headerMenu);

	navTrigger.addEventListener('click', () => {
		if( !header.classList.contains('isOpen')){
			// header navが開いていない場合
			console.log('header is not open, then open');
			navTrigger.classList.add('isOpen');
			header.classList.add('isOpen');
			lockBodyScroll(headerMenu);
		} else {
			// header navが既に開いている場合
			console.log('header is already open, so close')
			navTrigger.classList.remove('isOpen');
			header.classList.remove('isOpen');
			unlockBodyScroll(headerMenu);
		}
	})
}

export { toggleNav };