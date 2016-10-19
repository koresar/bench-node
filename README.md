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

### Run a test on your current Node.js version

Copy one of the lines below and execute in a shell:
```sh
node filter/1.js
node filter/2.js
node filter/3.js
node filter/4.js
node filter/5.js
node map/1.js
node map/2.js
node map/3.js
node map/4.js
node map/5.js
node flatten/1.js
node flatten/2.js
node clone/1.js
node clone/2.js
node throw/1.js
```

### Run a test on the several Node.js versions

Install [nvm](https://github.com/creationix/nvm#install-script).
Restart your shell.
Install node versions 0.10, 0.12, 4, 5, 6.
```sh
for v in 0.10 0.12 4 5 6; do nvm install $v; done
```

Run the test under several node.js versions like so:
```sh
./all_nodes.sh clone/1.js
```
See the list of tests above.
