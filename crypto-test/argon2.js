const argon2 = require('argon2');

argon2.argon2i;

const run = async () => {
  const hash = await argon2.hash('passw0rd', {
    // hashLength: 128,
    secret: 'secretkeysecretkey',
    raw: true,
    // timeCost?: number,
    // memoryCost?: number,
    // parallelism?: number,
    // type?: 0 | 1 | 2,
    // version?: number,
    salt: 'salt',
    // saltLength?: number,
    // raw?: boolean,
    // associatedData?: Buffer,
  });
};

argon2
  .hash('passw0rd', {
    raw: false,
    // salt: Buffer.from('salt'),
    // secret: 'secretkeysecretkey',
    // hashLength: 128,
    // timeCost: 5,
    // memoryCost: 128,
    // parallelism: 3,
    // type: 1,
    // version: 2,
    // saltLength: 4,
    //associatedData?: Buffer,
  })
  .then(
    (hash) => {
      console.log(hash);
      argon2.verify(hash, 'passw0rd').then((res) => {
        console.log(res);
      });
    },
    (e) => {
      console.log(e);
    }
  );
