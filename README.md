# Various ready-to-go node performance scripts

## How to run

Clone this repo.
```sh
git clone https://github.com/koresar/bench-node.git
```
Install dependencies:
```sh
cd bench-node
npm i
```

### Current Node.js version

```sh
node filter/1.js
```

### Several Node.js versions

Install [nvm](https://github.com/creationix/nvm#install-script).
Restart your shell.
Install node versions 0.10, 0.12, 4, 5, 6.
```sh
for v in 0.10 0.12 4 5 6; do nvm install $v; done
```

Run the script:
```sh
./run.sh clone/1.js
```
