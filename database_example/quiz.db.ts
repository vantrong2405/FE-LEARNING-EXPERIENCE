import { Icons } from '@/components/ui/icons'

export const languages = [
  { value: 'javascript', label: 'JavaScript', icon: Icons.Code },
  { value: 'python', label: 'Python', icon: Icons.BookOpen },
  { value: 'java', label: 'Java', icon: Icons.Coffee },
  { value: 'csharp', label: 'C#', icon: Icons.Hash }
]

export const questions = {
  javascript: [
    {
      question: 'What is JavaScript?',
      options: ['A markup language', 'A programming language', 'A database', 'An operating system'],
      correctAnswer: 1
    },
    {
      question: 'Which keyword is used to declare a variable in JavaScript?',
      options: ['var', 'let', 'const', 'All of the above'],
      correctAnswer: 3
    },
    {
      question: "What does the 'typeof' operator do in JavaScript?",
      options: [
        'Returns the type of a variable',
        'Assigns a type to a variable',
        'Checks if a variable is defined',
        'Creates a new type'
      ],
      correctAnswer: 0
    },
    {
      question: 'Which of the following is not a valid JavaScript data type?',
      options: ['Undefined', 'Boolean', 'Float', 'Number'],
      correctAnswer: 2
    },
    {
      question: "What is the purpose of the 'use strict' directive in JavaScript?",
      options: [
        'To enable strict mode',
        'To declare strict variables',
        'To use strict equality comparisons',
        'To restrict the use of certain keywords'
      ],
      correctAnswer: 0
    },
    {
      question: 'What is the output of console.log(typeof [])?',
      options: ['Array', 'Object', 'List', 'Undefined'],
      correctAnswer: 1
    },
    {
      question: 'Which method is used to add elements to the end of an array in JavaScript?',
      options: ['push()', 'append()', 'addToEnd()', 'insert()'],
      correctAnswer: 0
    },
    {
      question: "What does the '===' operator do in JavaScript?",
      options: ['Compares values', 'Assigns values', 'Compares values and types', 'Checks if a value exists'],
      correctAnswer: 2
    },
    {
      question: "What is the purpose of the 'this' keyword in JavaScript?",
      options: [
        'To refer to the current function',
        'To refer to the current object',
        'To create a new object',
        'To call a method'
      ],
      correctAnswer: 1
    },
    {
      question: 'Which of the following is not a looping structure in JavaScript?',
      options: ['for', 'while', 'do-while', 'foreach'],
      correctAnswer: 3
    },
    {
      question: 'What is closure in JavaScript?',
      options: [
        'A way to close a browser window',
        'A function with access to its outer scope',
        'A method to end a program',
        'A type of loop'
      ],
      correctAnswer: 1
    },
    {
      question: "What is the purpose of the 'addEventListener' method in JavaScript?",
      options: [
        'To add new HTML elements',
        'To attach event handlers to elements',
        'To create custom events',
        'To listen for server events'
      ],
      correctAnswer: 1
    },
    {
      question: 'What does JSON stand for?',
      options: [
        'JavaScript Object Notation',
        'JavaScript Online Notation',
        'JavaScript Oriented Notation',
        'Java Standard Object Notation'
      ],
      correctAnswer: 0
    },
    {
      question: 'Which method is used to remove the last element from an array in JavaScript?',
      options: ['pop()', 'removeLast()', 'deleteLast()', 'splice()'],
      correctAnswer: 0
    },
    {
      question: "What is the purpose of the 'map' function in JavaScript?",
      options: [
        'To create a new array with the results of calling a provided function on every element',
        'To filter elements in an array',
        'To find an element in an array',
        'To sort elements in an array'
      ],
      correctAnswer: 0
    },
    {
      question: "What is the output of console.log(2 + '2')?",
      options: ['4', '22', 'NaN', 'Error'],
      correctAnswer: 1
    },
    {
      question: 'Which of the following is used to handle asynchronous operations in JavaScript?',
      options: ['Callbacks', 'Promises', 'Async/Await', 'All of the above'],
      correctAnswer: 3
    },
    {
      question: "What is the purpose of the 'bind' method in JavaScript?",
      options: [
        'To create a new function',
        "To set the 'this' value for a function",
        'To combine two functions',
        'To bind variables to a scope'
      ],
      correctAnswer: 1
    },
    {
      question: "What is the difference between 'null' and 'undefined' in JavaScript?",
      options: [
        'They are the same',
        'null is an assigned value, undefined means a variable has been declared but not defined',
        'undefined is an assigned value, null means a variable has been declared but not defined',
        'null is a data type, undefined is not'
      ],
      correctAnswer: 1
    },
    {
      question: "What is the purpose of the 'prototype' property in JavaScript?",
      options: [
        'To create new objects',
        'To define the type of an object',
        'To add properties and methods to objects',
        'To clone objects'
      ],
      correctAnswer: 2
    }
  ],
  python: [
    {
      question: 'What is Python?',
      options: ['A snake species', 'A compiled language', 'An interpreted language', 'A markup language'],
      correctAnswer: 2
    },
    {
      question: 'Which of the following is used to define a function in Python?',
      options: ['func', 'define', 'def', 'function'],
      correctAnswer: 2
    }
  ]
}
