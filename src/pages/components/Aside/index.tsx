import illustration_img from '../../assets/images/illustration.svg'
import './style.scss'

export function Aside() {
  return (
    <aside>
      <img
        src={illustration_img}
        alt="ilustração simbolizando perguntas e respostas."
      />
      <strong>
        Crie salas de Q&amp;A ao vivo
      </strong>
      <p>Tire as dúvidas da sua audiência em tempo real</p>
    </aside>
  )
}