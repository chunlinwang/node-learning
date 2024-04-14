const X = {
    y: {
      c: {
        d: 1
      }
    },
    z: {
      e: {
        d: 2
      }
    },
    q: {
      f: {
        d: 3
      }
    },
    o: {
      m: {
        g: {
          h: {
            d: 4
          }
        }
      }
    }
  }

  //search all d value

  const lookupD = (obj) => {
    if (obj === null || typeof obj !== 'object') {
        return [];
    }

    const res = [];

    Object.entries(obj).map(([k, v]) => {
        if (k === 'd') {
            res.push(v);
        }

        if (v !== null && typeof v === 'object') {
            res.push(...lookupD(v));
        }
    })

    return res;
  }


  console.log(lookupD(X)); // [1,2,3,4]