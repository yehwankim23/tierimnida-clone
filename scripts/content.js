function getTierColor(level) {
  if (level === undefined) {
    return "a0a0a0";
  }

  if (level === 0) {
    return "404040";
  }

  if (level <= 5) {
    return "ad5600";
  }

  if (level <= 10) {
    return "435f7a";
  }

  if (level <= 15) {
    return "ec9a00";
  }

  if (level <= 20) {
    return "27e2a4";
  }

  if (level <= 25) {
    return "00b4fc";
  }

  return "ff0062";
}

function getInnerHTMLs() {
  let innerHTMLs = {};

  for (let i = 0; i < problemLists.length; i++) {
    let innerHTML = "";

    for (let problem of problemList[i]) {
      innerHTML += `<a href="/problem/${problem.problemId}" class="${problem.className}" style="color: #${problem.tierColor} !important">${problem.problemId}</a> `;
    }

    innerHTMLs[i] = innerHTML;
  }

  return innerHTMLs;
}

function setInnerHTMLs(sortByLevel) {
  for (let i = 0; i < problemLists.length; i++) {
    problemLists[i].innerHTML = sortByLevel ? sortedInnerHTMLs[i] : unsortedInnerHTMLs[i];
  }
}

let problemLists = document.querySelectorAll("div.problem-list");
let problemList = {};

for (let i = 0; i < problemLists.length; i++) {
  let problems = [];

  for (let child of problemLists[i].children) {
    let problemId = child.innerText;
    let level = LEVELS[problemId];

    problems.push({
      problemId: problemId,
      className: child.className,
      level: level,
      tierColor: getTierColor(level),
    });
  }

  problemList[i] = problems;
}

let unsortedInnerHTMLs = getInnerHTMLs();

for (let i = 0; i < problemLists.length; i++) {
  problemList[i].sort((problem1, problem2) => {
    return problem2.level - problem1.level;
  });
}

let sortedInnerHTMLs = getInnerHTMLs();

chrome.storage.local.get(["sortByLevel"]).then((items) => {
  setInnerHTMLs(items.sortByLevel);
});

chrome.storage.onChanged.addListener((changes, _areaName) => {
  setInnerHTMLs(changes.sortByLevel.newValue);
});
