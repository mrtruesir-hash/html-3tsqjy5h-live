// ===== DBBET Partners - Interactions =====

// PAGE NAVIGATION
function showPage(id) {
  var pages = document.querySelectorAll('.page');
  for (var i = 0; i < pages.length; i++) {
    pages[i].classList.remove('active');
  }
  var target = document.getElementById('page-' + id);
  if (target) {
    target.classList.add('active');
  }
  var links = document.querySelectorAll('.nav-link');
  for (var j = 0; j < links.length; j++) {
    links[j].classList.toggle(
      'active',
      links[j].getAttribute('data-page') === id
    );
  }
  var nav = document.getElementById('mainNav');
  if (nav) {
    nav.classList.remove('open');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.showPage = showPage;

// MOBILE MENU
function toggleMenu() {
  var nav = document.getElementById('mainNav');
  if (nav) {
    nav.classList.toggle('open');
  }
}
window.toggleMenu = toggleMenu;

// LANGUAGE SELECTOR
function toggleLang() {
  var menu = document.getElementById('langMenu');
  if (menu) {
    menu.classList.toggle('open');
  }
}
window.toggleLang = toggleLang;

function setLang(flag, name) { var cur = document.querySelector('.lang-current'); if (cur) { cur.querySelector('.flag').textContent = flag; cur.querySelector('.lang-name').textContent = name; } var m = document.getElementById('langMenu'); if (m) { m.classList.remove('open'); } var code = (typeof I18N_MAP !== 'undefined' && I18N_MAP[name]) || 'en'; var LANGS = ['ru','bn','ar','uz','tr','fr','si','so','sw','fa','az','ur','hi','ne','es','pt']; var parts = location.pathname.replace(/^\/+/, '').split('/'); if (parts[0] && LANGS.indexOf(parts[0]) !== -1) { parts.shift(); } var slug = parts.filter(function (p) { return p; }).join('/'); var prefix = (code === 'en') ? '' : ('/' + code); var target = slug ? (prefix + '/' + slug) : (prefix + '/'); if (location.pathname.replace(/\/+$/, '') !== target.replace(/\/+$/, '')) { window.location.href = target; } }
window.setLang = setLang;

// CLOSE LANG MENU ON OUTSIDE CLICK
document.addEventListener('click', function (e) {
  var sel = document.getElementById('langSelector');
  var menu = document.getElementById('langMenu');
  if (sel && menu && !sel.contains(e.target)) {
    menu.classList.remove('open');
  }
});

// STICKY HEADER SHADOW
window.addEventListener('scroll', function () {
  var h = document.getElementById('siteHeader');
  if (!h) return;
  if (window.scrollY > 20) {
    h.classList.add('scrolled');
  } else {
    h.classList.remove('scrolled');
  }
});

// NICHE CAROUSEL
var nicheIndex = 0;
function getSlides() {
  return document.querySelectorAll('#carTrack .niche-slide');
}
function renderDots() {
  var dots = document.getElementById('carDots');
  if (!dots) return;
  dots.innerHTML = '';
  var slides = getSlides();
  for (var i = 0; i < slides.length; i++) {
    var b = document.createElement('button');
    b.className = i === nicheIndex ? 'active' : '';
    (function (idx) {
      b.addEventListener('click', function () {
        goNiche(idx);
      });
    })(i);
    dots.appendChild(b);
  }
}
function updateCarousel() {
  var track = document.getElementById('carTrack');
  if (track) {
    var rtlDir =
      document.documentElement.getAttribute('dir') === 'rtl' ||
      window.getComputedStyle(track).direction === 'rtl'
        ? 1
        : -1;
    track.style.transform = 'translateX(' + rtlDir * nicheIndex * 100 + '%)';
  }
  var dots = document.querySelectorAll('#carDots button');
  for (var i = 0; i < dots.length; i++) {
    dots[i].classList.toggle('active', i === nicheIndex);
  }
}
function goNiche(i) {
  var n = getSlides().length;
  nicheIndex = (i + n) % n;
  updateCarousel();
}
function moveNiche(dir) {
  goNiche(nicheIndex + dir);
}
window.moveNiche = moveNiche;

// FAQ ACCORDION
function toggleFaq(btn) {
  var item = btn.parentElement;
  var ans = item.querySelector('.faq-a');
  var isOpen = item.classList.contains('open');
  var all = document.querySelectorAll('.faq-item');
  for (var i = 0; i < all.length; i++) {
    all[i].classList.remove('open');
    all[i].querySelector('.faq-a').style.maxHeight = null;
  }
  if (!isOpen) {
    item.classList.add('open');
    ans.style.maxHeight = ans.scrollHeight + 'px';
  }
}
window.toggleFaq = toggleFaq;

// INIT
document.addEventListener('DOMContentLoaded', function () {
  renderDots();
  updateCarousel();
});
renderDots();
updateCarousel();

/* __DBBET_I18N__ */
var I18N_T = {
  en: {
    'AFFILIATE HUB': 'AFFILIATE HUB',
    'PARTNER BENEFITS': 'PARTNER BENEFITS',
    INSTRUCTION: 'INSTRUCTION',
    'MOB-CASH AGENT': 'MOB-CASH AGENT',
    'Your Traffic Deserves': 'Your Traffic Deserves',
    'Better Returns': 'Better Returns',
    'EXPLORE BENEFITS': 'EXPLORE BENEFITS',
    'HOW IT WORKS': 'HOW IT WORKS',
    'About DBBET': 'About DBBET',
    'Our History': 'Our History',
    'Values & Mission': 'Values & Mission',
    'Our Team': 'Our Team',
    'Choose Your Niche & Start Earning': 'Choose Your Niche & Start Earning',
    'Ready to turn your traffic into revenue?':
      'Ready to turn your traffic into revenue?',
    'Frequently Asked Questions': 'Frequently Asked Questions',
    'Contact Information': 'Contact Information',
    'Agent Benefits': 'Agent Benefits',
    'Become a Mob-Cash Agent today': 'Become a Mob-Cash Agent today',
    Sports: 'Sports',
    Casino: 'Casino',
    Esports: 'Esports',
    'Online Games': 'Online Games',
    Slots: 'Slots',
    'Promote Sports': 'Promote Sports',
    'Promote Casino': 'Promote Casino',
    'Promote Esports': 'Promote Esports',
    'Promote Online Games': 'Promote Online Games',
    'Promote Slots': 'Promote Slots',
    Program: 'Program',
    Contact: 'Contact',
    English: 'English',
  },
  es: {
    'AFFILIATE HUB': 'CENTRO DE AFILIADOS',
    'PARTNER BENEFITS': 'BENEFICIOS DE SOCIOS',
    INSTRUCTION: 'INSTRUCCIONES',
    'MOB-CASH AGENT': 'AGENTE MOB-CASH',
    'Your Traffic Deserves': 'Tu Tr\u00e1fico Merece',
    'Better Returns': 'Mejores Ganancias',
    'EXPLORE BENEFITS': 'VER BENEFICIOS',
    'HOW IT WORKS': 'C\u00d3MO FUNCIONA',
    'About DBBET': 'Acerca de DBBET',
    'Our History': 'Nuestra Historia',
    'Values & Mission': 'Valores y Misi\u00f3n',
    'Our Team': 'Nuestro Equipo',
    'Choose Your Niche & Start Earning': 'Elige Tu Nicho y Empieza a Ganar',
    'Ready to turn your traffic into revenue?':
      '\u00bfListo para convertir tu tr\u00e1fico en ingresos?',
    'Frequently Asked Questions': 'Preguntas Frecuentes',
    'Contact Information': 'Informaci\u00f3n de Contacto',
    'Agent Benefits': 'Beneficios del Agente',
    'Become a Mob-Cash Agent today': 'Convi\u00e9rtete en Agente Mob-Cash hoy',
    Sports: 'Deportes',
    Casino: 'Casino',
    Esports: 'Esports',
    'Online Games': 'Juegos en L\u00ednea',
    Slots: 'Tragamonedas',
    'Promote Sports': 'Promover Deportes',
    'Promote Casino': 'Promover Casino',
    'Promote Esports': 'Promover Esports',
    'Promote Online Games': 'Promover Juegos en L\u00ednea',
    'Promote Slots': 'Promover Tragamonedas',
    Program: 'Programa',
    Contact: 'Contacto',
    English: 'Espa\u00f1ol',
  },
  pt: {
    'AFFILIATE HUB': 'CENTRO DE AFILIADOS',
    'PARTNER BENEFITS': 'BENEF\u00cdCIOS DE PARCEIROS',
    INSTRUCTION: 'INSTRU\u00c7\u00d5ES',
    'MOB-CASH AGENT': 'AGENTE MOB-CASH',
    'Your Traffic Deserves': 'Seu Tr\u00e1fego Merece',
    'Better Returns': 'Melhores Retornos',
    'EXPLORE BENEFITS': 'VER BENEF\u00cdCIOS',
    'HOW IT WORKS': 'COMO FUNCIONA',
    'About DBBET': 'Sobre a DBBET',
    'Our History': 'Nossa Hist\u00f3ria',
    'Values & Mission': 'Valores e Miss\u00e3o',
    'Our Team': 'Nossa Equipe',
    'Choose Your Niche & Start Earning': 'Escolha Seu Nicho e Comece a Ganhar',
    'Ready to turn your traffic into revenue?':
      'Pronto para transformar seu tr\u00e1fego em receita?',
    'Frequently Asked Questions': 'Perguntas Frequentes',
    'Contact Information': 'Informa\u00e7\u00f5es de Contato',
    'Agent Benefits': 'Benef\u00edcios do Agente',
    'Become a Mob-Cash Agent today': 'Torne-se um Agente Mob-Cash hoje',
    Sports: 'Esportes',
    Casino: 'Cassino',
    Esports: 'Esports',
    'Online Games': 'Jogos Online',
    Slots: 'Slots',
    'Promote Sports': 'Promover Esportes',
    'Promote Casino': 'Promover Cassino',
    'Promote Esports': 'Promover Esports',
    'Promote Online Games': 'Promover Jogos Online',
    'Promote Slots': 'Promover Slots',
    Program: 'Programa',
    Contact: 'Contato',
    English: 'Portugu\u00eas',
  },
  fr: {
    'AFFILIATE HUB': "CENTRE D'AFFILI\u00c9S",
    'PARTNER BENEFITS': 'AVANTAGES PARTENAIRES',
    INSTRUCTION: 'INSTRUCTIONS',
    'MOB-CASH AGENT': 'AGENT MOB-CASH',
    'Your Traffic Deserves': 'Votre Trafic M\u00e9rite',
    'Better Returns': 'De Meilleurs Gains',
    'EXPLORE BENEFITS': 'VOIR LES AVANTAGES',
    'HOW IT WORKS': 'COMMENT \u00c7A MARCHE',
    'About DBBET': '\u00c0 propos de DBBET',
    'Our History': 'Notre Histoire',
    'Values & Mission': 'Valeurs et Mission',
    'Our Team': 'Notre \u00c9quipe',
    'Choose Your Niche & Start Earning':
      'Choisissez Votre Niche et Commencez \u00e0 Gagner',
    'Ready to turn your traffic into revenue?':
      'Pr\u00eat \u00e0 transformer votre trafic en revenus ?',
    'Frequently Asked Questions': 'Questions Fr\u00e9quentes',
    'Contact Information': 'Informations de Contact',
    'Agent Benefits': "Avantages de l'Agent",
    'Become a Mob-Cash Agent today': "Devenez Agent Mob-Cash aujourd'hui",
    Sports: 'Sports',
    Casino: 'Casino',
    Esports: 'Esports',
    'Online Games': 'Jeux en Ligne',
    Slots: 'Machines \u00e0 Sous',
    'Promote Sports': 'Promouvoir Sports',
    'Promote Casino': 'Promouvoir Casino',
    'Promote Esports': 'Promouvoir Esports',
    'Promote Online Games': 'Promouvoir Jeux en Ligne',
    'Promote Slots': 'Promouvoir Machines \u00e0 Sous',
    Program: 'Programme',
    Contact: 'Contact',
    English: 'Fran\u00e7ais',
  },
  tr: {
    'AFFILIATE HUB': 'ORTAKLIK MERKEZ\u0130',
    'PARTNER BENEFITS': 'ORTAK AVANTAJLARI',
    INSTRUCTION: 'TAL\u0130MATLAR',
    'MOB-CASH AGENT': 'MOB-CASH ACENTES\u0130',
    'Your Traffic Deserves': 'Trafi\u011finiz Hak Ediyor',
    'Better Returns': 'Daha \u0130yi Kazan\u00e7',
    'EXPLORE BENEFITS': 'AVANTAJLARI G\u00d6R',
    'HOW IT WORKS': 'NASIL \u00c7ALI\u015eIR',
    'About DBBET': 'DBBET Hakk\u0131nda',
    'Our History': 'Tarih\u00e7emiz',
    'Values & Mission': 'De\u011ferler ve Misyon',
    'Our Team': 'Ekibimiz',
    'Choose Your Niche & Start Earning':
      'Ni\u015fini Se\u00e7 ve Kazanmaya Ba\u015fla',
    'Ready to turn your traffic into revenue?':
      'Trafi\u011finizi gelire d\u00f6n\u00fc\u015ft\u00fcrmeye haz\u0131r m\u0131s\u0131n\u0131z?',
    'Frequently Asked Questions': 'S\u0131k\u00e7a Sorulan Sorular',
    'Contact Information': '\u0130leti\u015fim Bilgileri',
    'Agent Benefits': 'Acente Avantajlar\u0131',
    'Become a Mob-Cash Agent today': 'Bug\u00fcn Mob-Cash Acentesi Olun',
    Sports: 'Spor',
    Casino: 'Casino',
    Esports: 'Esports',
    'Online Games': '\u00c7evrimi\u00e7i Oyunlar',
    Slots: 'Slotlar',
    'Promote Sports': 'Sporu Tan\u0131t',
    'Promote Casino': 'Casino Tan\u0131t',
    'Promote Esports': 'Esports Tan\u0131t',
    'Promote Online Games': '\u00c7evrimi\u00e7i Oyunlar\u0131 Tan\u0131t',
    'Promote Slots': 'Slotlar\u0131 Tan\u0131t',
    Program: 'Program',
    Contact: '\u0130leti\u015fim',
    English: 'T\u00fcrk\u00e7e',
  },
  uz: {
    'AFFILIATE HUB': 'HAMKORLIK MARKAZI',
    'PARTNER BENEFITS': 'HAMKOR IMTIYOZLARI',
    INSTRUCTION: "KO'RSATMALAR",
    'MOB-CASH AGENT': 'MOB-CASH AGENTI',
    'Your Traffic Deserves': 'Trafigingiz Loyiq',
    'Better Returns': 'Yaxshiroq Daromad',
    'EXPLORE BENEFITS': "IMTIYOZLARNI KO'RISH",
    'HOW IT WORKS': 'QANDAY ISHLAYDI',
    'About DBBET': 'DBBET haqida',
    'Our History': 'Tariximiz',
    'Values & Mission': 'Qadriyatlar va Missiya',
    'Our Team': 'Jamoamiz',
    'Choose Your Niche & Start Earning':
      "O'z Yo'nalishingizni Tanlang va Daromad Boshlang",
    'Ready to turn your traffic into revenue?':
      'Trafikni daromadga aylantirishga tayyormisiz?',
    'Frequently Asked Questions': "Ko'p Beriladigan Savollar",
    'Contact Information': "Aloqa Ma'lumotlari",
    'Agent Benefits': 'Agent Imtiyozlari',
    'Become a Mob-Cash Agent today': "Bugun Mob-Cash Agenti Bo'ling",
    Sports: 'Sport',
    Casino: 'Casino',
    Esports: 'Esports',
    'Online Games': "Onlayn O'yinlar",
    Slots: 'Slotlar',
    'Promote Sports': 'Sportni Reklama Qilish',
    'Promote Casino': 'Casinoni Reklama Qilish',
    'Promote Esports': 'Esportsni Reklama Qilish',
    'Promote Online Games': "Onlayn O'yinlarni Reklama Qilish",
    'Promote Slots': 'Slotlarni Reklama Qilish',
    Program: 'Dastur',
    Contact: 'Aloqa',
    English: "O'zbek",
  },
  az: {
    'AFFILIATE HUB': 'AFFIL\u0130AT M\u018eRK\u018eZ\u0130',
    'PARTNER BENEFITS':
      'T:R\u018fFDA\u015e \u00dcST\u00dcNL\u00dcKL\u018eR\u0130',
    INSTRUCTION: 'T\u018eL\u0130MATLAR',
    'MOB-CASH AGENT': 'MOB-CASH AGENT\u0130',
    'Your Traffic Deserves': 'Trafikiniz Layiqdir',
    'Better Returns': 'Daha Yax\u015f\u0131 G\u0259lir',
    'EXPLORE BENEFITS': '\u00dcST\u00dcNL\u00dcKL\u018eR\u0130 G\u00d6R',
    'HOW IT WORKS': 'NEC\u018e \u0130\u015eL\u018eY\u0130R',
    'About DBBET': 'DBBET Haqq\u0131nda',
    'Our History': 'Tariximiz',
    'Values & Mission': 'D\u0259y\u0259rl\u0259r v\u0259 Missiya',
    'Our Team': 'Komandam\u0131z',
    'Choose Your Niche & Start Earning':
      'Ni\u015finizi Se\u00e7in v\u0259 Qazanmaya Ba\u015flay\u0131n',
    'Ready to turn your traffic into revenue?':
      'Trafikinizi g\u0259lir\u0259 \u00e7evirm\u0259y\u0259 haz\u0131rs\u0131n\u0131z?',
    'Frequently Asked Questions': 'Tez-tez Veril\u0259n Suallar',
    'Contact Information': '\u018flaq\u0259 M\u0259lumatlar\u0131',
    'Agent Benefits': 'Agent \u00dcst\u00fcnl\u00fckl\u0259ri',
    'Become a Mob-Cash Agent today': 'Bu g\u00fcn Mob-Cash Agenti Olun',
    Sports: '\u0130dman',
    Casino: 'Casino',
    Esports: 'Esports',
    'Online Games': 'Onlayn Oyunlar',
    Slots: 'Slotlar',
    'Promote Sports': '\u0130dman\u0131 T\u0259bli\u011f Et',
    'Promote Casino': 'Casinonu T\u0259bli\u011f Et',
    'Promote Esports': 'Esports T\u0259bli\u011f Et',
    'Promote Online Games': 'Onlayn Oyunlar\u0131 T\u0259bli\u011f Et',
    'Promote Slots': 'Slotlar\u0131 T\u0259bli\u011f Et',
    Program: 'Proqram',
    Contact: '\u018flaq\u0259',
    English: 'Az\u0259rbaycan',
  },
  ru: {
    'AFFILIATE HUB':
      '\u041f\u0410\u0420\u0422\u041d\u0401\u0420\u0421\u041a\u0418\u0419 \u0426\u0415\u041d\u0422\u0420',
    'PARTNER BENEFITS':
      '\u041f\u0420\u0415\u0418\u041c\u0423\u0429\u0415\u0421\u0422\u0412\u0410',
    INSTRUCTION: '\u0418\u041d\u0421\u0422\u0420\u0423\u041a\u0426\u0418\u042f',
    'MOB-CASH AGENT': 'MOB-CASH \u0410\u0413\u0415\u041d\u0422',
    'Your Traffic Deserves':
      '\u0412\u0430\u0448 \u0442\u0440\u0430\u0444\u0438\u043a \u0437\u0430\u0441\u043b\u0443\u0436\u0438\u0432\u0430\u0435\u0442',
    'Better Returns':
      '\u041b\u0443\u0447\u0448\u0438\u0445 \u0414\u043e\u0445\u043e\u0434\u043e\u0432',
    'EXPLORE BENEFITS':
      '\u0421\u041c\u041e\u0422\u0420\u0415\u0422\u042c \u0411\u041e\u041d\u0423\u0421\u042b',
    'HOW IT WORKS':
      '\u041a\u0410\u041a \u042d\u0422\u041e \u0420\u0410\u0411\u041e\u0422\u0410\u0415\u0422',
    'About DBBET': '\u041e DBBET',
    'Our History':
      '\u041d\u0430\u0448\u0430 \u0418\u0441\u0442\u043e\u0440\u0438\u044f',
    'Values & Mission':
      '\u0426\u0435\u043d\u043d\u043e\u0441\u0442\u0438 \u0438 \u041c\u0438\u0441\u0441\u0438\u044f',
    'Our Team':
      '\u041d\u0430\u0448\u0430 \u041a\u043e\u043c\u0430\u043d\u0434\u0430',
    'Choose Your Niche & Start Earning':
      '\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u041d\u0438\u0448\u0443 \u0438 \u041d\u0430\u0447\u043d\u0438\u0442\u0435 \u0417\u0430\u0440\u0430\u0431\u0430\u0442\u044b\u0432\u0430\u0442\u044c',
    'Ready to turn your traffic into revenue?':
      '\u0413\u043e\u0442\u043e\u0432\u044b \u043f\u0440\u0435\u0432\u0440\u0430\u0442\u0438\u0442\u044c \u0442\u0440\u0430\u0444\u0438\u043a \u0432 \u0434\u043e\u0445\u043e\u0434?',
    'Frequently Asked Questions':
      '\u0427\u0430\u0441\u0442\u044b\u0435 \u0412\u043e\u043f\u0440\u043e\u0441\u044b',
    'Contact Information':
      '\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u043d\u0430\u044f \u0418\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f',
    'Agent Benefits':
      '\u041f\u0440\u0435\u0438\u043c\u0443\u0449\u0435\u0441\u0442\u0432\u0430 \u0410\u0433\u0435\u043d\u0442\u0430',
    'Become a Mob-Cash Agent today':
      '\u0421\u0442\u0430\u043d\u044c\u0442\u0435 Mob-Cash \u0410\u0433\u0435\u043d\u0442\u043e\u043c \u0441\u0435\u0433\u043e\u0434\u043d\u044f',
    Sports: '\u0421\u043f\u043e\u0440\u0442',
    Casino: '\u041a\u0430\u0437\u0438\u043d\u043e',
    Esports: '\u041a\u0438\u0431\u0435\u0440\u0441\u043f\u043e\u0440\u0442',
    'Online Games':
      '\u041e\u043d\u043b\u0430\u0439\u043d \u0418\u0433\u0440\u044b',
    Slots: '\u0421\u043b\u043e\u0442\u044b',
    'Promote Sports':
      '\u041f\u0440\u043e\u0434\u0432\u0438\u0433\u0430\u0442\u044c \u0421\u043f\u043e\u0440\u0442',
    'Promote Casino':
      '\u041f\u0440\u043e\u0434\u0432\u0438\u0433\u0430\u0442\u044c \u041a\u0430\u0437\u0438\u043d\u043e',
    'Promote Esports':
      '\u041f\u0440\u043e\u0434\u0432\u0438\u0433\u0430\u0442\u044c \u041a\u0438\u0431\u0435\u0440\u0441\u043f\u043e\u0440\u0442',
    'Promote Online Games':
      '\u041f\u0440\u043e\u0434\u0432\u0438\u0433\u0430\u0442\u044c \u041e\u043d\u043b\u0430\u0439\u043d \u0418\u0433\u0440\u044b',
    'Promote Slots':
      '\u041f\u0440\u043e\u0434\u0432\u0438\u0433\u0430\u0442\u044c \u0421\u043b\u043e\u0442\u044b',
    Program: '\u041f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0430',
    Contact: '\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b',
    English: '\u0420\u0443\u0441\u0441\u043a\u0438\u0439',
  },
  ar: {
    'AFFILIATE HUB':
      '\u0645\u0631\u0643\u0632 \u0627\u0644\u0634\u0631\u0643\u0627\u0621',
    'PARTNER BENEFITS':
      '\u0645\u0632\u0627\u064a\u0627 \u0627\u0644\u0634\u0631\u0643\u0627\u0621',
    INSTRUCTION: '\u0627\u0644\u062a\u0639\u0644\u064a\u0645\u0627\u062a',
    'MOB-CASH AGENT': '\u0648\u0643\u064a\u0644 MOB-CASH',
    'Your Traffic Deserves':
      '\u062d\u0631\u0643\u0629 \u0645\u0631\u0648\u0631\u0643 \u062a\u0633\u062a\u062d\u0642',
    'Better Returns': '\u0639\u0648\u0627\u0626\u062f \u0623\u0641\u0636\u0644',
    'EXPLORE BENEFITS':
      '\u0639\u0631\u0636 \u0627\u0644\u0645\u0632\u0627\u064a\u0627',
    'HOW IT WORKS': '\u0643\u064a\u0641 \u064a\u0639\u0645\u0644',
    'About DBBET': '\u062d\u0648\u0644 DBBET',
    'Our History': '\u062a\u0627\u0631\u064a\u062e\u0646\u0627',
    'Values & Mission':
      '\u0627\u0644\u0642\u064a\u0645 \u0648\u0627\u0644\u0631\u0633\u0627\u0644\u0629',
    'Our Team': '\u0641\u0631\u064a\u0642\u0646\u0627',
    'Choose Your Niche & Start Earning':
      '\u0627\u062e\u062a\u0631 \u0645\u062c\u0627\u0644\u0643 \u0648\u0627\u0628\u062f\u0623 \u0627\u0644\u0631\u0628\u062d',
    'Ready to turn your traffic into revenue?':
      '\u0647\u0644 \u0623\u0646\u062a \u0645\u0633\u062a\u0639\u062f \u0644\u062a\u062d\u0648\u064a\u0644 \u062d\u0631\u0643\u0629 \u0645\u0631\u0648\u0631\u0643 \u0625\u0644\u0649 \u0625\u064a\u0631\u0627\u062f\u061f',
    'Frequently Asked Questions':
      '\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0634\u0627\u0626\u0639\u0629',
    'Contact Information':
      '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0627\u062a\u0635\u0627\u0644',
    'Agent Benefits':
      '\u0645\u0632\u0627\u064a\u0627 \u0627\u0644\u0648\u0643\u064a\u0644',
    'Become a Mob-Cash Agent today':
      '\u0643\u0646 \u0648\u0643\u064a\u0644 Mob-Cash \u0627\u0644\u064a\u0648\u0645',
    Sports: '\u0627\u0644\u0631\u064a\u0627\u0636\u0629',
    Casino: '\u0627\u0644\u0643\u0627\u0632\u064a\u0646\u0648',
    Esports:
      '\u0627\u0644\u0631\u064a\u0627\u0636\u0627\u062a \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u0629',
    'Online Games':
      '\u0627\u0644\u0623\u0644\u0639\u0627\u0628 \u0639\u0628\u0631 \u0627\u0644\u0625\u0646\u062a\u0631\u0646\u062a',
    Slots: '\u0633\u0644\u0648\u062a\u0633',
    'Promote Sports':
      '\u0631\u0648\u0651\u062c \u0644\u0644\u0631\u064a\u0627\u0636\u0629',
    'Promote Casino':
      '\u0631\u0648\u0651\u062c \u0644\u0644\u0643\u0627\u0632\u064a\u0646\u0648',
    'Promote Esports':
      '\u0631\u0648\u0651\u062c \u0644\u0644\u0631\u064a\u0627\u0636\u0627\u062a \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u0629',
    'Promote Online Games':
      '\u0631\u0648\u0651\u062c \u0644\u0644\u0623\u0644\u0639\u0627\u0628 \u0639\u0628\u0631 \u0627\u0644\u0625\u0646\u062a\u0631\u0646\u062a',
    'Promote Slots':
      '\u0631\u0648\u0651\u062c \u0644\u0633\u0644\u0648\u062a\u0633',
    Program: '\u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062c',
    Contact: '\u0627\u062a\u0635\u0627\u0644',
    English: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629',
  },
  fa: {
    'AFFILIATE HUB':
      '\u0645\u0631\u06a9\u0632 \u0647\u0645\u06a9\u0627\u0631\u0627\u0646',
    'PARTNER BENEFITS':
      '\u0645\u0632\u0627\u06cc\u0627\u06cc \u0634\u0631\u06a9\u0627',
    INSTRUCTION: '\u062f\u0633\u062a\u0648\u0631\u0627\u0644\u0639\u0645\u0644',
    'MOB-CASH AGENT': '\u0646\u0645\u0627\u06cc\u0646\u062f\u0647 MOB-CASH',
    'Your Traffic Deserves':
      '\u062a\u0631\u0627\u0641\u06cc\u06a9 \u0634\u0645\u0627 \u0633\u0632\u0627\u0648\u0627\u0631 \u0627\u0633\u062a',
    'Better Returns': '\u0628\u0627\u0632\u062f\u0647 \u0628\u0647\u062a\u0631',
    'EXPLORE BENEFITS':
      '\u0645\u0634\u0627\u0647\u062f\u0647 \u0645\u0632\u0627\u06cc\u0627',
    'HOW IT WORKS':
      '\u0686\u06af\u0648\u0646\u0647 \u06a9\u0627\u0631 \u0645\u06cc\u200c\u06a9\u0646\u062f',
    'About DBBET': '\u062f\u0631\u0628\u0627\u0631\u0647 DBBET',
    'Our History': '\u062a\u0627\u0631\u06cc\u062e\u0686\u0647 \u0645\u0627',
    'Values & Mission':
      '\u0627\u0631\u0632\u0634\u200c\u0647\u0627 \u0648 \u0645\u0627\u0645\u0648\u0631\u06cc\u062a',
    'Our Team': '\u062a\u06cc\u0645 \u0645\u0627',
    'Choose Your Niche & Start Earning':
      '\u062d\u0648\u0632\u0647 \u062e\u0648\u062f \u0631\u0627 \u0627\u0646\u062a\u062e\u0627\u0628 \u06a9\u0646\u06cc\u062f \u0648 \u062f\u0631\u0622\u0645\u062f \u0631\u0627 \u0634\u0631\u0648\u0639 \u06a9\u0646\u06cc\u062f',
    'Ready to turn your traffic into revenue?':
      '\u0622\u06cc\u0627 \u0622\u0645\u0627\u062f\u0647\u200c\u0627\u06cc\u062f \u062a\u0631\u0627\u0641\u06cc\u06a9 \u062e\u0648\u062f \u0631\u0627 \u0628\u0647 \u062f\u0631\u0622\u0645\u062f \u062a\u0628\u062f\u06cc\u0644 \u06a9\u0646\u06cc\u062f\u061f',
    'Frequently Asked Questions':
      '\u0633\u0648\u0627\u0644\u0627\u062a \u0645\u062a\u062f\u0627\u0648\u0644',
    'Contact Information':
      '\u0627\u0637\u0644\u0627\u0639\u0627\u062a \u062a\u0645\u0627\u0633',
    'Agent Benefits':
      '\u0645\u0632\u0627\u06cc\u0627\u06cc \u0646\u0645\u0627\u06cc\u0646\u062f\u0647',
    'Become a Mob-Cash Agent today':
      '\u0627\u0645\u0631\u0648\u0632 \u0646\u0645\u0627\u06cc\u0646\u062f\u0647 Mob-Cash \u0634\u0648\u06cc\u062f',
    Sports: '\u0648\u0631\u0632\u0634',
    Casino: '\u06a9\u0627\u0632\u06cc\u0646\u0648',
    Esports:
      '\u0648\u0631\u0632\u0634\u200c\u0647\u0627\u06cc \u0627\u0644\u06a9\u062a\u0631\u0648\u0646\u06cc\u06a9',
    'Online Games':
      '\u0628\u0627\u0632\u06cc\u200c\u0647\u0627\u06cc \u0622\u0646\u0644\u0627\u06cc\u0646',
    Slots: '\u0627\u0633\u0644\u0627\u062a',
    'Promote Sports': '\u062a\u0628\u0644\u06cc\u063a \u0648\u0631\u0632\u0634',
    'Promote Casino':
      '\u062a\u0628\u0644\u06cc\u063a \u06a9\u0627\u0632\u06cc\u0646\u0648',
    'Promote Esports':
      '\u062a\u0628\u0644\u06cc\u063a \u0648\u0631\u0632\u0634\u200c\u0647\u0627\u06cc \u0627\u0644\u06a9\u062a\u0631\u0648\u0646\u06cc\u06a9',
    'Promote Online Games':
      '\u062a\u0628\u0644\u06cc\u063a \u0628\u0627\u0632\u06cc\u200c\u0647\u0627\u06cc \u0622\u0646\u0644\u0627\u06cc\u0646',
    'Promote Slots':
      '\u062a\u0628\u0644\u06cc\u063a \u0627\u0633\u0644\u0627\u062a',
    Program: '\u0628\u0631\u0646\u0627\u0645\u0647',
    Contact: '\u062a\u0645\u0627\u0633',
    English: '\u0641\u0627\u0631\u0633\u06cc',
  },
  ur: {
    'AFFILIATE HUB':
      '\u0627\u06cc\u0641\u0644\u06cc\u0626\u06cc\u0679 \u0633\u06cc\u0646\u0679\u0631',
    'PARTNER BENEFITS':
      '\u067e\u0627\u0631\u0679\u0646\u0631 \u0641\u0648\u0627\u0626\u062f',
    INSTRUCTION: '\u06c1\u062f\u0627\u06cc\u0627\u062a',
    'MOB-CASH AGENT': 'MOB-CASH \u0627\u06cc\u062c\u0646\u0679',
    'Your Traffic Deserves':
      '\u0622\u067e \u06a9\u0627 \u0679\u0631\u06cc\u0641\u06a9 \u0645\u0633\u062a\u062d\u0642 \u06c1\u06d2',
    'Better Returns': '\u0628\u06c1\u062a\u0631 \u0622\u0645\u062f\u0646\u06cc',
    'EXPLORE BENEFITS':
      '\u0641\u0648\u0627\u0626\u062f \u062f\u06cc\u06a9\u06be\u06cc\u06ba',
    'HOW IT WORKS':
      '\u06cc\u06c1 \u06a9\u06cc\u0633\u06d2 \u06a9\u0627\u0645 \u06a9\u0631\u062a\u0627 \u06c1\u06d2',
    'About DBBET':
      'DBBET \u06a9\u06d2 \u0628\u0627\u0631\u06d2 \u0645\u06cc\u06ba',
    'Our History':
      '\u06c1\u0645\u0627\u0631\u06cc \u062a\u0627\u0631\u06cc\u062e',
    'Values & Mission':
      '\u0627\u0642\u062f\u0627\u0631 \u0627\u0648\u0631 \u0645\u0634\u0646',
    'Our Team': '\u06c1\u0645\u0627\u0631\u06cc \u0679\u06cc\u0645',
    'Choose Your Niche & Start Earning':
      '\u0627\u067e\u0646\u0627 \u0634\u0639\u0628\u06c1 \u0645\u0646\u062a\u062e\u0628 \u06a9\u0631\u06cc\u06ba \u0627\u0648\u0631 \u06a9\u0645\u0627\u0646\u0627 \u0634\u0631\u0648\u0639 \u06a9\u0631\u06cc\u06ba',
    'Ready to turn your traffic into revenue?':
      '\u06a9\u06cc\u0627 \u0622\u067e \u0627\u067e\u0646\u06d2 \u0679\u0631\u06cc\u0641\u06a9 \u06a9\u0648 \u0622\u0645\u062f\u0646\u06cc \u0645\u06cc\u06ba \u0628\u062f\u0644\u0646\u06d2 \u06a9\u06d2 \u0644\u06cc\u06d2 \u062a\u06cc\u0627\u0631 \u06c1\u06cc\u06ba\u061f',
    'Frequently Asked Questions':
      '\u0627\u06a9\u062b\u0631 \u067e\u0648\u0686\u06be\u06d2 \u062c\u0627\u0646\u06d2 \u0648\u0627\u0644\u06d2 \u0633\u0648\u0627\u0644\u0627\u062a',
    'Contact Information':
      '\u0631\u0627\u0628\u0637\u06d2 \u06a9\u06cc \u0645\u0639\u0644\u0648\u0645\u0627\u062a',
    'Agent Benefits':
      '\u0627\u06cc\u062c\u0646\u0679 \u06a9\u06d2 \u0641\u0648\u0627\u0626\u062f',
    'Become a Mob-Cash Agent today':
      '\u0622\u062c \u06c1\u06cc Mob-Cash \u0627\u06cc\u062c\u0646\u0679 \u0628\u0646\u06cc\u06ba',
    Sports: '\u0627\u0633\u067e\u0648\u0631\u0679\u0633',
    Casino: '\u06a9\u06cc\u0633\u06cc\u0646\u0648',
    Esports: '\u0627\u06cc \u0627\u0633\u067e\u0648\u0631\u0679\u0633',
    'Online Games':
      '\u0622\u0646 \u0644\u0627\u0626\u0646 \u06af\u06cc\u0645\u0632',
    Slots: '\u0633\u0644\u0627\u0679\u0633',
    'Promote Sports':
      '\u0627\u0633\u067e\u0648\u0631\u0679\u0633 \u06a9\u06cc \u062a\u0634\u06c1\u06cc\u0631',
    'Promote Casino':
      '\u06a9\u06cc\u0633\u06cc\u0646\u0648 \u06a9\u06cc \u062a\u0634\u06c1\u06cc\u0631',
    'Promote Esports':
      '\u0627\u06cc \u0627\u0633\u067e\u0648\u0631\u0679\u0633 \u06a9\u06cc \u062a\u0634\u06c1\u06cc\u0631',
    'Promote Online Games':
      '\u0622\u0646 \u0644\u0627\u0626\u0646 \u06af\u06cc\u0645\u0632 \u06a9\u06cc \u062a\u0634\u06c1\u06cc\u0631',
    'Promote Slots':
      '\u0633\u0644\u0627\u0679\u0633 \u06a9\u06cc \u062a\u0634\u06c1\u06cc\u0631',
    Program: '\u067e\u0631\u0648\u06af\u0631\u0627\u0645',
    Contact: '\u0631\u0627\u0628\u0637\u06c1',
    English: '\u0627\u0631\u062f\u0648',
  },
  bn: {
    'AFFILIATE HUB':
      '\u098f\u09ab\u09bf\u09b2\u09bf\u09df\u09c7\u099f \u09b9\u09be\u09ac',
    'PARTNER BENEFITS':
      '\u09aa\u09be\u09b0\u09cd\u099f\u09a8\u09be\u09b0 \u09b8\u09c1\u09ac\u09bf\u09a7\u09be',
    INSTRUCTION:
      '\u09a8\u09bf\u09b0\u09cd\u09a6\u09c7\u09b6\u09be\u09ac\u09b2\u09c0',
    'MOB-CASH AGENT': 'MOB-CASH \u098f\u099c\u09c7\u09a8\u09cd\u099f',
    'Your Traffic Deserves':
      '\u0986\u09aa\u09a8\u09be\u09b0 \u099f\u09cd\u09b0\u09be\u09ab\u09bf\u0995 \u09aa\u09cd\u09b0\u09be\u09aa\u09cd\u09af',
    'Better Returns':
      '\u09ad\u09be\u09b2\u09cb \u09b0\u09bf\u099f\u09be\u09b0\u09cd\u09a8',
    'EXPLORE BENEFITS':
      '\u09b8\u09c1\u09ac\u09bf\u09a7\u09be \u09a6\u09c7\u0996\u09c1\u09a8',
    'HOW IT WORKS':
      '\u0995\u09bf\u09ad\u09be\u09ac\u09c7 \u0995\u09be\u099c \u0995\u09b0\u09c7',
    'About DBBET': 'DBBET \u09b8\u09ae\u09cd\u09aa\u09b0\u09cd\u0995\u09c7',
    'Our History':
      '\u0986\u09ae\u09be\u09a6\u09c7\u09b0 \u0987\u09a4\u09bf\u09b9\u09be\u09b8',
    'Values & Mission':
      '\u09ae\u09c2\u09b2\u09cd\u09af\u09ac\u09cb\u09a7 \u0993 \u09b2\u0995\u09cd\u09b7\u09cd\u09af',
    'Our Team': '\u0986\u09ae\u09be\u09a6\u09c7\u09b0 \u09a6\u09b2',
    'Choose Your Niche & Start Earning':
      '\u0986\u09aa\u09a8\u09be\u09b0 \u09a8\u09bf\u09b6 \u09ac\u09c7\u099b\u09c7 \u09a8\u09bf\u09a8 \u098f\u09ac\u0982 \u0986\u09df \u09b6\u09c1\u09b0\u09c1 \u0995\u09b0\u09c1\u09a8',
    'Ready to turn your traffic into revenue?':
      '\u0986\u09aa\u09a8\u09be\u09b0 \u099f\u09cd\u09b0\u09be\u09ab\u09bf\u0995\u0995\u09c7 \u0986\u09df\u09c7 \u09b0\u09c2\u09aa\u09be\u09a8\u09cd\u09a4\u09b0 \u0995\u09b0\u09a4\u09c7 \u09aa\u09cd\u09b0\u09b8\u09cd\u09a4\u09c1\u09a4?',
    'Frequently Asked Questions':
      '\u09b8\u09be\u09a7\u09be\u09b0\u09a3 \u099c\u09bf\u099c\u09cd\u099e\u09be\u09b8\u09be',
    'Contact Information':
      '\u09af\u09cb\u0997\u09be\u09af\u09cb\u0997\u09c7\u09b0 \u09a4\u09a5\u09cd\u09af',
    'Agent Benefits':
      '\u098f\u099c\u09c7\u09a8\u09cd\u099f \u09b8\u09c1\u09ac\u09bf\u09a7\u09be',
    'Become a Mob-Cash Agent today':
      '\u0986\u099c\u0987 Mob-Cash \u098f\u099c\u09c7\u09a8\u09cd\u099f \u09b9\u09a8',
    Sports: '\u0996\u09c7\u09b2\u09be\u09a7\u09c1\u09b2\u09be',
    Casino: '\u0995\u09cd\u09af\u09be\u09b8\u09bf\u09a8\u09cb',
    Esports: '\u0987\u09b8\u09cd\u09aa\u09cb\u09b0\u09cd\u099f\u09b8',
    'Online Games': '\u0985\u09a8\u09b2\u09be\u0987\u09a8 \u0997\u09c7\u09ae',
    Slots: '\u09b8\u09cd\u09b2\u099f',
    'Promote Sports':
      '\u0996\u09c7\u09b2\u09be \u09aa\u09cd\u09b0\u099a\u09be\u09b0 \u0995\u09b0\u09c1\u09a8',
    'Promote Casino':
      '\u0995\u09cd\u09af\u09be\u09b8\u09bf\u09a8\u09cb \u09aa\u09cd\u09b0\u099a\u09be\u09b0 \u0995\u09b0\u09c1\u09a8',
    'Promote Esports':
      '\u0987\u09b8\u09cd\u09aa\u09cb\u09b0\u09cd\u099f\u09b8 \u09aa\u09cd\u09b0\u099a\u09be\u09b0 \u0995\u09b0\u09c1\u09a8',
    'Promote Online Games':
      '\u0985\u09a8\u09b2\u09be\u0987\u09a8 \u0997\u09c7\u09ae \u09aa\u09cd\u09b0\u099a\u09be\u09b0 \u0995\u09b0\u09c1\u09a8',
    'Promote Slots':
      '\u09b8\u09cd\u09b2\u099f \u09aa\u09cd\u09b0\u099a\u09be\u09b0 \u0995\u09b0\u09c1\u09a8',
    Program: '\u09aa\u09cd\u09b0\u09cb\u0997\u09cd\u09b0\u09be\u09ae',
    Contact: '\u09af\u09cb\u0997\u09be\u09af\u09cb\u0997',
    English: '\u09ac\u09be\u0982\u09b2\u09be',
  },
  hi: {
    'AFFILIATE HUB':
      '\u090f\u092b\u093c\u093f\u0932\u093f\u090f\u091f \u0939\u092c',
    'PARTNER BENEFITS':
      '\u092a\u093e\u0930\u094d\u091f\u0928\u0930 \u0932\u093e\u092d',
    INSTRUCTION: '\u0928\u093f\u0930\u094d\u0926\u0947\u0936',
    'MOB-CASH AGENT': 'MOB-CASH \u090f\u091c\u0947\u0902\u091f',
    'Your Traffic Deserves':
      '\u0906\u092a\u0915\u093e \u091f\u094d\u0930\u0948\u092b\u093f\u0915 \u092f\u094b\u0917\u094d\u092f \u0939\u0948',
    'Better Returns':
      '\u092c\u0947\u0939\u0924\u0930 \u0930\u093f\u091f\u0930\u094d\u0928',
    'EXPLORE BENEFITS': '\u0932\u093e\u092d \u0926\u0947\u0916\u0947\u0902',
    'HOW IT WORKS':
      '\u092f\u0939 \u0915\u0948\u0938\u0947 \u0915\u093e\u092e \u0915\u0930\u0924\u093e \u0939\u0948',
    'About DBBET':
      'DBBET \u0915\u0947 \u092c\u093e\u0930\u0947 \u092e\u0947\u0902',
    'Our History':
      '\u0939\u092e\u093e\u0930\u093e \u0907\u0924\u093f\u0939\u093e\u0938',
    'Values & Mission':
      '\u092e\u0942\u0932\u094d\u092f \u0914\u0930 \u092e\u093f\u0936\u0928',
    'Our Team': '\u0939\u092e\u093e\u0930\u0940 \u091f\u0940\u092e',
    'Choose Your Niche & Start Earning':
      '\u0905\u092a\u0928\u093e \u0928\u093f\u0936 \u091a\u0941\u0928\u0947\u0902 \u0914\u0930 \u0915\u092e\u093e\u0908 \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902',
    'Ready to turn your traffic into revenue?':
      '\u0915\u094d\u092f\u093e \u0906\u092a \u0905\u092a\u0928\u0947 \u091f\u094d\u0930\u0948\u092b\u093f\u0915 \u0915\u094b \u0930\u093e\u091c\u0938\u094d\u0935 \u092e\u0947\u0902 \u092c\u0926\u0932\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u0924\u0948\u092f\u093e\u0930 \u0939\u0948\u0902?',
    'Frequently Asked Questions':
      '\u0905\u0915\u094d\u0938\u0930 \u092a\u0942\u091b\u0947 \u091c\u093e\u0928\u0947 \u0935\u093e\u0932\u0947 \u092a\u094d\u0930\u0936\u094d\u0928',
    'Contact Information':
      '\u0938\u0902\u092a\u0930\u094d\u0915 \u091c\u093e\u0928\u0915\u093e\u0930\u0940',
    'Agent Benefits': '\u090f\u091c\u0947\u0902\u091f \u0932\u093e\u092d',
    'Become a Mob-Cash Agent today':
      '\u0906\u091c \u0939\u0940 Mob-Cash \u090f\u091c\u0947\u0902\u091f \u092c\u0928\u0947\u0902',
    Sports: '\u0916\u0947\u0932',
    Casino: '\u0915\u0948\u0938\u093f\u0928\u094b',
    Esports: '\u0908\u0938\u094d\u092a\u094b\u0930\u094d\u091f\u094d\u0938',
    'Online Games': '\u0911\u0928\u0932\u093e\u0907\u0928 \u0917\u0947\u092e',
    Slots: '\u0938\u094d\u0932\u0949\u091f',
    'Promote Sports':
      '\u0916\u0947\u0932 \u092a\u094d\u0930\u091a\u093e\u0930\u093f\u0924 \u0915\u0930\u0947\u0902',
    'Promote Casino':
      '\u0915\u0948\u0938\u093f\u0928\u094b \u092a\u094d\u0930\u091a\u093e\u0930\u093f\u0924 \u0915\u0930\u0947\u0902',
    'Promote Esports':
      '\u0908\u0938\u094d\u092a\u094b\u0930\u094d\u091f\u094d\u0938 \u092a\u094d\u0930\u091a\u093e\u0930\u093f\u0924 \u0915\u0930\u0947\u0902',
    'Promote Online Games':
      '\u0911\u0928\u0932\u093e\u0907\u0928 \u0917\u0947\u092e \u092a\u094d\u0930\u091a\u093e\u0930\u093f\u0924 \u0915\u0930\u0947\u0902',
    'Promote Slots':
      '\u0938\u094d\u0932\u0949\u091f \u092a\u094d\u0930\u091a\u093e\u0930\u093f\u0924 \u0915\u0930\u0947\u0902',
    Program: '\u092a\u094d\u0930\u094b\u0917\u094d\u0930\u093e\u092e',
    Contact: '\u0938\u0902\u092a\u0930\u094d\u0915',
    English: '\u0939\u093f\u0928\u094d\u0926\u0940',
  },
  ne: {
    'AFFILIATE HUB': '\u090f\u092b\u093f\u0932\u093f\u090f\u091f \u0939\u092c',
    'PARTNER BENEFITS':
      '\u0938\u093e\u091d\u0947\u0926\u093e\u0930 \u0932\u093e\u092d',
    INSTRUCTION: '\u0928\u093f\u0930\u094d\u0926\u0947\u0936\u0928',
    'MOB-CASH AGENT': 'MOB-CASH \u090f\u091c\u0947\u0928\u094d\u091f',
    'Your Traffic Deserves':
      '\u0924\u092a\u093e\u0908\u0902\u0915\u094b \u091f\u094d\u0930\u093e\u092b\u093f\u0915 \u092f\u094b\u0917\u094d\u092f \u091b',
    'Better Returns': '\u0930\u093e\u092e\u094d\u0930\u094b \u0906\u092f',
    'EXPLORE BENEFITS':
      '\u0932\u093e\u092d \u0939\u0947\u0930\u094d\u0928\u0941\u0939\u094b\u0938\u094d',
    'HOW IT WORKS':
      '\u092f\u094b \u0915\u0938\u0930\u0940 \u0915\u093e\u092e \u0917\u0930\u094d\u091b',
    'About DBBET': 'DBBET \u092c\u093e\u0930\u0947',
    'Our History':
      '\u0939\u093e\u092e\u094d\u0930\u094b \u0907\u0924\u093f\u0939\u093e\u0938',
    'Values & Mission':
      '\u092e\u0942\u0932\u094d\u092f \u0930 \u092e\u093f\u0936\u0928',
    'Our Team': '\u0939\u093e\u092e\u094d\u0930\u094b \u091f\u093f\u092e',
    'Choose Your Niche & Start Earning':
      '\u0906\u092b\u094d\u0928\u094b \u0928\u093f\u0938 \u091b\u093e\u0928\u094d\u0928\u0941\u0939\u094b\u0938\u094d \u0930 \u0915\u092e\u093e\u0909\u0928 \u0938\u0941\u0930\u0941 \u0917\u0930\u094d\u0928\u0941\u0939\u094b\u0938\u094d',
    'Ready to turn your traffic into revenue?':
      '\u0924\u092a\u093e\u0908\u0902\u0915\u094b \u091f\u094d\u0930\u093e\u092b\u093f\u0915\u0932\u093e\u0908 \u0906\u092f\u092e\u093e \u092a\u0930\u093f\u0923\u0924 \u0917\u0930\u094d\u0928 \u0924\u092f\u093e\u0930?',
    'Frequently Asked Questions':
      '\u092c\u093e\u0930\u092e\u094d\u092c\u093e\u0930 \u0938\u094b\u0927\u093f\u0928\u0947 \u092a\u094d\u0930\u0936\u094d\u0928',
    'Contact Information':
      '\u0938\u092e\u094d\u092a\u0930\u094d\u0915 \u091c\u093e\u0928\u0915\u093e\u0930\u0940',
    'Agent Benefits': '\u090f\u091c\u0947\u0928\u094d\u091f \u0932\u093e\u092d',
    'Become a Mob-Cash Agent today':
      '\u0906\u091c\u0948 Mob-Cash \u090f\u091c\u0947\u0928\u094d\u091f \u092c\u0928\u094d\u0928\u0941\u0939\u094b\u0938\u094d',
    Sports: '\u0916\u0947\u0932\u0915\u0941\u0926',
    Casino: '\u0915\u094d\u092f\u093e\u0938\u093f\u0928\u094b',
    Esports: '\u0908\u0938\u094d\u092a\u094b\u0930\u094d\u091f\u094d\u0938',
    'Online Games': '\u0905\u0928\u0932\u093e\u0907\u0928 \u0917\u0947\u092e',
    Slots: '\u0938\u094d\u0932\u091f',
    'Promote Sports':
      '\u0916\u0947\u0932\u0915\u0941\u0926 \u092a\u094d\u0930\u0935\u0930\u094d\u0927\u0928 \u0917\u0930\u094d\u0928\u0941\u0939\u094b\u0938\u094d',
    'Promote Casino':
      '\u0915\u094d\u092f\u093e\u0938\u093f\u0928\u094b \u092a\u094d\u0930\u0935\u0930\u094d\u0927\u0928 \u0917\u0930\u094d\u0928\u0941\u0939\u094b\u0938\u094d',
    'Promote Esports':
      '\u0908\u0938\u094d\u092a\u094b\u0930\u094d\u091f\u094d\u0938 \u092a\u094d\u0930\u0935\u0930\u094d\u0927\u0928 \u0917\u0930\u094d\u0928\u0941\u0939\u094b\u0938\u094d',
    'Promote Online Games':
      '\u0905\u0928\u0932\u093e\u0907\u0928 \u0917\u0947\u092e \u092a\u094d\u0930\u0935\u0930\u094d\u0927\u0928 \u0917\u0930\u094d\u0928\u0941\u0939\u094b\u0938\u094d',
    'Promote Slots':
      '\u0938\u094d\u0932\u091f \u092a\u094d\u0930\u0935\u0930\u094d\u0927\u0928 \u0917\u0930\u094d\u0928\u0941\u0939\u094b\u0938\u094d',
    Program: '\u0915\u093e\u0930\u094d\u092f\u0915\u094d\u0930\u092e',
    Contact: '\u0938\u092e\u094d\u092a\u0930\u094d\u0915',
    English: '\u0928\u0947\u092a\u093e\u0932\u0940',
  },
  so: {
    'AFFILIATE HUB': 'XARUNTA SHARIIKAYAASHA',
    'PARTNER BENEFITS': "FAA'IIDOOYINKA SHARIIKA",
    INSTRUCTION: 'TILMAAMAHA',
    'MOB-CASH AGENT': 'WAKIILKA MOB-CASH',
    'Your Traffic Deserves': 'Taraafikaagu Wuu Mudan Yahay',
    'Better Returns': "Faa'iido Wanaagsan",
    'EXPLORE BENEFITS': "ARAG FAA'IIDOOYINKA",
    'HOW IT WORKS': 'SIDA AY U SHAQEYSO',
    'About DBBET': 'Ku Saabsan DBBET',
    'Our History': 'Taariikhdayada',
    'Values & Mission': 'Qiimaha & Hadafka',
    'Our Team': 'Kooxdayada',
    'Choose Your Niche & Start Earning': "Dooro Qaybtaada oo Bilow Faa'iido",
    'Ready to turn your traffic into revenue?':
      'Diyaar ma u tahay inaad taraafikaaga u beddesho dakhli?',
    'Frequently Asked Questions': "Su'aalaha Inta Badan La Weydiiyo",
    'Contact Information': 'Macluumaadka Xiriirka',
    'Agent Benefits': "Faa'iidooyinka Wakiilka",
    'Become a Mob-Cash Agent today': 'Maanta Noqo Wakiil Mob-Cash',
    Sports: 'Ciyaaraha',
    Casino: 'Casino',
    Esports: 'Esports',
    'Online Games': 'Ciyaaraha Onlaynka',
    Slots: 'Slots',
    'Promote Sports': 'Xayeysii Ciyaaraha',
    'Promote Casino': 'Xayeysii Casino',
    'Promote Esports': 'Xayeysii Esports',
    'Promote Online Games': 'Xayeysii Ciyaaraha Onlaynka',
    'Promote Slots': 'Xayeysii Slots',
    Program: 'Barnaamij',
    Contact: 'Xiriir',
    English: 'Soomaali',
  },
  sw: {
    'AFFILIATE HUB': 'KITUO CHA WASHIRIKA',
    'PARTNER BENEFITS': 'FAIDA ZA MSHIRIKA',
    INSTRUCTION: 'MAELEKEZO',
    'MOB-CASH AGENT': 'WAKALA WA MOB-CASH',
    'Your Traffic Deserves': 'Trafiki Yako Inastahili',
    'Better Returns': 'Mapato Bora',
    'EXPLORE BENEFITS': 'ANGALIA FAIDA',
    'HOW IT WORKS': 'JINSI INAVYOFANYA KAZI',
    'About DBBET': 'Kuhusu DBBET',
    'Our History': 'Historia Yetu',
    'Values & Mission': 'Maadili na Dhamira',
    'Our Team': 'Timu Yetu',
    'Choose Your Niche & Start Earning': 'Chagua Eneo Lako na Anza Kupata',
    'Ready to turn your traffic into revenue?':
      'Uko tayari kubadilisha trafiki yako kuwa mapato?',
    'Frequently Asked Questions': 'Maswali Yanayoulizwa Mara kwa Mara',
    'Contact Information': 'Maelezo ya Mawasiliano',
    'Agent Benefits': 'Faida za Wakala',
    'Become a Mob-Cash Agent today': 'Kuwa Wakala wa Mob-Cash leo',
    Sports: 'Michezo',
    Casino: 'Kasino',
    Esports: 'Esports',
    'Online Games': 'Michezo ya Mtandaoni',
    Slots: 'Slots',
    'Promote Sports': 'Tangaza Michezo',
    'Promote Casino': 'Tangaza Kasino',
    'Promote Esports': 'Tangaza Esports',
    'Promote Online Games': 'Tangaza Michezo ya Mtandaoni',
    'Promote Slots': 'Tangaza Slots',
    Program: 'Programu',
    Contact: 'Mawasiliano',
    English: 'Kiswahili',
  },
};
var I18N_MAP = {
  English: 'en',
  '\u0420\u0443\u0441\u0441\u043a\u0438\u0439': 'ru',
  '\u09ac\u09be\u0982\u09b2\u09be': 'bn',
  "O'zbek": 'uz',
  'T\u00fcrk\u00e7e': 'tr',
  'Fran\u00e7ais': 'fr',
  Soomaali: 'so',
  Kiswahili: 'sw',
  'Kiswahili (KE)': 'sw',
  'Fran\u00e7ais (CI)': 'fr',
  'S\u00e9n\u00e9gal': 'fr',
  '\u0641\u0627\u0631\u0633\u06cc': 'fa',
  'Az\u0259rbaycan': 'az',
  '\u0627\u0631\u062f\u0648': 'ur',
  '\u0939\u093f\u0928\u094d\u0926\u0940': 'hi',
  '\u0928\u0947\u092a\u093e\u0932\u0940': 'ne',
  'Espa\u00f1ol (AR)': 'es',
  'Portugu\u00eas': 'pt',
  'Portugu\u00eas (BR)': 'pt',
  '\u0627\u0644\u0639\u0631\u0628\u064a\u0629': 'ar',
  '\u0dc3\u0dd2\u0d82\u0dc4\u0dbd': 'en',
};
var I18N_RTL = { ar: 1, fa: 1, ur: 1 };
var I18N_NODES = null;
function i18nCollect() {
  I18N_NODES = [];
  var en = I18N_T['en'];
  var srcs = {};
  for (var k in en) {
    srcs[en[k]] = true;
  }
  var walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  var node;
  while ((node = walker.nextNode())) {
    var raw = node.nodeValue;
    var txt = (raw || '').trim();
    if (txt && srcs[txt]) {
      I18N_NODES.push({
        tnode: node,
        en: txt,
        pre: (raw.match(/^\s*/) || [''])[0],
        post: (raw.match(/\s*$/) || [''])[0],
      });
    }
  }
}
function applyLang(code) {
  if (!I18N_NODES) i18nCollect();
  var dict = I18N_T[code] || I18N_T['en'];
  var en = I18N_T['en'];
  for (var i = 0; i < I18N_NODES.length; i++) {
    var n = I18N_NODES[i];
    var key = n.en;
    var val = dict[key] || en[key] || key;
    n.tnode.nodeValue = n.pre + val + n.post;
  }
  var html = document.documentElement;
  if (I18N_RTL[code]) {
    html.setAttribute('dir', 'rtl');
  } else {
    html.setAttribute('dir', 'ltr');
  }
  html.setAttribute('lang', code);
  try {
    localStorage.setItem('dbbet_lang', code);
  } catch (e) {}
}
function __setLang_unused(flag, name) {
  var cur = document.querySelector('.lang-current');
  if (cur) {
    var f = cur.querySelector('.flag');
    if (f) f.textContent = flag;
    var ln = cur.querySelector('.lang-name');
    if (ln) ln.textContent = name;
  }
  var menu = document.getElementById('langMenu');
  if (menu) menu.classList.remove('open');
  var code = I18N_MAP[name] || 'en';
  applyLang(code);
}
(function () {
  try {
    var saved = localStorage.getItem('dbbet_lang');
    if (saved && I18N_T[saved]) {
      applyLang(saved);
    }
  } catch (e) {}
})();

// rtl-carousel-fix

// sync2
