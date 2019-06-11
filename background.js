browser.browserAction.onClicked.addListener(tab => {
	browser.storage.local.get(tab.url).then(scrollAmtObj => {
		if(scrollAmtObj[tab.url] == undefined) {
			browser.storage.local.set({[tab.url]: 0})
			setEnabled(tab.id)
		} else {
			browser.storage.local.remove(tab.url)
			setDisabled(tab.id)
		}
	})
})

browser.runtime.onMessage.addListener((msg, sender) => {
	if(msg == 'init') {
		var url = sender.tab.url
		browser.storage.local.get(url).then(scrollAmtObj => {
			if(scrollAmtObj[url] == undefined) {
				setDisabled(sender.tab.id)
			} else {
				setEnabled(sender.tab.id)
			}
		})
	}
})

function setDisabled(tabId) {
	browser.browserAction.setIcon({
		tabId,
		path: {
			"16": "icons/scrollsave-48-off.png",
			"32": "icons/scrollsave-48-off.png"
		}
	})
	browser.browserAction.setTitle({tabId, title: 'Enable ScrollSave for this page'})
}

function setEnabled(tabId) {
	browser.browserAction.setIcon({
		tabId,
		path: {
			"16": "icons/scrollsave-48.png",
			"32": "icons/scrollsave-48.png"
		}
	})
	browser.browserAction.setTitle({tabId, title: 'Disable ScrollSave for this page'})
}