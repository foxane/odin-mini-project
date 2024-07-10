class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  #size = 0;

  constructor(root) {
    this.root = new Node(root);
    this.#size++;
  }

  append(value) {
    if (this.#size === 0) {
      this.root = new Node(value);
      this.#size++;
      return;
    }

    let current = this.root;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = new Node(value);
    this.#size++;
  }

  prepend(value) {
    const temp = this.root;
    this.root = new Node(value);
    this.root.next = temp;
    this.#size++;
  }

  size() {
    return this.#size;
  }

  head() {
    return this.root;
  }

  tail() {
    let current = this.root;
    while (current.next !== null) {
      current = current.next;
    }
    return current;
  }

  at(index) {
    let current = this.root;
    let i = 0;
    while (current !== null) {
      if (i === index) return current;
      i += 1;
      current = current.next;
    }
  }

  pop() {
    const beforeEnd = this.at(this.#size - 2);
    const temp = new Node(beforeEnd.next.value);
    beforeEnd.next = null;
    this.#size--;
    return temp;
  }

  contains(value) {
    let current = this.root;
    while (current !== null) {
      if (current.value === value) return true;
      current = current.next;
    }
    return false;
  }

  find(value) {
    let [i, current] = [0, this.root];
    while (current !== null) {
      if (current.value === value) {
        return i;
      }
      current = current.next;
      i++;
    }

    return null;
  }

  toString() {
    let str = '';
    let current = this.root;
    while (current !== null) {
      str += `( ${current.value} ) => `;
      current = current.next;
    }
    str += `( null )`;
    return str;
  }

  insertAt(value, index) {
    console.log(arguments.length);
    try {
      if (arguments.length < 2)
        throw new ReferenceError(
          'arg1 = value or arg2 = index is not specified!',
        );
      if (index > this.#size - 1 || index < 0)
        throw new RangeError(
          `Index ${index} is out of bound!\nUse append(), prepend(), or size() if you are unsure of the range!`,
        );
    } catch (error) {
      console.log(error);
      return;
    }

    if (index === this.#size - 1) {
      this.append(value);
    } else if (index === 0) {
      this.prepend(value);
    } else {
      const a = this.at(index - 1);
      const b = a.next;
      a.next = new Node(value);
      a.next.next = b;
      this.#size++;
    }
  }

  removeAt(index) {
    try {
      if (arguments.length < 1)
        throw new ReferenceError('Failed to remove : Index is not specified!');
      if (index > this.#size - 1 || index < 0)
        throw new RangeError(
          `Index ${index} is out of bound!\nUse append(), prepend(), or size() if you are unsure of the range!`,
        );
    } catch (error) {
      console.log(error);
      return;
    }

    if (index === 0) {
      const temp = this.root;
      this.root = this.root.next;
      this.#size--;
      return temp;
    } else if (index === this.#size - 1) {
      this.pop();
    } else {
      const a = this.at(index - 1);
      const temp = a.next;
      a.next = a.next.next;
      this.#size--;
      return temp;
    }
  }
}
