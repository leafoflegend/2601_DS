export class LinkedListNode {
    value: any = null;

    next: null | LinkedListNode = null;

    constructor(value: any) {
        this.value = value;
    }

    insert = (value: any): LinkedListNode => {
        if (!this.next) {
            const newNode = new LinkedListNode(value);

            this.next = newNode;

            return newNode;
        } else {
            return this.next.insert(value);
        }
    };

    print = () => {
        console.log(this.value);

        if (this.next) {
            this.next.print();
        }
    };

    iterate = (cb: (value: any) => void) => {
        cb(this.value);

        if (this.next) {
            this.next.iterate(cb);
        }
    };
}

class LinkedList {
    head: LinkedListNode;

    tail: LinkedListNode;

    constructor(value: any) {
        this.head = new LinkedListNode(value);
        this.tail = this.head;
    }

    insert = (value: any) => {
        const newTail = this.head.insert(value);

        this.tail = newTail;

        return this;
    };

    iterate = (cb: (value: any) => void) => this.head.iterate(cb);

    print = () => this.head.print();
}

const ll = new LinkedList(1);

ll.insert(2);
ll.insert(3);

export default LinkedList;
