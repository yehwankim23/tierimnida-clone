const problemsDivs = document.querySelectorAll("div.problem-list");
let problemsList = [];

for (const problemsDiv of problemsDivs) {
  let problems = [];

  for (const problem of problemsDiv.children) {
    const ID = problem.innerText;

    problems.push({
      id: ID,
      class: problem.className,
      level: levels[ID] ?? -31,
    });
  }

  problemsList.push(problems);
}

function getInnerHTMLs() {
  let innerHTMLs = [];

  for (const problems of problemsList) {
    let innerHTML = "";

    for (const problem of problems) {
      innerHTML += `<a href="/problem/${problem.id}" class="${problem.class}" style="color: #${
        ["404040", "ad5600", "435f7a", "ec9a00", "27e2a4", "00b4fc", "ff0062", "a0a0a0"][
          Math.floor((Math.abs(problem.level) - 1) / 5) + 1
        ]
      } !important">${problem.id}</a> `;
    }

    innerHTMLs.push(innerHTML);
  }

  return innerHTMLs;
}

const sortedById = getInnerHTMLs();

for (const problems of problemsList) {
  problems.sort((problem1, problem2) => {
    return problem2.level - problem1.level;
  });
}

const sortedByLevel = getInnerHTMLs();

function setInnerHTMLs(sortByLevel) {
  for (let index = 0; index < problemsDivs.length; index++) {
    problemsDivs[index].innerHTML = sortByLevel ? sortedByLevel[index] : sortedById[index];
  }
}

chrome.storage.local.get(["sortByLevel"]).then((items) => {
  setInnerHTMLs(items.sortByLevel);
});

chrome.storage.onChanged.addListener((changes, _areaName) => {
  setInnerHTMLs(changes.sortByLevel.newValue);
});
