"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LinkedListNode {
    value = null;
    next = null;
    constructor(value) {
        this.value = value;
    }
    insert = (value) => {
        if (!this.next) {
            const newNode = new LinkedListNode(value);
            this.next = newNode;
            return newNode;
        }
        else {
            return this.next.insert(value);
        }
    };
    print = () => {
        console.log(this.value);
        if (this.next) {
            this.next.print();
        }
    };
    iterate = (cb) => {
        cb(this.value);
        if (this.next) {
            this.next.iterate(cb);
        }
    };
}
class LinkedList {
    head;
    tail;
    constructor(value) {
        this.head = new LinkedListNode(value);
        this.tail = this.head;
    }
    insert = (value) => {
        const newTail = this.head.insert(value);
        this.tail = newTail;
    };
}
const ll = new LinkedList(1);
ll.insert(2);
ll.insert(3);
console.log('Head: ', ll.head.value, 'Tail :', ll.tail.value);
//# sourceMappingURL=linked_list.js.map