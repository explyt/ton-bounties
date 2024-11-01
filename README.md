This repo contains examples of using a symbolic analyzer for TON smart contracts (sources and corresponding SARIF reports could be found in dirs bounty-*) and an executable script for running the analyzer.
Before running, ensure you have `Docker` installed.

### General analysis

To run the analyzer in general analysis mode, 
execute the script `run_tsa.sh` from the root of the repo in the following way:

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

### Safety properties checker

To run the analyzer in safety properties checker mode, 
execute the script `run_tsa.sh` from the root of the repo in the following way:

```
./run_tsa.sh -c --address [JETTON_MASTER_ADDRESS]
```

, where:

- `JETTON_MASTER_ADDRESS` is the address of the jetton-master contract (according to the [specification](https://github.com/ton-blockchain/TEPs/blob/master/text/0074-jettons-standard.md)).

The result of the analysis is a list of blacklisted addresses 
(i.e., addresses that can not be a destination of token transfers) in the corresponding jetton-wallet contract.
