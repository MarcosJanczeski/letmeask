import { Question } from '../';
import { useRoom } from '../../../contexts/RoomCtx';

import './style.scss'


export function QuestionsList() {
  const { questions } = useRoom()

  return (
    <section className="question-list">
      {questions.map(question => (
        <Question key={question.id} {...question} />
      ))}
    </section>
  )
}