import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqs = [
  {
    question: 'How do I get started with ELearn?',
    answer:
      'Getting started is easy! Simply sign up for an account, browse our course catalog, and enroll in any course that interests you. You can begin learning immediately after enrollment.'
  },
  {
    question: 'Are the courses self-paced?',
    answer:
      'Yes, most of our courses are self-paced, allowing you to learn at your own speed and on your own schedule. Some courses may have specific start and end dates, which will be clearly indicated.'
  },
  {
    question: 'Do I get a certificate upon course completion?',
    answer:
      "Upon successful completion of a course, you'll receive a digital certificate that you can share on your resume or professional networks."
  },
  {
    question: 'Can I access the courses on mobile devices?',
    answer:
      'Yes, our platform is fully responsive. You can access your courses on any device, including smartphones and tablets, through our mobile app or web browser.'
  },
  {
    question: 'What is your refund policy?',
    answer:
      "We offer a 30-day money-back guarantee for most of our courses. If you're unsatisfied with a course, you can request a full refund within 30 days of purchase, no questions asked."
  }
]

export default function FAQ() {
  return (
    <section className='py-24 bg-white dark:bg-gray-800'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>Frequently Asked Questions</h2>
        <Accordion type='single' collapsible className='max-w-3xl mx-auto'>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
