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

document.querySelectorAll("div.problem-list").forEach((problemList) => {
  let problems = problemList.innerHTML.split("</a> ");
  let innerHTML = "";

  for (let i = 0; i < problems.length - 1; i++) {
    let [a, problem] = problems[i].split(">");
    innerHTML += `${a}style="color: #${getTierColor(LEVELS[problem])} !important">${problem}</a> `;
  }

  problemList.innerHTML = innerHTML;
});
