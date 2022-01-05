//=======================================================
//
// bodyのスクロール固定
//
//=======================================================

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

// body scroll lock
function lockBodyScroll(scrollLockTarget){
	disableBodyScroll(scrollLockTarget, {
		reserveScrollBarGap: true,
		}
	);
}

// body scroll unlock
function unlockBodyScroll(scrollLockTarget){
	enableBodyScroll(scrollLockTarget);
}

export {lockBodyScroll, unlockBodyScroll };