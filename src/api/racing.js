/**
 * Mocking client-server processing
 */
const _quotes = [
  { 'id': 1, 'author': 'Jonathan Swift', 'title': "Gulliver's Travels", 'text': 'This made me reflect, how vain an attempt it is for a man to endeavor to do himself honor among those who are out of all degree of equality or comparison with him.' },
  { 'id': 2, 'author': 'Edward J. Tarbuck', 'title': 'Earth: An Introduction to Physical Geology (12th Edition)', 'text': 'Usually rockslides take place in a geologic setting where the rock strata are inclined, or where joints and fractures exist parallel to the slope. When such a rock unit is undercut at the base of the slope, it loses support, and the rock eventually gives way.' },
  { 'id': 3, 'author': 'Clóvis de Barros', 'title': 'Shinsetsu: O Poder da Gentileza', 'text': 'Na moral, a decisão universal pretendida decorre de uma razão prática compartilhada por todos. Do respeito a princípios de conduta por ela chancelados. Condição de sobrevivência do grupo. Da sociedade. Da humanidade.' },
  { 'id': 4, 'author': 'Leandro Karnal', 'title': 'O Mundo Como Eu Vejo', 'text': 'Não é possível ser artificial com crianças. Se ler não representa algo para você, ela notará rapidamente. O resultado será desastroso. Funciona como comida: se o brigadeiro é o prêmio para comer quiabo, é lógico supor que o vegetal não é tão bom, já que ele é o pedágio para a felicidade. Funciona assim com livros. O livro deve ser o brigadeiro e não o legume necessário como multa.' }
]

function getRandonQuote () {
  let max = 4
  let min = 1
  let id = Math.floor(Math.random() * (max - min + 1)) + min
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
          quote: getRandonQuote(),
          me: {
            name: 'Me',
            username: 'me',
            progress: 50,
            wpm: 0,
            wpmHistory: []
          }
        }
        resolve(racing)
      }, 6000)
    })
  }
}
