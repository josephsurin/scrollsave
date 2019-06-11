//initialisation
browser.runtime.sendMessage('init')

window.addEventListener('beforeunload', () => {
	browser.storage.local.get(window.location.href).then(scrollAmtObj => {
		if(scrollAmtObj[window.location.href] != undefined) {
			var scrollAmt = window.scrollY
			browser.storage.local.set({ [window.location.href]: scrollAmt })
		}
	})
})

browser.storage.local.get(window.location.href).then(scrollAmtObj => {
	if(scrollAmtObj[window.location.href] != undefined) {
		scrollAmt = scrollAmtObj[window.location.href]
		var bookmarkEl = createBookmark(scrollAmt)
		document.body.appendChild(bookmarkEl)
		window.scrollTo(0, scrollAmt)
	}
})

const createBookmark = scrollAmt => {
	var bookmarkEl = document.createElement('button')
	bookmarkEl.style.position = 'absolute'
	bookmarkEl.style.top = scrollAmt+'px'
	bookmarkEl.style.backgroundColor = '#deebf2'
	bookmarkEl.style.padding = '20px'
	bookmarkEl.style.color = '#405560'
	bookmarkEl.style.borderRadius = '4px'
	bookmarkEl.style.border = 'none'
	bookmarkEl.style.cursor = 'pointer'
	bookmarkEl.appendChild(document.createTextNode(`ScrollSaved on ${new Date().toLocaleString()}`))
	bookmarkEl.onclick = () => { bookmarkEl.remove() }
	return bookmarkEl
}