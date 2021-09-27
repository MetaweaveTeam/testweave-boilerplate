# Purpose

Here is a simple boilerplate to code smartweave contracts and iterate tests quickly.

# Getting started

1. `$ git clone git@github.com:bidetaggle/testweave-boilerplate.git --recursive`
2. `$ cd testweave-boilerplate/`
3. `$ npm install`

# Initialization

1. Run testweave-docker

```
$ cd testweave-docker
$ docker-compose up
```

2. In a separate terminal, `$ cd src/`

3. Generate user wallets

```
$ node generate-wallets.js
```

# Usage

1. Deploy the contract you are working on

```
$ node contract.js deploy <contract name>
```
This command will find the contract file `<contract name>.js` and its initial state file `<contract name>.json` situated in `/contracts/` directory.

2. Edit `INPUT.js` as you like

3. Interact with the last contract deployed

```
$ node contract.js interact [wallet number (opt: default=0)]
```

And that's it 🙂

----

Also, you can read the contract state at anytime by using:
```
$ node contract.js read
```

# Troubleshooting

If you get issues with testweave-docker, it sometimes helps to hard reset:
1. `$ docker-compose down` if it's still running
2. `$ docker container prune`
3. `$ docker volume prune`
4. `$ docker-compose up` 