/**
 * Mocking client-server processing
 */
const _quotes = [
  { 'id': 1, lang: 'en-us', 'author': 'Jonathan Swift', 'title': "Gulliver's Travels", 'text': 'This made me reflect, how vain an attempt it is for a man to endeavor to do himself honor among those who are out of all degree of equality or comparison with him.' },
  { 'id': 2, lang: 'en-us', 'author': 'Edward J. Tarbuck', 'title': 'Earth: An Introduction to Physical Geology (12th Edition)', 'text': 'Usually, rockslides take place in a geologic setting where the rock strata are inclined, or where joints and fractures exist parallel to the slope. When such a rock unit is undercut at the base of the slope, it loses support, and the rock eventually gives way.' },
  { 'id': 3, lang: 'pt-br', 'author': 'Clóvis de Barros', 'title': 'Shinsetsu: O Poder da Gentileza', 'text': 'Na moral, a decisão universal pretendida decorre de uma razão prática compartilhada por todos. Do respeito a princípios de conduta por ela chancelados. Condição de sobrevivência do grupo. Da sociedade. Da humanidade.' },
  { 'id': 4, lang: 'pt-br', 'author': 'Leandro Karnal', 'title': 'O Mundo Como Eu Vejo', 'text': 'Não é possível ser artificial com crianças. Se ler não representa algo para você, ela notará rapidamente. O resultado será desastroso. Funciona como comida: se o brigadeiro é o prêmio para comer quiabo, é lógico supor que o vegetal não é tão bom, já que ele é o pedágio para a felicidade. Funciona assim com livros. O livro deve ser o brigadeiro e não o legume necessário como multa.' },
  { 'id': 5, lang: 'en-gb', 'author': 'Project 46', 'title': 'Reasons', 'text': 'Look at the sky, the sun won\'t ask the world if it can rise. Look at your mind, and ask yourself what keeps you trapped inside. Look at the lights, they follow you when you run and hide. Look at the sky, the sun won\'t ask, the sun won\'t ask the world if it can rise.' },
  { 'id': 6, lang: 'pt-br', 'author': 'Project 46', 'title': 'Reasons', 'text': 'Olhe para o céu, o sol não pergunta ao mundo se ele pode nascer. Olhe para sua mente, e pergunte a você mesmo o que mantem você preso aí dentro. Olhe para as luzes, elas seguem você quando você corre e esconde. Olhe para o céu, o sol não pergunta, o sol não pergunta ao mundo se ele pode nascer.' },
  { 'id': 7, lang: 'pt-br', 'author': 'Jonathan Swift', 'title': "Gulliver's Travels", 'text': 'Isso me faz refletir, quão vaidosa é uma tentativa de um homem se esforçar-se para fazer-se honrável entre aqueles que estão totalmente fora de todo grau de igualdade ou comparação com ele' },
  { 'id': 8, lang: 'pt-br', 'author': 'Edward J. Tarbuck', 'title': 'Earth: An Introduction to Physical Geology (12th Edition)', 'text': 'Geralmente, os deslizamentos de rochas ocorrem em um ambiente geológico onde os estratos rochosos são inclinados, ou onde as juntas e fratures existem paralelas à encosta. Quando essa unidade de rocha e cortada na base da encosta, ela perde o suporte e a rocha finalmente cede.' },
  { 'id': 9, lang: 'en-us', 'author': 'Mary Spio', 'title': 'It\'s Not Rocket Science: 7 Game-Changing Traits for Uncommon Success', 'text': 'Every fire starts with a spark. Passion is the spark that ignites game-changing creativity, audacity, compassion, tenacity, focus and drive. It is the rocket fuel that launches dreams, a powerful force that guides Game Changers\' thoughts, actions and ultimately their lives.' },
  { 'id': 10, lang: 'en-us', 'author': 'Arctic Monkeys', 'title': 'Fluorescent Adolescent', 'text': 'You used to get it in your fishnets, now you only get it in your night dress. Discarded all the naughty nights for niceness. Landed in a very common crisis.' }
]

function getRandomQuote () {
  let max = 10
  let min = 1
  let id = Math.floor(Math.random(Math.random()) * (max - min + 1)) + min
  return _quotes.find(q => q.id === id)
}

export default {
  getQuotes (cb) {
    setTimeout(() => cb(_quotes), 100)
  },

  getRacing (cb) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let racing = {
          quote: getRandomQuote(),
          me: {
            name: 'Me',
            username: 'me',
            progress: 50,
            wpm: 0,
            wpmHistory: []
          }
        }
        resolve(racing)
      }, 2000)
    })
  }
}
