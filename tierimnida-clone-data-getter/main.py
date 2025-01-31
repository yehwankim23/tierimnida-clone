import json
import time

import requests


def main():
    api = "https://solved.ac/api/v3/"
    headers = {"Accept": "application/json"}

    problem_count = requests.get(api + "site/stats", headers=headers).json()["problemCount"]
    print("problem_count: " + str(problem_count) + "\n")

    start = 1000
    levels = dict()

    while True:
        try:
            response = requests.get(api + "problem/lookup", headers=headers, params={
                "problemIds": ",".join([str(x) for x in range(start, start + 100)])}).json()

            if not response:
                break

            for problem in response:
                levels[problem["problemId"]] = problem["level"]

            print(start, end="\t")
            start += 100

            if start % 1000 == 0:
                print()
        finally:
            time.sleep(5)

    levels_length = len(levels)
    print("\nlevels_length: " + str(levels_length))
    print("problem_count - levels_length: " + str(problem_count - levels_length))

    data_js = open("../scripts/data.js", "w")
    data_js.write("const levels = " + json.dumps(levels, indent=2) + "\n")
    data_js.close()


if __name__ == "__main__":
    main()
