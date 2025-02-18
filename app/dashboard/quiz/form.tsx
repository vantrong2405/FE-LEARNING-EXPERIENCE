'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react'
import { Code, BookOpen, Coffee, Hash } from 'lucide-react'

const languages = [
  { value: 'javascript', label: 'JavaScript', icon: Code },
  { value: 'python', label: 'Python', icon: BookOpen },
  { value: 'java', label: 'Java', icon: Coffee },
  { value: 'csharp', label: 'C#', icon: Hash }
]

const questions = {
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
    // Add 18 more questions for Python here
  ]
  // Add questions for Java and C# similarly
}

const LanguageSelector = ({ onLanguageSelect }: { onLanguageSelect: (lang: string) => void }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('')

  const handleLanguageSelect = (value: string) => {
    setSelectedLanguage(value)
  }

  return (
    <div className='min-h-screen dark:bg-gray-800  flex items-center justify-center p-4'>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className='w-full max-w-md bg-gray-800 border-purple-500 shadow-lg shadow-purple-500/20'>
          <CardContent className='p-6'>
            <motion.h1
              className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Choose Your Challenge
            </motion.h1>
            <Select onValueChange={handleLanguageSelect}>
              <SelectTrigger className='w-full bg-gray-700 border-purple-500 text-lg py-6'>
                <SelectValue placeholder='Select a programming language' />
              </SelectTrigger>
              <SelectContent className='bg-gray-700 border-purple-500'>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value} className='text-white hover:bg-purple-600 py-3'>
                    <div className='flex items-center'>
                      <lang.icon className='mr-2 h-5 w-5' />
                      <span>{lang.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
              <Button
                className='w-full mt-6 bg-purple-600 hover:bg-purple-700 text-lg py-6'
                onClick={() => onLanguageSelect(selectedLanguage)}
                disabled={!selectedLanguage}
              >
                Start Quiz
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

const QuizTest = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes in seconds

  useEffect(() => {
    if (selectedLanguage && !showResults && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [selectedLanguage, showResults, timeLeft])

  useEffect(() => {
    if (timeLeft === 0) {
      setShowResults(true)
    }
  }, [timeLeft])

  const handleLanguageSelect = (value: string) => {
    setSelectedLanguage(value)
    setAnswers(new Array(questions[value as keyof typeof questions].length).fill(-1))
    setCurrentPage(0)
    setShowResults(false)
    setTimeLeft(1800)
  }

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex] = answerIndex
    setAnswers(newAnswers)
  }

  const handleNextPage = () => {
    if (currentPage < Math.ceil(questions[selectedLanguage as keyof typeof questions].length / 10) - 1) {
      setCurrentPage(currentPage + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return score + (answer === questions[selectedLanguage as keyof typeof questions][index].correctAnswer ? 1 : 0)
    }, 0)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  if (!selectedLanguage) {
    return <LanguageSelector onLanguageSelect={setSelectedLanguage} />
  }

  if (showResults) {
    const score = calculateScore()
    const totalQuestions = questions[selectedLanguage as keyof typeof questions].length
    return (
      <div className='min-h-screen bg-gray-900 text-white p-4 md:p-8'>
        <Card className='max-w-4xl mx-auto bg-gray-800 border-purple-500'>
          <CardContent className='p-6'>
            <h1 className='text-3xl font-bold mb-6 text-center'>Quiz Results</h1>
            <div className='text-center mb-6'>
              <span className='text-5xl font-bold text-purple-400'>{score}</span>
              <span className='text-3xl text-gray-400'>/{totalQuestions}</span>
            </div>
            <Progress value={(score / totalQuestions) * 100} className='h-4 mb-6' />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
              <div className='bg-gray-700 p-4 rounded-lg'>
                <h2 className='text-xl font-semibold mb-2'>Accuracy</h2>
                <p className='text-2xl font-bold text-purple-400'>{((score / totalQuestions) * 100).toFixed(2)}%</p>
              </div>
              <div className='bg-gray-700 p-4 rounded-lg'>
                <h2 className='text-xl font-semibold mb-2'>Time Taken</h2>
                <p className='text-2xl font-bold text-purple-400'>{formatTime(1800 - timeLeft)}</p>
              </div>
            </div>
            <ScrollArea className='h-[50vh] mb-6'>
              {questions[selectedLanguage as keyof typeof questions].map((q, index) => (
                <div key={index} className='mb-4 p-4 bg-gray-700 rounded-lg'>
                  <h3 className='text-lg font-semibold mb-2'>
                    {index + 1}. {q.question}
                  </h3>
                  {q.options.map((option, optionIndex) => (
                    <div key={optionIndex} className='flex items-center space-x-2 mb-2'>
                      {answers[index] === optionIndex ? (
                        answers[index] === q.correctAnswer ? (
                          <CheckCircle className='text-green-500' />
                        ) : (
                          <XCircle className='text-red-500' />
                        )
                      ) : optionIndex === q.correctAnswer ? (
                        <CheckCircle className='text-green-500' />
                      ) : null}
                      <span
                        className={`${
                          optionIndex === q.correctAnswer
                            ? 'text-green-500'
                            : answers[index] === optionIndex
                              ? 'text-red-500'
                              : ''
                        }`}
                      >
                        {option}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </ScrollArea>
            <Button
              className='w-full bg-purple-600 hover:bg-purple-700 text-lg py-3'
              onClick={() => setSelectedLanguage('')}
            >
              Take Another Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestions = questions[selectedLanguage as keyof typeof questions].slice(
    currentPage * 10,
    (currentPage + 1) * 10
  )

  return (
    <div className='min-h-screen bg-gray-900 text-white p-4 md:p-8'>
      <Card className='max-w-4xl mx-auto bg-gray-800 border-purple-500'>
        <CardContent className='p-6'>
          <div className='flex justify-between items-center mb-6'>
            <h1 className='text-2xl md:text-3xl font-bold'>
              {selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)} Quiz
            </h1>
            <div className='text-right'>
              <div className='text-lg text-gray-400 mb-2'>
                Page {currentPage + 1} of {Math.ceil(questions[selectedLanguage as keyof typeof questions].length / 10)}
              </div>
              <div className='text-xl font-bold text-purple-400'>Time Left: {formatTime(timeLeft)}</div>
            </div>
          </div>
          <Progress
            value={
              ((currentPage * 10 + currentQuestions.length) /
                questions[selectedLanguage as keyof typeof questions].length) *
              100
            }
            className='h-2 mb-6'
          />
          <ScrollArea className='h-[60vh] pr-4'>
            {currentQuestions.map((q, index) => (
              <div key={index} className='mb-8'>
                <h2 className='text-xl font-semibold mb-4'>
                  {currentPage * 10 + index + 1}. {q.question}
                </h2>
                <RadioGroup
                  value={answers[currentPage * 10 + index]?.toString() || ''}
                  onValueChange={(value) => handleAnswer(currentPage * 10 + index, Number.parseInt(value))}
                >
                  {q.options.map((option, optionIndex) => (
                    <div key={optionIndex} className='flex items-center space-x-2 mb-4'>
                      <RadioGroupItem
                        value={optionIndex.toString()}
                        id={`question-${currentPage * 10 + index}-option-${optionIndex}`}
                        className='border-purple-500 text-purple-500'
                      />
                      <Label
                        htmlFor={`question-${currentPage * 10 + index}-option-${optionIndex}`}
                        className='text-lg cursor-pointer'
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </ScrollArea>
          <div className='flex justify-between mt-6'>
            <Button onClick={handlePreviousPage} disabled={currentPage === 0} className='bg-gray-700 hover:bg-gray-600'>
              <ChevronLeft className='mr-2 h-4 w-4' /> Previous
            </Button>
            <Button onClick={handleNextPage} className='bg-purple-600 hover:bg-purple-700'>
              {currentPage === Math.ceil(questions[selectedLanguage as keyof typeof questions].length / 10) - 1
                ? 'Finish'
                : 'Next'}
              {currentPage !== Math.ceil(questions[selectedLanguage as keyof typeof questions].length / 10) - 1 && (
                <ChevronRight className='ml-2 h-4 w-4' />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default QuizTest
