const request = require('axios');
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const { petsFromHTML } = require('./helper');


module.exports.hello = (event, context, callback) => {
    let allPets;

    request('https://www.adoptapet.com/recent-pets')
        .then(({data}) => {
            const pets = petsFromHTML(data);
            console.log("success in fetching list");
        })
        .then(() => {
            return dynamo.put({
                TableName: 'petlist',
                Item: {
                    petId: new Date().toString(),
                    pets: allPets
                }
            }).promise();
        })
        .catch(callback);
};