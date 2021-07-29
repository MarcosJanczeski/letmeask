import './styles.scss'

export type TQuestion = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  //likeCount: number;
  //ikeId: string | undefined;
}

export function Question({ content, author }: TQuestion) {
  return (
    <div className="question">
      <p>
        {content}
      </p>
      <footer>
        <span>
          <img src={author.avatar} alt={author.name} />{author.name}
        </span>
      </footer>
    </div>
  )
}