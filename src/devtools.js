const evalInPage = (statement, options = {}) => {
	if (!chrome.devtools.inspectedWindow) return Promise.reject('There is no chrome.devtools.inspectedWindow');
	return new Promise((resolve, reject) => {
		chrome.devtools.inspectedWindow.eval(statement, options, (result, isException) => {
			if (isException) reject('Could not eval statement in inspectedWindow');
			else resolve(result);
		});
	});
};

const evalInContentScript = (statement) => {
	return evalInPage(statement, { useContentScriptContext: true }); // This does not work in Firefox: “useContentScriptContext”
};

chrome.devtools.panels.elements.onSelectionChanged.addListener(async () => {
    await evalInContentScript('console.log("onSelectionChanged")');
    await evalInContentScript('console.log($0);');
});