class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashMap {
  buckets = new Array(16).fill(null);
  size = 0;
  loadFactor = 0.75;

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }

    return hashCode;
  }

  set(key, value) {
    if (this.size > this.loadFactor * this.buckets.length) this.#grow(); // Load factor exceeded

    const hashCode = this.hash(key);
    const currBucket = this.buckets[hashCode];
    let isUpdate = false;

    // New Bucket
    if (currBucket === null) {
      this.buckets[hashCode] = new Node(key, value);
      this.size++;
      return;
    }

    // Update value
    let currNode = currBucket;
    while (currNode !== null) {
      if (currNode.key === key) {
        currNode.value = value;
        isUpdate = true;
      }
      currNode = currNode.next;
    }

    // Collisions
    if (!isUpdate) {
      currBucket.next = new Node(key, value);
      this.size++;
    }
  }

  get(key) {
    const hashCode = this.hash(key);
    const currBucket = this.buckets[hashCode];

    if (currBucket === null) return null; // Bucket does not exist

    let currNode = currBucket;
    while (currNode !== null) {
      if (currNode.key === key) {
        return currNode.value;
      }
      currNode = currNode.next;
    }

    return null; // Node not found
  }

  has(key) {
    const hashCode = this.hash(key);
    const currBucket = this.buckets[hashCode];

    if (currBucket === null) return false; // Bucket does not exist

    let currNode = currBucket;
    while (currNode !== null) {
      if (currNode.key === key) {
        return true;
      }
      currNode = currNode.next;
    }

    return false; // Node not found
  }

  remove(key) {
    const hashCode = this.hash(key);
    const currBucket = this.buckets[hashCode];

    // Bucket not found
    if (currBucket === null) return false;

    let temp = null;
    let currNode = currBucket;
    while (currNode !== null) {
      if (currNode.key === key) {
        if (temp === null) {
          this.buckets[hashCode] = currNode.next; // Removing head
        } else {
          temp.next = currNode.next; // Remove other part
        }
        this.size--;
        return true;
      }

      temp = currNode;
      currNode = currNode.next;
    }

    return false; // Node not found
  }

  length() {
    return this.size;
  }

  clear() {
    this.size = 0;
    this.buckets = new Array(16).fill(null);
    return true;
  }

  keys() {
    const keyArr = [];
    const notNullBuckets = this.buckets.filter(Boolean); // Filter null element

    notNullBuckets.forEach((bucket) => {
      let currNode = bucket;
      while (currNode !== null) {
        keyArr.push(currNode.key);
        currNode = currNode.next;
      }
    });

    return keyArr;
  }

  values() {
    const valArr = [];
    const notNullBuckets = this.buckets.filter(Boolean);

    notNullBuckets.forEach((bucket) => {
      let currNode = bucket;
      while (currNode !== null) {
        valArr.push(currNode.value);
        currNode = currNode.next;
      }
    });

    return valArr;
  }

  entries() {
    const entryArr = [];
    const notNullBuckets = this.buckets.filter(Boolean);

    notNullBuckets.forEach((bucket) => {
      let currNode = bucket;
      while (currNode !== null) {
        entryArr.push([currNode.key, currNode.value]);
        currNode = currNode.next;
      }
    });

    return entryArr;
  }

  #grow() {
    this.size = 0;
    const newSize = Math.floor(this.buckets.length * 1.25);
    const entries = this.entries();

    // Rehash items
    this.buckets = new Array(newSize).fill(null); //Reset and add 25%
    for (const [key, value] of entries) {
      this.set(key, value);
    }
  }
}
