# Installation #

Requires nodejs and phonegap/cordova.

I use cordova

```bash
npm install -g cordova
```

Just install whichever platform you want to build for

Do not include  {} and only select the desired platform

```bash
cordova platform add {android,ios,wp8}
```
Then plugins will need installing

Bluetooth LE plugin
```bash
cordova plugin add https://github.com/randdusing/BluetoothLE
```

Finally to build just use either
```bash
cordova build {android,ios,wp8}
```

or

```bash
cordova run {android,ios,wp8}
```
