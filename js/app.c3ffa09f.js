(function(e){function t(t){for(var n,i,s=t[0],c=t[1],u=t[2],l=0,p=[];l<s.length;l++)i=s[l],a[i]&&p.push(a[i][0]),a[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);d&&d(t);while(p.length)p.shift()();return o.push.apply(o,u||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],n=!0,i=1;i<r.length;i++){var c=r[i];0!==a[c]&&(n=!1)}n&&(o.splice(t--,1),e=s(s.s=r[0]))}return e}var n={},a={app:0},o=[];function i(e){return s.p+"js/"+({about:"about"}[e]||e)+"."+{about:"f09e291d"}[e]+".js"}function s(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.e=function(e){var t=[],r=a[e];if(0!==r)if(r)t.push(r[2]);else{var n=new Promise(function(t,n){r=a[e]=[t,n]});t.push(r[2]=n);var o,c=document.createElement("script");c.charset="utf-8",c.timeout=120,s.nc&&c.setAttribute("nonce",s.nc),c.src=i(e),o=function(t){c.onerror=c.onload=null,clearTimeout(u);var r=a[e];if(0!==r){if(r){var n=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+n+": "+o+")");i.type=n,i.request=o,r[1](i)}a[e]=void 0}};var u=setTimeout(function(){o({type:"timeout",target:c})},12e4);c.onerror=c.onload=o,document.head.appendChild(c)}return Promise.all(t)},s.m=e,s.c=n,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(r,n,function(t){return e[t]}.bind(null,n));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/typetype/",s.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var d=u;o.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"0853":function(e,t,r){"use strict";var n=r("65f4"),a=r.n(n);a.a},1149:function(e,t,r){"use strict";var n=r("9a79"),a=r.n(n);a.a},"1daa":function(e,t,r){"use strict";var n=r("9808"),a=r.n(n);a.a},"26bc":function(e,t,r){},"2b34":function(e,t,r){"use strict";var n=r("aebd"),a=r.n(n);a.a},"49f8":function(e,t,r){var n={"./en.json":"edd4"};function a(e){var t=o(e);return r(t)}function o(e){var t=n[e];if(!(t+1)){var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}return t}a.keys=function(){return Object.keys(n)},a.resolve=o,e.exports=a,a.id="49f8"},"56d7":function(e,t,r){"use strict";r.r(t);var n=r("75fc"),a=(r("cadf"),r("551c"),r("f751"),r("097d"),r("2b0e")),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("div",{attrs:{id:"nav"}},[r("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" |\n    "),r("router-link",{directives:[{name:"t",rawName:"v-t",value:"main_menu--run",expression:"'main_menu--run'"}],attrs:{to:{name:"run"}}}),e._v(" |\n    "),r("router-link",{directives:[{name:"t",rawName:"v-t",value:"main_menu--train",expression:"'main_menu--train'"}],attrs:{to:{name:"training"}}}),e._v(" |\n    "),r("router-link",{attrs:{to:"/about"}},[e._v("About")])],1),r("router-view")],1)},i=[],s={name:"App"},c=s,u=(r("5c0b"),r("2877")),l=Object(u["a"])(c,o,i,!1,null,null,null),d=l.exports,p=r("8c4f"),m=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"home"},[r("p",[e._v("Are you a good Typist?")]),r("p",[e._v("How many words per minute can you type?")]),r("p",[e._v("Discover it!!!")]),r("div",[r("router-link",{directives:[{name:"t",rawName:"v-t",value:"home--run_link",expression:"'home--run_link'"}],attrs:{to:{name:"run"}}}),r("br"),r("p",{directives:[{name:"t",rawName:"v-t",value:"home--run_text",expression:"'home--run_text'"}]})],1),r("div",[r("router-link",{directives:[{name:"t",rawName:"v-t",value:"home--training_link",expression:"'home--training_link'"}],attrs:{to:{name:"training"}}}),r("br"),r("p",{directives:[{name:"t",rawName:"v-t",value:"home--training_text",expression:"'home--training_text'"}]})],1)])},h=[],f={name:"home"},g=f,v=Object(u["a"])(g,m,h,!1,null,null,null),_=v.exports,y=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e._m(0),r("RacingPanel",{attrs:{racing:e.racing,timer:e.timer,racers:e.racers,me:e.me},on:{"count-down-done":e.startRacing}}),r("QuoteBox",{attrs:{text:e.quoteText,typed:e.typed,"current-word":e.currentWord,"current-word-typed":e.currentWordTyping}}),e.typingDone?e._e():r("TypeBox",{attrs:{lock:e.inputLock,word:e.currentWordTyping},on:{input:e.updateRacing}})],1)},w=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"alert alert-danger alert-dismissible fade show",attrs:{role:"alert"}},[r("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"alert","aria-label":"Close"}},[r("span",{attrs:{"aria-hidden":"true"}},[e._v("×")])]),r("strong",[e._v("Other runners will be here as soon as possible. Until then, run your self and practice your typing speed here")])])}],b=(r("8e6e"),r("ac6a"),r("456d"),r("4917"),r("bd86")),C=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"quote"},[r("div",{staticClass:"quote__text"},[r("span",{staticClass:"quote__typed"},[e._v(e._s(e.typed))]),r("CurrentWord",{attrs:{word:e.currentWord,typed:e.currentWordTyped}}),r("span",[e._v(e._s(e.quoteTail))])],1)])},x=[],k=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("span",{staticClass:"word",class:{word__wrong:!e.correct}},[r("span",{staticClass:"word__head"},[e._v(e._s(e.typedCorrect))]),r("span",{staticClass:"word__wrong-letter"},[e._v(e._s(e.wrongLetter))]),r("span",{staticClass:"word__tail"},[e._v(e._s(e.endWord))])])},O=[],j=(r("f559"),{name:"CurrentWord",props:{word:{type:String,required:!0},typed:{type:String,required:!0}},data:function(){return{}},computed:{correct:function(){return this.typedCorrect===this.typed},typedCorrect:function(){return this.processHead(this.word,this.typed)},wrongLetter:function(){return this.correct?"":this.word.slice(this.typedCorrect.length).slice(0,1)},endWord:function(){return this.correct?this.word.slice(this.typedCorrect.length):this.word.slice(this.typedCorrect.length+1)}},methods:{processHead:function(e,t){return e.startsWith(t)?t:this.processHead(e,t.slice(0,-1))}}}),T=j,W=(r("bfe4"),Object(u["a"])(T,k,O,!1,null,"7ccc2a13",null)),R=W.exports,q={name:"QuoteBox",components:{CurrentWord:R},props:{text:{type:String,required:!0},typed:{type:String,required:!0},currentWord:{type:String,required:!0},currentWordTyped:{type:String,required:!0}},data:function(){return{typingCorrect:!0}},computed:{quoteTail:function(){return this.text.slice(this.typed.length+this.currentWord.length)}},methods:{}},S=q,P=(r("b2d2"),Object(u["a"])(S,C,x,!1,null,"ff277582",null)),D=P.exports,E=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.lock?r("div",[e._v("\n      Wait to type ...\n    ")]):r("div",[r("input",{directives:[{name:"focus",rawName:"v-focus"}],staticClass:"current-word",attrs:{type:"text",name:"current-word"},domProps:{value:e.word},on:{input:e.riseTyping}})])])},N=[],L={name:"TypeBox",props:["word","lock"],data:function(){return{wordSeparator:[" "]}},methods:{riseTyping:function(e){return-1===this.wordSeparator.indexOf(e.target.value)?this.$emit("input",e.target.value):this.$emit("update",e.target.value)}}},$=L,A=Object(u["a"])($,E,N,!1,null,null,null),M=A.exports,G=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"racing-panel"},[n("RacingTracker",{attrs:{racers:e.racers,me:e.me}}),n("div",{staticClass:"racing-bar"},[e.racing.loading?n("div",{staticClass:"loadin-flag"},[n("div",[e._v("Loading text")]),n("img",{staticClass:"loadin-flag__img",attrs:{alt:"Vue logo",src:r("de47")}})]):e.racing.started?n("SpeedometerDigital",{attrs:{velocity:e.me.wpm,"velocity-last-word":e.velocityLastWord}}):n("CountDown",{attrs:{time:e.timer},on:{done:e.countDownDone}})],1)],1)},B=[],F=(r("c5f6"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"count-down"},[r("div",{staticClass:"count-down__counter"},[e._v("\n    "+e._s(e.counter)+" of "+e._s(e.time)+"\n  ")]),r("div",{staticClass:"count-down__semaphore",class:{"count-down__semaphore--red":e.isRed,"count-down__semaphore--yellow":e.isYellow,"count-down__semaphore--green":e.isGreen}},[r("div",{staticClass:"semaphore__light semaphore__light__red",class:{"semaphore__light__red--on":e.isRed,"semaphore__light__red--off":!e.isRed}}),r("div",{staticClass:"semaphore__light semaphore__light__yellow",class:{"semaphore__light__yellow--on":e.isYellow,"semaphore__light__yellow--off":!e.isYellow}}),r("div",{staticClass:"semaphore__light semaphore__light__green",class:{"semaphore__light__green--on":e.isGreen,"semaphore__light__green--off":!e.isGreen}})])])}),I=[],H={name:"CountDown",props:{time:{type:Number,required:!0}},data:function(){return{counter:4,countDownInterval:null}},computed:{isRed:function(){return this.counter>this.time/2},isYellow:function(){return this.counter<=this.time/2&&this.counter>=1},isGreen:function(){return this.counter<1}},mounted:function(){this.startCountdown()},methods:{startCountdown:function(){var e=this;this.counter=this.time,this.countDownInterval=setInterval(function(){e.counter-=1},1e3),setTimeout(function(){clearInterval(e.countDownInterval),e.riseDone()},1e3*(this.time+1))},riseDone:function(){this.$emit("done")}}},Y=H,z=(r("2b34"),Object(u["a"])(Y,F,I,!1,null,"5e52d383",null)),J=z.exports,U=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"racing-tracker"},[r("div",{staticClass:"runners-progress"},e._l(e.allRacers,function(t,n){return r("div",{key:n,staticClass:"racer"},[r("div",{staticClass:"racer__description"},[r("div",[e._v(e._s(t.name))]),r("div",{staticClass:"racer__username"},[e._v("("+e._s(t.username)+")")])]),r("div",{staticClass:"racer__way"},[r("div",{staticClass:"way__runnable-path",class:{"way__runnable-path--track":n+1<e.allRacers.length}},[e._v(e._s(n))]),r("div",{staticClass:"racer__car",style:{left:t.progress+"%"}},[r("RacingCar",{attrs:{carLane:n+1}})],1)]),r("div",{staticClass:"racer__stop"})])}),0)])},V=[],Q=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"car"},[r("div",{staticClass:"car__model"}),r("div",{staticClass:"car__glasses",class:e.getGlassesClass()})])},K=[],Z={name:"RacingCar",props:{carModel:{type:String,required:!1},carWidth:{type:Number,default:30},carLane:{type:Number,required:!0}},methods:{getGlassesClass:function(){return"car__glasses--"+this.carLane}}},X=Z,ee=(r("7318"),Object(u["a"])(X,Q,K,!1,null,"631f744f",null)),te=ee.exports,re={name:"RacingTracker",components:{RacingCar:te},props:{me:{type:Object,required:!0,default:function(){}},racers:{type:Array,required:!0}},computed:{allRacers:function(){var e=[this.me];return e.concat(this.racers)}}},ne=re,ae=(r("6719"),Object(u["a"])(ne,U,V,!1,null,"6dce52f8",null)),oe=ae.exports,ie=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"speedometer"},[r("div",{staticClass:"velocity"},[r("div",{staticClass:"velocity-bar"},[r("div",{staticClass:"velocity-bar__on",style:{width:e.velocityBarOn+"%"}},e._l(e.velocityBarOn/2,function(e){return r("div",{key:e,staticClass:"velocity-bar__led"})}),0),r("div",{staticClass:"velocity-bar__off",style:{width:100-e.velocityBarOn+"%"}})]),r("div",{staticClass:"velocity__current"},[r("span",{staticClass:"velocity__numbers"},[e._v(e._s(e.velocityLastWord.toFixed(2)))]),r("span",{staticClass:"velocity__letters"},[e._v(" w/m")])]),r("div",{staticClass:"velocity__total"},[r("span",{staticClass:"velocity__numbers"},[e._v(e._s(e.velocity.toFixed(2)))]),r("span",{staticClass:"velocity__letters"},[e._v(" w/m")])])])])},se=[],ce={name:"SpeedometerDigital",props:{velocity:{type:Number,required:!0},velocityLastWord:{type:Number,required:!0}},computed:{hightVelocity:function(){return 256},velocityBarOn:function(){return(100*this.velocityLastWord/this.hightVelocity).toFixed(0)}}},ue=ce,le=(r("1149"),Object(u["a"])(ue,ie,se,!1,null,"6fcbd311",null)),de=le.exports,pe={name:"RacingPanel",components:{CountDown:J,RacingTracker:oe,SpeedometerDigital:de},props:{racing:{type:Object,required:!0},timer:{type:Number,required:!0,default:0},me:{type:Object,required:!0,default:function(){}},racers:{type:Array,required:!0}},computed:{velocityLastWord:function(){return this.me.wpmHistory.slice(-1)[0]||0}},methods:{countDownDone:function(){this.$emit("count-down-done")}}},me=pe,he=(r("0853"),Object(u["a"])(me,G,B,!1,null,"70ef7ae3",null)),fe=he.exports,ge=r("2f62");function ve(e,t){var r=Object.keys(e);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(e)),t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r}function _e(e){for(var t=1;t<arguments.length;t++)if(t%2){var r=null!=arguments[t]?arguments[t]:{};ve(r,!0).forEach(function(t){Object(b["a"])(e,t,r[t])})}else Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(arguments[t])):ve(r).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(arguments[t],r))});return e}var ye={components:{QuoteBox:D,TypeBox:M,RacingPanel:fe},data:function(){return{currentWord:"",currentWordTyping:"",inputLock:!0,timer:3,typed:"",quoteText:"Waiting your text",wordRegex:/[^ ]* ?/,wordsTyped:0,me:{name:"Me",username:"me",progress:0,wpm:0,wpmHistory:[]},racers:[{name:"Friend",username:"friend",progress:30},{name:"Friend1",username:"friend",progress:0},{name:"Friend2",username:"friend",progress:100},{name:"Friend3",username:"friend",progress:70}],racing:{loading:!0,started:!1,startedAt:0,lastWordStartedAt:0}}},created:function(){var e=this;this.getRacing().then(function(){e.quoteText=e.sRacing.quote.text,e.racing.loading=!1})},computed:_e({},Object(ge["c"])({sRacing:function(e){return e.racing.racing}}),{typingDone:function(){return this.quoteText===this.typed}}),methods:_e({},Object(ge["b"])("racing",{getRacing:"getRacing"}),{calculateProgress:function(){this.me.progress=100*this.typed.length/this.quoteText.length},incrementTypedWord:function(){this.wordsTyped+=1},getNextWord:function(){var e=this.quoteText.slice(this.typed.length),t=e.match(this.wordRegex)[0];return t},getPartialWPM:function(){return(this.lastWordTyped.length-1)/this.timeDeltaSec(Date.now(),this.racing.lastWordStartedAt)*60*.2},getWPM:function(){return(this.typed.length-1)/this.timeDeltaSec(Date.now(),this.racing.startedAt)*60*.2},registerCurrentVelocity:function(){this.me.wpm=this.getWPM(),this.me.wpmHistory.push(this.getPartialWPM())},startRacing:function(){this.racing.started=!0,this.startTimer(),this.startTyping()},startTimer:function(){var e=Date.now();this.racing.startedAt=e,this.racing.lastWordStartedAt=e},startTyping:function(){this.currentWord=this.getNextWord(),this.inputLock=!1},timeDeltaSec:function(e,t){return(e-t)/1e3},updateCurrentWord:function(e){return e===this.currentWord?(this.typed+=this.currentWord,this.lastWordTyped=this.currentWord,this.currentWord=this.getNextWord(),this.currentWordTyping="",!0):(this.currentWordTyping=e,!1)},updateRacing:function(e){var t=this.updateCurrentWord(e);t&&(this.incrementTypedWord(),this.registerCurrentVelocity(),this.calculateProgress(),this.racing.lastWordStartedAt=Date.now(),this.$emit("updateRacing",this.me))}})},we=ye,be=(r("1daa"),Object(u["a"])(we,y,w,!1,null,"5ef280a3",null)),Ce=be.exports,xe=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},ke=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{attrs:{id:"stomt_create"}})])}],Oe={name:"Stompt",created:function(){(function(e,t,r,n,a,o){e.Stomt=e.Stomt||[],a=t.createElement(r),o=t.getElementsByTagName(r)[0],a.async=1,a.src=n,o.parentNode.insertBefore(a,o)})(window,document,"script","https://www.stomt.com/widget.js")},mounted:function(){this.callStomt()},methods:{callStomt:function(){}}},je=Oe,Te=Object(u["a"])(je,xe,ke,!1,null,null,null),We=Te.exports,Re=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},qe=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"train"},[r("div",{staticClass:"train__card"},[r("div",{staticClass:"card-header"},[e._v("It's just a card box?")]),r("div",{staticClass:"card-body"},[r("h4",{staticClass:"card-title"},[e._v("This will be available as soon as possible. But not yet.")]),r("p",{staticClass:"card-text"},[e._v("\n        Until that happens, make us know what you want for the training space on our GitHub project. Run and open an "),r("strong",[e._v("issue")])]),r("a",{staticClass:"btn btn-success",attrs:{name:"open-an-issue",id:"open-an-issue",href:"https://github.com/LuanComputacao/typetype/issues",role:"button",target:"_blank"}},[e._v("Open a new issue")])])])])}],Se={name:"Train"},Pe=Se,De=(r("745a"),Object(u["a"])(Pe,Re,qe,!1,null,"1e1cef23",null)),Ee=De.exports;a["a"].use(p["a"]);var Ne=new p["a"]({routes:[{path:"/",name:"home",component:_},{path:"/run",name:"run",component:Ce},{path:"/training",name:"training",component:Ee},{path:"/stompt",name:"stompt",component:We},{path:"/about",name:"about",component:function(){return r.e("about").then(r.bind(null,"f820"))}}]}),Le=(r("96cf"),r("3b8d")),$e=(r("7514"),[{id:1,lang:"en-us",author:"Jonathan Swift",title:"Gulliver's Travels",text:"This made me reflect, how vain an attempt it is for a man to endeavor to do himself honor among those who are out of all degree of equality or comparison with him."},{id:2,lang:"en-us",author:"Edward J. Tarbuck",title:"Earth: An Introduction to Physical Geology (12th Edition)",text:"Usually, rockslides take place in a geologic setting where the rock strata are inclined, or where joints and fractures exist parallel to the slope. When such a rock unit is undercut at the base of the slope, it loses support, and the rock eventually gives way."},{id:3,lang:"pt-br",author:"Clóvis de Barros",title:"Shinsetsu: O Poder da Gentileza",text:"Na moral, a decisão universal pretendida decorre de uma razão prática compartilhada por todos. Do respeito a princípios de conduta por ela chancelados. Condição de sobrevivência do grupo. Da sociedade. Da humanidade."},{id:4,lang:"pt-br",author:"Leandro Karnal",title:"O Mundo Como Eu Vejo",text:"Não é possível ser artificial com crianças. Se ler não representa algo para você, ela notará rapidamente. O resultado será desastroso. Funciona como comida: se o brigadeiro é o prêmio para comer quiabo, é lógico supor que o vegetal não é tão bom, já que ele é o pedágio para a felicidade. Funciona assim com livros. O livro deve ser o brigadeiro e não o legume necessário como multa."},{id:5,lang:"en-gb",author:"Project 46",title:"Reasons",text:"Look at the sky, the sun won't ask the world if it can rise. Look at your mind, and ask yourself what keeps you trapped inside. Look at the lights, they follow you when you run and hide. Look at the sky, the sun won't ask, the sun won't ask the world if it can rise."},{id:6,lang:"pt-br",author:"Project 46",title:"Reasons",text:"Olhe para o céu, o sol não pergunta ao mundo se ele pode nascer. Olhe para sua mente, e pergunte a você mesmo o que mantem você preso aí dentro. Olhe para as luzes, elas seguem você quando você corre e esconde. Olhe para o céu, o sol não pergunta, o sol não pergunta ao mundo se ele pode nascer."},{id:7,lang:"pt-br",author:"Jonathan Swift",title:"Gulliver's Travels",text:"Isso me faz refletir, quão vaidosa é uma tentativa de um homem se esforçar-se para fazer-se honrável entre aqueles que estão totalmente fora de todo grau de igualdade ou comparação com ele"},{id:8,lang:"pt-br",author:"Edward J. Tarbuck",title:"Earth: An Introduction to Physical Geology (12th Edition)",text:"Geralmente, os deslizamentos de rochas ocorrem em um ambiente geológico onde os estratos rochosos são inclinados, ou onde as juntas e fratures existem paralelas à encosta. Quando essa unidade de rocha e cortada na base da encosta, ela perde o suporte e a rocha finalmente cede."},{id:9,lang:"en-us",author:"Mary Spio",title:"It's Not Rocket Science: 7 Game-Changing Traits for Uncommon Success",text:"Every fire starts with a spark. Passion is the spark that ignites game-changing creativity, audacity, compassion, tenacity, focus and drive. It is the rocket fuel that launches dreams, a powerful force that guides Game Changers' thoughts, actions and ultimately their lives."},{id:10,lang:"en-us",author:"Arctic Monkeys",title:"Fluorescent Adolescent",text:"You used to get it in your fishnets, now you only get it in your night dress. Discarded all the naughty nights for niceness. Landed in a very common crisis."}]);function Ae(){var e=10,t=1,r=Math.floor(Math.random(Math.random())*(e-t+1))+t;return $e.find(function(e){return e.id===r})}var Me={getQuotes:function(e){setTimeout(function(){return e($e)},100)},getRacing:function(e){return new Promise(function(e,t){setTimeout(function(){var t={quote:Ae(),me:{name:"Me",username:"me",progress:50,wpm:0,wpmHistory:[]}};e(t)},2e3)})}},Ge={racing:{}},Be={},Fe={getRacing:function(){var e=Object(Le["a"])(regeneratorRuntime.mark(function e(t){var r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=t.commit,e.t0=r,e.next=4,Me.getRacing();case 4:e.t1=e.sent,(0,e.t0)("setRacing",e.t1);case 6:case"end":return e.stop()}},e)}));function t(t){return e.apply(this,arguments)}return t}()},Ie={setRacing:function(e,t){e.racing=t}},He={namespaced:!0,state:Ge,getters:Be,actions:Fe,mutations:Ie};a["a"].use(ge["a"]);var Ye=new ge["a"].Store({modules:{racing:He}}),ze=r("9483");Object(ze["a"])("".concat("/typetype/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var Je=["focus",{inserted:function(e){e.focus()}}],Ue=r("a925");function Ve(){var e=r("49f8"),t={};return e.keys().forEach(function(r){var n=r.match(/([A-Za-z0-9-_]+)\./i);if(n&&n.length>1){var a=n[1];t[a]=e(r)}}),t}a["a"].use(Ue["a"]);var Qe=new Ue["a"]({locale:"en",fallbackLocale:"en",messages:Ve()});a["a"].config.productionTip=!1,a["a"].directive.apply(a["a"],Object(n["a"])(Je)),new a["a"]({router:Ne,store:Ye,i18n:Qe,render:function(e){return e(d)}}).$mount("#app")},"5c0b":function(e,t,r){"use strict";var n=r("5e27"),a=r.n(n);a.a},"5e27":function(e,t,r){},"65f4":function(e,t,r){},6719:function(e,t,r){"use strict";var n=r("dd93"),a=r.n(n);a.a},7318:function(e,t,r){"use strict";var n=r("26bc"),a=r.n(n);a.a},"745a":function(e,t,r){"use strict";var n=r("9a11"),a=r.n(n);a.a},"8b09":function(e,t,r){},9808:function(e,t,r){},"9a11":function(e,t,r){},"9a79":function(e,t,r){},aebd:function(e,t,r){},b2d2:function(e,t,r){"use strict";var n=r("b9cc"),a=r.n(n);a.a},b9cc:function(e,t,r){},bfe4:function(e,t,r){"use strict";var n=r("8b09"),a=r.n(n);a.a},dd93:function(e,t,r){},de47:function(e,t,r){e.exports=r.p+"img/flag.d403a41c.gif"},edd4:function(e){e.exports={message:"hello i18n !!","home--training_link":"Run in the training track!","home--training_text":"You can became a hero! You will run against yourself to enhance your skills.","home--run_link":"Run right now!","home--run_text":"Go and run against other typists. You can be a legend!","main_menu--train":"Practice","main_menu--run":"Run"}}});
//# sourceMappingURL=app.c3ffa09f.js.map