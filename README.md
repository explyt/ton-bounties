This repo contains examples of using a symbolic analyzer for TON smart contracts (sources and corresponding SARIF reports could be found in dirs bounty-*) and an executable script for running the analyzer.

To run the analyzer, ensure you have `Docker` installed and run the script `run_tsa.sh` from the root of the repo in the following way:

```
./run_tsa.sh [SOURCES_DIR_ABSOLUTE_PATH] [ANALYZER_OPTIONS] /project/[RELATIVE_PATH_TO_ANALYZED_SOURCE]
```
, where:

- `SOURCES_DIR_ABSOLUTE_PATH` is an absolute path to the dir where the sources are located;
- `ANALYZER_OPTIONS` consists of a target language and corresponding options (for more details, use `--help` as provided options);
- `RELATIVE_PATH_TO_ANALYZED_SOURCE` is a path to the source to analyze relatively to the `SOURCES_DIR_ABSOLUTE_PATH`.

For example, to analyze a Tact source file in the first bounty, you can run the following command:

```
./run_tsa.sh $PWD/bounty-1 tact -i /project/tact/division-by-zero/path-sensitive-division.tact
```
