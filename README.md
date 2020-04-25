# covid-19
The app can be run using: 

* Node.js and NPM
* Docker Build (Requires Docker)
* Docker Image (Requires Docker)

# INstall Node.js and NPM
It should work for linux and Mac.
# Install brew
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
brew -v
```
Install nodejs and npm
```
brew install node
node -v
npm -v
```
Go to directory, run -
```
npm install
```
Now, run the application using -
```
node server.js
```

Go to `http://localhost:3000`. You will see the frontend. Enter name of any country. There should details information.

# Using Docker
Download and install docker desktop from here (Windows and mac supported).
```
https://www.docker.com/products/docker-desktop
```

You can build the image and run or you can directly run the image from docker registry. Directly, run the image from docker registry:
```
docker run -it --rm --name covid-19 -p 3000:3000 raahat/covid-19:latest
```
Upon successful execution, there should be following output:
```
Server is running in 3000
```

If you want to build and run , then go to directory and run -
```
docker build -t covid-19:latest .
docker run -it --rm --name covid-19 -p 3000:3000 covid-19:latest
```