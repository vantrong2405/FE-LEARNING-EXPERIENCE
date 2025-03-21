export interface Message {
  id: number
  sender: 'user' | 'bot'
  text: string
  data?: Array<{ id: string; title: string; name: string; amout: string; redirectlink: string }>
}
