const deepCopy = (origin) => {
  if (Array.isArray(origin)) {
    const copy = [];

    for (const [index, value] of origin.entries()) {
      copy[index] = deepCopy(value);
    }

    return copy;
  } else if (typeof origin === "object" && origin !== null) {
    const copy = {};
    for (const [key, value] of Object.entries(origin)) {
      copy[key] = deepCopy(value);
    }
    return copy;
  } else {
    return origin;
  }
};

const arr = [1, 2, 3, {a: 1}, 5, 6];

const a = deepCopy(arr);

console.log(a[2] === arr[2]);
