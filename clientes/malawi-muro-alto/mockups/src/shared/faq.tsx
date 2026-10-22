import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { FAQ } from "./data"

export function Faq() {
  return (
    <Accordion type="single" collapsible defaultValue="item-0">
      {FAQ.map(([question, answer], i) => (
        <AccordionItem key={question} value={`item-${i}`}>
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
