const { MongoClient, Db } = require('mongodb');

const uri = 'mongodb://mongo/student';

// client connect
/*
MongoClient.connect(uri, {
    authSource: 'admin',
    auth: {
        user: 'root',
        password: 'root',
    }
}, (err, client) => {
    if (err) {
        console.log(err);

        return;
    }
    
    console.log('conntection status:', client.isConnected());
} );
*/

const client = new MongoClient(uri, {
    authSource: 'admin',
    auth: {
        user: 'root',
        password: 'root',
    }
});


const dbName = 'student';
const collectionName = 'student';

// insert test
/*
const run =  async () => {
    try {
    await client.connect();

    const db = client.db(dbName);

    const collection = db.collection(collectionName);

    const result = await collection.insertOne({id: '1001', name: 'Justin', age: 8} )

    console.log("studrnt inserted: "+ result);
    } finally {
        client.close();
    }
}*/

const run = async () => {
    try {
        await client.connect();

        const db = client.db(dbName);

        const collections = await db.collections();

        console.log(collections);

        const collection = db.collection(collectionName);


        const docs = [
            {name: 'Leo', age: '1' },
            {name: 'Justin', age: '10' },
            {name: 'Mary', age: '20' },
        ];

        const mulitiInsert = await collection.insertMany(docs, { ordered: true });

        console.log(mulitiInsert);

        // findby
        const cursor = collection.find({}, {sort: {age: 1}, limit: 100, skip: 0});

        // print a message if no documents were found
        if ((await cursor.count()) === 0) {
            console.log("No documents found!");
        }
        
        await cursor.forEach(console.dir);

        // find one by 
        const resultFindOne = await collection.findOne({name: 'Jack'});

        console.log(resultFindOne);

        const options = { upsert: true };

        const filter = {name: 'Jack'}

        const updateDoc = {
            $set: {
              age: 15,
            },
          };
          
        const resultUpdate = await collection.updateOne(filter, updateDoc, options);

        console.log(resultUpdate);

        //detete one
        await collection.deleteMany({name: 'Leo'});

        // multi delete
        await collection.deleteMany({name: 'Justin'});

        //
    } finally {
        client.close()
    }
}

run().catch(console.dir);

