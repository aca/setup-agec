# setup-agec

Sets up https://github.com/aca/agec, for use in github action workflow.

## Usage
```
steps:
    - uses: actions/checkout@v3
    - uses: aca/setup-agec@main
    - run: agec --version
```
