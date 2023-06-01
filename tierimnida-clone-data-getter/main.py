import json
import time

import requests

API = "https://solved.ac/api/v3/"
HEADERS = {"Accept": "application/json"}


def main():
    global API, HEADERS

    problem_count = requests.get(API + "site/stats", headers=HEADERS).json()["problemCount"]
    print("Problem count: " + str(problem_count))

    levels = dict()

    for start in range(1000, 28200, 100):
        # noinspection PyBroadException
        try:
            response = requests.get(API + "problem/lookup", headers=HEADERS, params={
                "problemIds": ",".join([str(x) for x in range(start, start + 100)])}).json()

            for problem in response:
                levels[problem["problemId"]] = problem["level"]

            print(start)

            if len(levels) == problem_count:
                break
        except Exception as exception:
            print(exception)
        finally:
            time.sleep(15)

    data_js = open("../scripts/data.js", "w")
    data_js.write("const LEVELS = " + json.dumps(levels, indent=2) + "\n")
    data_js.close()

    print("Levels count: " + str(len(levels)))


if __name__ == "__main__":
    main()
