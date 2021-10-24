# setup


Node 10 LTS or higher required.

install EXPO CLI

`npm install -g expo-cli`


`cd cobra-react native`



# run simulation in expo go app

`expo start`



# build app

## android

Android platform tools & adb


`expo build:android -t apk`

install on device


`cd /path/to/platform-tools`

`./adb install ../cobra-react-native.apk`



https://docs.expo.dev/distribution/building-standalone-apps/#android


https://www.oracle.com/webapps/redirect/signon?nexturl=https://download.oracle.com/otn-pub/java/jdk/11.0.13%2B10/bdde8881e2e3437baa70044f884d2d67/jdk-11.0.13_osx-x64_bin.dmg

## iOS

bezahlter developer account notwendig

expo build:ios -t archive