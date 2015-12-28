## Testing 
I am using the includes.keys instead of to.equal for most test since I add a unique ID and created_date which does not fit well with equals lol

try to get the webpack -dev-middlewaer with express working again 

try to get hot module reload wokring by setting up .babelrc file
- had to put NODE_ENV=test (something other than development or undefined) since the .bablerc file will start the react-hmr plugin which throws an error for the testing. 


## Travis CI
 Any commit or push that I do not want to be built by travisCI I can add [ci skip] to the footer of the commit message.
