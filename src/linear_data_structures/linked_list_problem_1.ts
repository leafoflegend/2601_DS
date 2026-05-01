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
    // NOTE: We are merging into list one - we are slowly moving all nodes into the first list.
    let nextHeadOne: LinkedListNode | null = headOne;
    let nextHeadTwo: LinkedListNode | null = headTwo;
    let prevHeadOne: LinkedListNode | null = null;

    // NOTE: While both lists have nodes we continue running.
    while (nextHeadOne && nextHeadTwo) {
        // NOTE: If the first lists current node is less than the second lists, we move the current node of list one forward. We store the previous node for later.
        if (nextHeadOne.value <= nextHeadTwo.value) {
            prevHeadOne = nextHeadOne;
            nextHeadOne = nextHeadOne.next;
        } else {
            // NOTE: When the first list DOES have a greater number, we put the second lists number in front of the first lists PREVIOUS number. This means we need to do a bit of referential ju-jitsu to make sure all pointers are pointing at the right things.
            if (prevHeadOne) {
                // NOTE: This is the important line, the previous first lists number gets the second lists current number put in front of it.
                prevHeadOne.next = nextHeadTwo;
            }
            // NOTE: Kind of a misnomer, but we want the previous number at the prev node. Now that number is from the second list.
            prevHeadOne = nextHeadTwo;
            // NOTE: Progress the second list forward.
            nextHeadTwo = nextHeadTwo.next;
            // NOTE: Then remember, the current number of the first list was GREATER! We put it in front of the second lists number we just placed.
            prevHeadOne.next = nextHeadOne;
        }
    }

    // NOTE: If the first list is at its end, just append the second list.
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