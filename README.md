# VNUTool
This tool is used for auto-registering subjects at VNU server and to find any account which has a week password

This tool is written by Javascript. I use casperjs and phantomjs to automatically search for subjects and register them. It is very useful for anyone who cannot register Physical Education manually.
I also wrote some scripts to search for any account whose their owners haven't change the default password. It is just for fun.

## How to use :
- Install **phantomjs** and **casperjs**
- Go to Terminal and type: 
  ```casperjs autoregister.js [STUDENT_ID] [STUDENT_PASSWORD]```

Wait until the tool finds some empty slot for you.

I set the tool to repeat 10000 times. You can edit file **autoregister.js** for custom options.
