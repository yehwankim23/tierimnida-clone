async function setSortByLevel(sortByLevel) {
  await chrome.storage.local.set({ sortByLevel: sortByLevel }).then(() => {
    chrome.action.setBadgeText({ text: sortByLevel ? "ON" : "OFF" });
    chrome.action.setBadgeTextColor({ color: "white" });
    chrome.action.setBadgeBackgroundColor({ color: sortByLevel ? "green" : "gray" });
  });
}

async function getSortByLevel() {
  return await chrome.storage.local.get(["sortByLevel"]).then((result) => {
    return result.sortByLevel;
  });
}

chrome.runtime.onInstalled.addListener(async () => {
  await setSortByLevel(false);
});

chrome.runtime.onStartup.addListener(async () => {
  await setSortByLevel(await getSortByLevel());
});

chrome.action.onClicked.addListener(async (_) => {
  await setSortByLevel(!(await getSortByLevel()));
});
