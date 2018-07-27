# Project Title
A Simple NodeJS project with selenium and headless chrome built on serverless framework

## Note:
This project has two lambda functions in the "****helper.js****" file which is the entry point for the project: 
* "petlist" # fetches a pet-adoption site, scrapes pet listings, stores it in DynamoDB
* "seleniumtest" # shows an example of how to use selenium with headless chrome on AWS Lambda

### Pre-Requisites
 * npm
 * node.js 6.10
####### plugin to test lambda functions locally (https://www.npmjs.com/package/lambda-local)
 * $ npm install -g lambda-local
####### the following are included in the ./lib/* folder
 * headless chrome=60.0.3095.0  # this is also included in the ./lib/* folder in the project
 * chromedriver=2.32.498513    # selenium-webdriver is currently picky about which version of headless chrome it can work with 
####### an AWS KEY and S3 Bucket
 export or save the AWS KEY and Secret KEY as environment variables (example: in bash_profile)
 * https://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html
 
#### Once you clone/download the project. Unzip the chrome binaries and node_modules by running the script below
```
$ ./scripts/unpack.sh
```
or directly run the unzip command from project root
```
$ unzip lib.zip
```
```
$ npm install
```


#### Install the serverless framework (https://serverless.com/learn/quick-start/)
```
$ npm install -g serverless
```


#### The following plugin is optional to reduce the node module/function size:
```
$ npm install modclean
$ modclean
```

#### To deploy the project to AWS
```
$ serverless deploy
```
once deployed your lambda functions will show up in the AWS lambdas dashboard
you can select and test a lambda directly on there too.


#### To test the lambda function locally. Here "sampleevent.json" is a a sample event input to the "run" lambda function
Example: 
```
$ lambda-local -l selenium_example.js -h run -e ./event_samples/sampleevent.json
```

#### To test a function locally
#### Here `**petlist**` is our function name from the `**helper.js**` file
```$ serverless invoke local --function petlist```


### For additional configurations to AWS like Region, Service Name, timeout, memory, iam Roles, Buckets and Resources refer the `serverless.yml` template


