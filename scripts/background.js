function setSortByLevel(sortByLevel) {
  chrome.storage.local.set({ sortByLevel: sortByLevel });
  chrome.action.setBadgeText({ text: sortByLevel ? "ON" : "OFF" });
  chrome.action.setBadgeBackgroundColor({ color: sortByLevel ? "green" : "red" });
}

chrome.runtime.onInstalled.addListener(() => {
  setSortByLevel(false);
});

chrome.action.onClicked.addListener((_) => {
  chrome.storage.local.get(["sortByLevel"]).then((result) => {
    setSortByLevel(!result.sortByLevel);
  });
});
