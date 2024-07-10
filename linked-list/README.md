# Usage

Singly linked list, the simplist of thy list.

### Creating list

```js
const list = new LinkedList(foo); // Create new instance with foo as value for root
```

### Methods

#### Setter

```js
list.append(value); // Append to the end of list
list.preprend(value); // Append to start of list (this also change list's root)
lsit.pop(); // Remove last item of list and returning it
list.insertAt(value, index); // I know, i should use index as the first argument
list.removeAt(index); // Comment
```

#### Getter

```js
list.size(); // Return total amount of item
list.head(); // Return list's root
list.tail(); // Return something
list.at(index); // Return node based of index
list.contains('bic'); // Return true if node with value of 'bic' exist
list.find(value); // Return index based on value, return null when doesnt exist
list.toString(); // Return root to tail combined into string
```
