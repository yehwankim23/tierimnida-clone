import json
import time

import requests

api = "https://solved.ac/api/v3/"
headers = {"Accept": "application/json"}


def main():
    global api, headers

    problem_count = requests.get(api + "site/stats", headers=headers).json()["problemCount"]
    print("problem_count: " + str(problem_count) + "\n")

    levels = dict()

    for start in range(1000, 31100, 100):
        # noinspection PyBroadException
        try:
            response = requests.get(api + "problem/lookup", headers=headers, params={
                "problemIds": ",".join([str(x) for x in range(start, start + 100)])}).json()

            for problem in response:
                levels[problem["problemId"]] = problem["level"]

            print(start, end=" ")

            if len(levels) == problem_count:
                break
        except Exception as exception:
            print("\n" + str(exception))
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
