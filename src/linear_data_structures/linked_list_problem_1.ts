import LinkedList, { LinkedListNode } from './linked_list.js';

/*
headOne = 1 -> 6 -> 7 -> 8 // the head node with value 2
headTwo = 2 -> 3 -> 4 -> 5 -> 9 -> 10 // the head node with value 1
mergeLinkedLists(headOne, headTwo) = 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 // the new head node with value 1
*/

const linkedListOne = new LinkedList(1);
linkedListOne.insert(6).insert(7).insert(8);

const linkedListTwo = new LinkedList(2);
linkedListTwo.insert(3).insert(4).insert(5).insert(9).insert(10);

// Iterative
const iterativeMergeLinkedLists = (headOne: LinkedListNode, headTwo: LinkedListNode) => {
    let nextHeadOne: LinkedListNode | null = headOne;
    let nextHeadTwo: LinkedListNode | null = headTwo;
    let prevHeadOne: LinkedListNode | null = null;

    while (nextHeadOne && nextHeadTwo) {
        // console.log('Next One: ', nextHeadOne?.value, 'Next Two: ', nextHeadTwo?.value);

        if (nextHeadOne.value <= nextHeadTwo.value) {
            prevHeadOne = nextHeadOne;
            nextHeadOne = nextHeadOne.next;
        } else {
            if (prevHeadOne) {
                prevHeadOne.next = nextHeadTwo;
            }
            prevHeadOne = nextHeadTwo;
            nextHeadTwo = nextHeadTwo.next;
            prevHeadOne.next = nextHeadOne;
        }
    }

    if (nextHeadOne === null && prevHeadOne) {
        prevHeadOne.next = nextHeadTwo;
    }

    return headOne.value < headTwo.value ? headOne : headTwo;
};

console.log(iterativeMergeLinkedLists(linkedListOne.head, linkedListTwo.head).print());

// Recursive

// function mergeLinkedLists(headOne, headTwo) {
//     recursiveMerge(headOne, headTwo, null);
//     return headOne.value < headTwo.value ? headOne : headTwo;
// }
//
// function recursiveMerge(p1, p2, p1Prev) {
//     if (p1 === null) {
//         p1Prev.next = p2;
//         return;
//     }
//     if (p2 === null) return;
//     if (p1.value < p2.value) {
//         recursiveMerge(p1.next, p2, p1);
//     } else {
//         if (p1Prev !== null) p1Prev.next = p2;
//         const newP2 = p2.next;
//         p2.next = p1;
//         recursiveMerge(p1, newP2, p2);
//     }
// }