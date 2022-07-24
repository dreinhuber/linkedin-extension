const getURL = async () => {
    const [tab] = await chrome.tabs.query({active: true});
    return tab.url
}

chrome.runtime.onInstalled.addListener(async () => {
    const url = await getURL()
    chrome.storage.sync.set({ url });
    console.log(`the current url is: ${url}`);
});