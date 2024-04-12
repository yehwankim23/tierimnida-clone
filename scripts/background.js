async function setSortByLevel(sortByLevel) {
  await chrome.storage.local.set({ sortByLevel: sortByLevel }).then(() => {
    chrome.action.setIcon({
      path: sortByLevel
        ? {
            16: "../images/sorted-16.png",
            32: "../images/sorted-32.png",
            48: "../images/sorted-48.png",
            128: "../images/sorted-128.png",
          }
        : {
            16: "../images/unsorted-16.png",
            32: "../images/unsorted-32.png",
            48: "../images/unsorted-48.png",
            128: "../images/unsorted-128.png",
          },
    });
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
