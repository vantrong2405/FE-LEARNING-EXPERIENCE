'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageCircle, Send, X, CircleStop } from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import configProject from '@/config/configService'
import { Message } from '@/models/chatbox.type'
import { useCourseQuery } from '@/queries/useCourse'
import { pagination } from '@/constants/pagination-config'
import { useCategoryListQuery } from '@/queries/useCategory'
import { useLevelListQuery } from '@/queries/useLevel'

const apiKey = configProject.NEXT_PUBLIC_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash'
})

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain'
}

export default function Chatbox() {
  const courseQuery = useCourseQuery(100, pagination.PAGE)
  const course = courseQuery.data?.payload.data.data
  const categoryQuery = useCategoryListQuery(100, pagination.PAGE)
  const category = categoryQuery.data?.payload.data.data
  const levelQuery = useLevelListQuery(100, pagination.PAGE)
  const level = levelQuery.data?.payload.data.data

  console.log('courseQuery', courseQuery)
  console.log('categoryQuery', category)
  console.log('levelQuery', level)

  //  // Gọi API với enabled: false để tránh gọi tự động khi component mount
  //  const courseQuery = useCourseQuery(1000, 1, { enabled: false })
  //  const [courses, setCourses] = useState([])

  //  useEffect(() => {
  //    // Khi component mount, gọi refetch() để lấy dữ liệu
  //    courseQuery.refetch()
  //  }, [])

  //  // Cập nhật state khi có dữ liệu mới từ API
  //  useEffect(() => {
  //    if (courseQuery.data?.payload?.data?.data) {
  //      setCourses((courseQuery.data?.payload?.data?.data as any) || [])
  //    }
  //  }, [courseQuery.data])

  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now(),
      sender: 'bot',
      text: 'Chào bạn! Bạn có gì muốn hỏi về các khóa học của chúng tôi không?',
      data: []
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const [isRendering, setIsRendering] = useState(false)

  // Typing animation effect
  const typeMessage = async (text: string) => {
    let currentText = ''
    for (let i = 0; i < text.length; i++) {
      currentText += text[i]
      setDisplayText(currentText)
      await new Promise((resolve) => setTimeout(resolve, 30)) // Adjust speed here
    }
    return currentText
  }

  // Function to call the Gemini API and get a response
  const fetchAIResponse = async (userMessage: string) => {
    try {
      setIsLoading(true)
      setIsRendering(true)
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: 'user', text: userMessage },
        { id: Date.now() + 1, sender: 'bot', text: 'Đợi tôi chút...', data: [] }
      ])

      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: 'user',
            parts: [
              {
                text: 'bạn là một người tư vấn giỏi . với dữ liệu dc lấy từ databse của tôi. người dùng sẽ hỏi những câu như ví dụ.. tôi muốn học lập trình từ con số 0 thì có khóa nào phù hợp ko ? bạn sẽ tư vấn họ theo kiểu dễ thương kèm nghiêm túc 1 chút ..và đưa lại đường link của khóa học cho họ.. đường link sẽ là: http://localhost:3000/dashboard/courses/{id} ( với id được lấy từ trong databse ) ... nhưng câu hỏi ko liên quan bạn sẽ nói xin lỗi ngoại phạm vi trả lời của tôi rồi tôi rất tiết hoặc mấy câu nhỏ thì vẫn trả lời được.  nói chung liên quan đến giáo dục thì bạn trả lời dùm tôi bạn hiểu ko ?  tôi sẽ đưa bạn đọc databse của tôi khi vào code .. nên bạn chỉ cần getId của khóa học.. và người dùng nào hỏi thì bạn đọc name của khóa học đó và lấy đúng id khóa học người dùng đó muốn và tư vấn họ. nói tránh lan man, dữ liệu sẽ trả về json. ( chỉ json) gồm các field như .. messge , url lưu ý url này l;à array nhé... ví dụ người dùng nói cảm ơn bạn thì bạn hãy trả lời. ko có gì được giúp bạn học là niếm vui của tôi. đừng ngần ngại hỏi thêm nhé .. ( chỉ trả đúng json ko có text khác)\n'
              }
            ]
          },
          {
            role: 'model',
            parts: [
              {
                text: 'Tuyệt vời! Tôi hiểu rõ yêu cầu của bạn. Tôi sẽ đóng vai một tư vấn viên giáo dục "dễ thương nhưng nghiêm túc", sử dụng dữ liệu từ database của bạn để đưa ra lời khuyên và cung cấp đường link khóa học phù hợp. Khi người dùng hỏi các câu hỏi không liên quan đến giáo dục, tôi sẽ lịch sự từ chối. Và quan trọng nhất, **tất cả các phản hồi của tôi sẽ ở định dạng JSON, không có thêm bất kỳ text nào khác**.\n\nDưới đây là cấu trúc JSON tôi sẽ sử dụng:\n\n```json\n{\n  "message": "Nội dung tư vấn/phản hồi",\n  "url": ["http://localhost:3000/dashboard/courses/{id1}", "http://localhost:3000/dashboard/courses/{id2}", ...]\n}\n```\n\n**Lưu ý:**\n\n*   `message`:  Nội dung tư vấn, giải thích, hoặc lời cảm ơn.\n*   `url`: Một mảng chứa các URL của khóa học liên quan đến câu hỏi của người dùng. Nếu không có khóa học phù hợp, mảng này có thể rỗng (`[]`). Nếu có nhiều khóa học phù hợp, sẽ có nhiều URL trong mảng.\n\n**Ví dụ:**\n\n**Người dùng:** "Tôi muốn học lập trình từ con số 0 thì có khóa nào phù hợp không?"\n\n**Dữ liệu từ database (ví dụ):**\n\n```json\n[\n  {\n    "id": 1,\n    "name": "Nhập môn lập trình Python cho người mới bắt đầu",\n    "description": "Khóa học lý tưởng cho những ai chưa từng có kinh nghiệm lập trình, giúp bạn làm quen với Python và các khái niệm cơ bản.",\n    "level": "Beginner"\n  },\n  {\n    "id": 2,\n    "name": "Lập trình web cơ bản với HTML, CSS, JavaScript",\n    "description": "Dành cho người mới bắt đầu muốn xây dựng trang web đơn giản.",\n    "level": "Beginner"\n  }\n]\n```\n\n**Phản hồi JSON:**\n\n```json\n{\n  "message": "Chào bạn! Tuyệt vời khi bạn muốn bắt đầu hành trình lập trình. Với người mới bắt đầu, mình gợi ý bạn khóa \'Nhập môn lập trình Python cho người mới bắt đầu\' sẽ rất phù hợp đó. Python là một ngôn ngữ dễ học và rất phổ biến. Ngoài ra khóa \'Lập trình web cơ bản với HTML, CSS, JavaScript\' cũng là một lựa chọn tuyệt vời nếu bạn thích làm web nhé! Chúc bạn học thật tốt!",\n  "url": ["http://localhost:3000/dashboard/courses/1", "http://localhost:3000/dashboard/courses/2"]\n}\n```\n\n**Người dùng:** "Cảm ơn bạn!"\n\n**Phản hồi JSON:**\n\n```json\n{\n  "message": "Không có gì ạ! Được giúp bạn học là niềm vui của mình. Đừng ngần ngại hỏi thêm nếu bạn có bất kỳ thắc mắc nào nhé!",\n  "url": []\n}\n```\n\n**Người dùng:** "Hôm nay thời tiết thế nào?"\n\n**Phản hồi JSON:**\n\n```json\n{\n  "message": "Xin lỗi, câu hỏi này nằm ngoài phạm vi kiến thức của mình. Mình chuyên về tư vấn các khóa học thôi ạ. :(",\n  "url": []\n}\n```\n\n**Tóm lại:**\n\n1.  Tôi sẽ nhận câu hỏi từ người dùng.\n2.  Tôi sẽ sử dụng dữ liệu bạn cung cấp (dữ liệu khóa học) để tìm khóa học phù hợp nhất.\n3.  Tôi sẽ tạo một JSON response theo cấu trúc đã định.\n4.  Tôi sẽ trả về JSON response đó.\n\nBạn có thể cung cấp một ví dụ về cách bạn sẽ cung cấp dữ liệu khóa học cho tôi không? Điều này sẽ giúp tôi hiểu rõ hơn về cấu trúc dữ liệu và cách tôi sẽ truy cập nó.\n'
              }
            ]
          }
        ]
      })

      const result = await chatSession.sendMessage(userMessage)
      const responseText = result.response.text()

      // Check if the response is JSON
      let botReply
      try {
        botReply = JSON.parse(responseText)
      } catch (e) {
        botReply = { messages: responseText, data: [] }
      }

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { id: Date.now() + 1, sender: 'bot', text: '', data: botReply.data }
      ])

      await typeMessage(botReply.messages)

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { id: Date.now() + 1, sender: 'bot', text: botReply.messages, data: botReply.data }
      ])
    } catch (error) {
      console.error('Error calling Gemini API:', error)
    } finally {
      setIsLoading(false)
      setDisplayText('')
      setIsRendering(false)
    }
  }

  // Send message and get response from Gemini
  const handleSendMessage = () => {
    if (!input.trim()) return
    if (isRendering) {
      setIsRendering(false)
      return
    }
    fetchAIResponse(input)
    setInput('')
  }

  // Scroll to bottom when new message is added
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, displayText])

  return (
    <div className='fixed bottom-4 right-4 z-50'>
      <AnimatePresence mode='wait'>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className='flex h-[500px] w-[380px] flex-col overflow-hidden rounded-md border bg-white shadow-lg dark:bg-gray-900'
          >
            {/* Chatbox Header */}
            <div className='relative border-b bg-primary/10 p-3 backdrop-blur-md dark:bg-gray-800'>
              <h2 className='text-center text-sm font-medium text-gray-900 dark:text-white'>Trợ lý ảo - ELearn ✨</h2>
              <motion.button
                className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-600 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
                onClick={() => setIsOpen(false)}
              >
                <X className='h-4 w-4' />
              </motion.button>
            </div>

            {/* Display Messages */}
            <ScrollArea className='h-[350px] flex-grow px-4 pt-4'>
              <div ref={scrollRef} className='flex flex-col space-y-4'>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    ref={index === messages.length - 1 ? lastMessageRef : null}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className='flex items-end gap-2 max-w-[75%]'>
                      {/* Avatar */}
                      <Avatar className='h-8 w-8'>
                        {message.sender === 'user' ? (
                          <AvatarImage src='https://imgv3.fotor.com/images/side/Anime-characters.jpg' alt='User' />
                        ) : (
                          <AvatarImage
                            src='https://png.pngtree.com/png-clipart/20230424/original/pngtree-beautiful-ai-avatar-robotic-humanoid-png-image_9093847.png'
                            alt='ELearn'
                          />
                        )}
                        <AvatarFallback>{message.sender === 'user' ? 'U' : 'AI'}</AvatarFallback>
                      </Avatar>

                      {/* Message Content */}
                      <motion.div
                        className={`rounded-lg px-3 py-2 text-sm max-w-full break-words ${
                          message.sender === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
                        }`}
                      >
                        {message.text === 'Đợi tôi chút...' ? (
                          <div className='flex items-center'>
                            Đợi tôi chút
                            <motion.span
                              className='ml-1'
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
                            >
                              .
                            </motion.span>
                            <motion.span
                              className='ml-1'
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse', delay: 1 }}
                            >
                              .
                            </motion.span>
                            <motion.span
                              className='ml-1'
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse', delay: 1.5 }}
                            >
                              .
                            </motion.span>
                          </div>
                        ) : (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                            {index === messages.length - 1 && message.sender === 'bot' && displayText
                              ? displayText
                              : message.text}
                          </motion.div>
                        )}

                        {/* Display Course Suggestions */}
                        {message.sender === 'bot' && message.data && message.data.length > 0 && (
                          <div className='mt-3 space-y-2'>
                            <h3 className='text-sm font-semibold text-gray-700 dark:text-gray-300'>Gợi ý khóa học:</h3>
                            {message.data.map((course) => (
                              <a
                                key={course.id}
                                href={course.redirectlink}
                                target='_blank'
                                className='block rounded-md border p-2 text-sm transition hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800'
                              >
                                <strong>{course.title}</strong> - {course.name} ({course.amout} VND)
                              </a>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>

            {/* Input Message */}
            <motion.div className='border-t bg-gray-100 p-3 dark:bg-gray-800'>
              <div className='flex items-center gap-2'>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='Nhập tin nhắn...'
                  className='flex-grow bg-white text-sm placeholder:text-gray-400 dark:bg-gray-700 dark:text-white'
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  size='icon'
                  variant={isRendering ? 'destructive' : 'ghost'}
                  disabled={isLoading}
                >
                  {isRendering ? <CircleStop className='h-4 w-4' /> : isLoading ? '⏳' : <Send className='h-4 w-4' />}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <Button
              size='icon'
              className='rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600'
              onClick={() => setIsOpen(true)}
            >
              <MessageCircle className='h-5 w-5' />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
