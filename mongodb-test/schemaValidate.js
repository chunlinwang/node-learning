const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const uri = process.env.DATABASE;
const client = new MongoClient(uri, { useUnifiedTopology: true });

const run = async () => {
  try {
    await client.connect();
    const rust = client.db('rust');

    await rust.command({
      collMod: 'students2',
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['name', 'year', 'major', 'address'],
          properties: {
            name: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            year: {
              bsonType: 'int',
              minimum: 2010,
              maximum: 3017,
              description:
                'must be an integer in [ 2017, 3017 ] and is required',
            },
            major: {
              enum: ['Math', 'English', 'Computer Science', 'History', null],
              description: 'can only be one of the enum values and is required',
            },
            gpa: {
              bsonType: ['double'],
              description: 'must be a double if the field exists',
            },
            address: {
              bsonType: 'object',
              required: ['city'],
              properties: {
                street: {
                  bsonType: 'string',
                  description: 'must be a string if the field exists',
                },
                city: {
                  bsonType: 'string',
                  description: 'must be a string and is required',
                },
              },
            },
          },
        },
      },
      validationLevel: 'moderate',
    });

    // await rust.createCollection('students2', {
    //   validator: {
    //     $jsonSchema: {
    //       bsonType: 'object',
    //       required: ['name', 'year', 'major', 'address'],
    //       properties: {
    //         name: {
    //           bsonType: 'string',
    //           description: 'must be a string and is required'
    //         },
    //         year: {
    //           bsonType: 'int',
    //           minimum: 2017,
    //           maximum: 3017,
    //           description:
    //             'must be an integer in [ 2017, 3017 ] and is required'
    //         },
    //         major: {
    //           enum: ['Math', 'English', 'Computer Science', 'History', null],
    //           description: 'can only be one of the enum values and is required'
    //         },
    //         gpa: {
    //           bsonType: ['double'],
    //           description: 'must be a double if the field exists'
    //         },
    //         address: {
    //           bsonType: 'object',
    //           required: ['city'],
    //           properties: {
    //             street: {
    //               bsonType: 'string',
    //               description: 'must be a string if the field exists'
    //             },
    //             city: {
    //               bsonType: 'string',
    //               description: 'must be a string and is required'
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // });

    const collection = await rust.collection('students2');
    let doc = {
      name: 'Black',
      year: 2012,
      major: 'English',
      address: {
        street: '2 Rue paris',
        city: 'Paris',
      },
    };
    let result = await collection.insertOne(doc);

    //doc = { name: 'Red', town: 'kanto' };
    //result = await collection.insertOne(doc);
  } finally {
    await client.close();
  }
};

run().catch(console.log);
