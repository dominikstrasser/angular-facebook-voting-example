# angular-facebook-voting-example

## Setup: 
```
npm install
ng serve
```

## search for "TODO"'s

1) Add Facebook App Id
2) Add Facebook UserId and PostId


## General Information
You need to create a webapp which uses the facebook graph api to visualize the reactions of the live stream. The webapp IS the live stream so you need a streaming program (OBS Studio) to capture your screen and strem it to facebook.

## Overview
* Download OBS Studio
* Create facebook app
* Create website and use the facebook graph api to query the “reactions”
* Create a Facebook Live Stream


## OBS Studio
* Download OBS Studio (google it…)
* Configure OBS Studio Video Settings (1280x720)
* Add a new “Quelle”, set it to “Fensteraufnahme” and select your Website (NOT “Browser Source”)

## Facebook App and Website
* create a facebook app → https://developers.facebook.com/
* add localhost to your trusted domains
* clone the example app and update the variables


## Create a live stream
* Go to https://www.facebook.com/live/create
* Create the live steam - you get a stream key which is needed in OPS studio
* the key contains the live stream id -> you need to pass this variable to your git project
