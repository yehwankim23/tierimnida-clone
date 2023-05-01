async function setSortByLevel(sortByLevel) {
  await chrome.storage.local.set({ sortByLevel: sortByLevel }).then(() => {
    chrome.action.setBadgeText({ text: sortByLevel ? "ON" : "OFF" });
    chrome.action.setBadgeTextColor({ color: "white" });
    chrome.action.setBadgeBackgroundColor({ color: sortByLevel ? "green" : "gray" });
  });
}

async function getSortByLevel() {
  return await chrome.storage.local.get(["sortByLevel"]).then((items) => {
    return items.sortByLevel ?? true;
  });
}

chrome.runtime.onInstalled.addListener(async (_details) => {
  await setSortByLevel(await getSortByLevel());
});

chrome.runtime.onStartup.addListener(async () => {
  await setSortByLevel(await getSortByLevel());
});

chrome.action.onClicked.addListener(async (_tab) => {
  await setSortByLevel(!(await getSortByLevel()));
});
