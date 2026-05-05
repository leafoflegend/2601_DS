/*
Given a string s containing any character, determine if it has a valid series of brackets/parenthesis: '(', ')', '{', '}', '[' and ']'. Determine if the input string is valid.

An input string is valid if:

    1. Open brackets must be closed by the same type of brackets.
    2. Open brackets must be closed in the correct order.
    3. Every close bracket has a corresponding open bracket of the same type.

Example 1:

Input: s = "()"
Output: true

Example 2:

Input: s = "()[]{}"
Output: true

Example 3:

Input: s = "(]"
Output: false

Example 4:

Input: s = "([])"
Output: true

Example 5:

Input: s = "([)]"
Output: false

Example 6:

Input: s = "[i love cats (and dogs)]"
Output: true

Example 7:

Input: s = "racecars go [=> vroom!"
Output: false

Example 8:

Input: s = ""
Output: true
*/

// O(n)
const validParenthesis = (aString: string): boolean => {
    const openingStack = [];
    const allBrackets: { [key: string]: boolean } = {
        '(': true,
        ')': true,
        '{': true,
        '}': true,
        '[': true,
        ']': true,
    };
    const bracketMap: { [key: string]: string } = {
        ')': '(',
        '}': '{',
        ']': '[',
    };

    for (let i = 0; i <= aString.length; ++i) {
        const currentCharacter: string = aString[i] as string;

        if (allBrackets[currentCharacter]) {
            if (!bracketMap[currentCharacter]) {
                openingStack.push(currentCharacter);
            } else {
                const lastOpenCharacter = openingStack.pop();

                if (bracketMap[currentCharacter] !== lastOpenCharacter) {
                    return false;
                }
            }
        }
    }

    return openingStack.length === 0;
}

console.log('True: ', validParenthesis('[i love cats (and dogs)]')); // => true
console.log('False: ', validParenthesis(']]{}')); // => false
