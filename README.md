# setup


Node 10 LTS or higher required.

install EXPO CLI

`npm install -g expo-cli`
or
`yarn global add expo-cli`


`cd cobra-react native`


`npm install`
or
`yarn install`




# run simulation in expo go app

Download expo Go App on Android or Iphone and run

`expo start`
 
 Scann QR-Code with App


# build app

## android

Download and install Android platform tools & adb


`expo build:android -t apk`

install on device


`cd /path/to/platform-tools`

`./adb install ../cobra-react-native.apk`




## iOS

bezahlter developer account notwendig

expo build:ios -t archive