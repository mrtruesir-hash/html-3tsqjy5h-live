/* === language switcher (embedded) === */
(function () {
  // ===== DBBET PARTNERS - LANGUAGE SWITCHER =====
  const translations = {
    en: {
      'hero-title':
        'Your Traffic Deserves <span class="highlight">Better Returns.</span><br>Partner with DBBET Today.',
      'hero-btn1': 'Become a Partner',
      'hero-btn2': 'See Commission Models',
      'nav-cta': 'Join Now',
      f1: 'Wide range of locations & traffic sources',
      f2: 'Fully Licensed',
      f3: 'High Conversion Rate',
      f4: 'Speedy Approval & Support',
      f5: 'All Tools You Need',
      f6: 'Transparent Statistics',
      'models-title': 'Partnership <span class="highlight">Models</span>',
      'models-sub':
        'Choose the commission structure that fits your traffic best',
      'm1-title': 'Revenue Share',
      'm2-title': 'CPA (Cost Per Acquisition)',
      'm3-title': 'Hybrid Deal',
      'm4-title': 'Sub-Partner Commission',
      'm1-btn': 'Get Started',
      'm2-btn': 'Get Started',
      'm3-btn': 'Get Started',
      'm4-btn': 'Get Started',
      'stats-title': 'Real Partner <span class="highlight">Earnings</span>',
      'stats-sub': 'See what top partners are earning on DBBET',
      st1: 'Total Earnings',
      st2: 'Last 30 Days',
      st3: 'Current Month',
      st4: 'Yesterday',
      rs1: 'Registrations (1 Month)',
      rs2: 'New Depositors',
      rs3: 'Conversion Rate',
      'how-title': 'How It <span class="highlight">Works</span>',
      'how-sub': 'Start earning in 4 simple steps',
      'step1-title': 'Sign Up',
      'step2-title': 'Get Your Links',
      'step3-title': 'Promote',
      'step4-title': 'Earn & Withdraw',
      'step1-desc':
        'Register for free. Quick approval with dedicated support in your language.',
      'step2-desc':
        'Get your unique affiliate links, banners, and marketing materials.',
      'step3-desc':
        'Share via SEO, social media, Telegram. Cricket odds, live betting — we convert.',
      'step4-desc':
        'Withdraw via crypto, bank, or local payments. Fast, reliable payouts.',
      'mc-badge': '🤝 Exclusive Opportunity',
      'mc-title': 'Become a <span class="highlight">Mob-Cash Agent</span>',
      'mc-desc':
        'Join our Mob-Cash agent network and earn money by helping players deposit and withdraw in your local area.',
      'mcb1-t': 'Process Local Payments',
      'mcb2-t': 'Work from Your Phone',
      'mcb3-t': 'Earn Per Transaction',
      'mcb4-t': 'Available in Your Country',
      'mcb1-d':
        'Help players deposit and withdraw using local payment methods.',
      'mcb2-d': 'Everything from your mobile. No office, no fixed hours.',
      'mcb3-d': 'Commission on every transaction you process.',
      'mcb4-d':
        'Bangladesh, Egypt, Kenya, Tanzania, Ivory Coast, Senegal, Somalia, Pakistan, Sri Lanka.',
      'mc-btn': 'Become a Mob-Cash Agent',
      'join-title': 'Ready to Start <span class="highlight">Earning?</span>',
      'join-sub':
        'Join thousands already earning with DBBET. Sign up takes less than 2 minutes.',
      jp1: '✅ Free to join',
      jp2: '✅ Instant approval',
      jp3: '✅ 13 languages',
      jp4: '✅ Crypto payments',
      jp5: '✅ 24/7 support',
      'join-btn': 'Join DBBET Partners Now',
    },
    ru: {
      'hero-title':
        'Превратите трафик в <span class="highlight">Реальные Деньги</span><br>с DBBET Partners',
      'hero-btn1': 'Стать партнёром',
      'hero-btn2': 'Модели комиссий',
      'nav-cta': 'Войти',
      f1: 'Широкий выбор гео и трафика',
      f2: 'Лицензировано',
      f3: 'Высокая конверсия',
      f4: 'Быстрое одобрение',
      f5: 'Все инструменты',
      f6: 'Прозрачная статистика',
      'models-title': 'Модели <span class="highlight">Партнёрства</span>',
      'models-sub': 'Выберите подходящую модель',
      'm1-title': 'Revenue Share до 55%',
      'm2-title': 'CPA до $110',
      'm3-title': 'Гибридная сделка',
      'm4-title': 'Суб-партнёры до 10%',
      'm1-btn': 'Начать',
      'm2-btn': 'Начать',
      'm3-btn': 'Начать',
      'm4-btn': 'Начать',
      'stats-title': 'Реальные <span class="highlight">Заработки</span>',
      st1: 'Всего',
      st2: '30 дней',
      st3: 'Месяц',
      st4: 'Вчера',
      rs1: 'Регистраций (мес)',
      rs2: 'Новых вкладчиков',
      rs3: 'Конверсия',
      'how-title': 'Как это <span class="highlight">Работает</span>',
      'how-sub': 'Начните за 4 шага',
      'step1-title': 'Регистрация',
      'step2-title': 'Ссылки',
      'step3-title': 'Продвижение',
      'step4-title': 'Заработок',
      'step1-desc':
        'Зарегистрируйтесь бесплатно. Быстрое одобрение на вашем языке.',
      'step2-desc': 'Получите партнёрские ссылки, баннеры, материалы.',
      'step3-desc': 'SEO, соцсети, Telegram, крикет, ставки.',
      'step4-desc': 'Выводите через крипту или банк. Надёжные выплаты.',
      'mc-badge': '🤝 Эксклюзив',
      'mc-title': 'Стань <span class="highlight">Mob-Cash агентом</span>',
      'mc-desc':
        'Зарабатывайте, помогая игрокам с депозитами и выводами в вашем регионе.',
      'mcb1-t': 'Местные платежи',
      'mcb2-t': 'Работа с телефона',
      'mcb3-t': 'Комиссия за транзакцию',
      'mcb4-t': 'Доступно в вашей стране',
      'mcb1-d': 'Помогайте с пополнениями и выводами.',
      'mcb2-d': 'Всё с мобильного телефона.',
      'mcb3-d': 'Комиссия с каждой транзакции.',
      'mcb4-d': 'Бангладеш, Египет, Кения, Пакистан и др.',
      'mc-btn': 'Стать Mob-Cash агентом',
      'join-title': 'Готовы <span class="highlight">зарабатывать?</span>',
      'join-sub': 'Регистрация менее 2 минут.',
      jp1: '✅ Бесплатно',
      jp2: '✅ Быстро',
      jp3: '✅ 13 языков',
      jp4: '✅ Крипта',
      jp5: '✅ 24/7',
      'join-btn': 'Присоединиться к DBBET',
    },
    bn: {
      'hero-title':
        'ট্রাফিককে <span class="highlight">আসল অর্থে</span> রূপান্তর করুন<br>DBBET Partners সাথে',
      'hero-btn1': 'পার্টনার হন',
      'hero-btn2': 'কমিশন দেখুন',
      'nav-cta': 'যোগ দিন',
      'mc-title': '<span class="highlight">Mob-Cash এজেন্ট</span> হন',
      'mc-btn': 'Mob-Cash এজেন্ট হন',
      'join-title': '<span class="highlight">আয়</span> শুরু করতে প্রস্তুত?',
      'join-btn': 'এখনই যোগ দিন',
    },
    ar: {
      'hero-title':
        'حوّل زياراتك إلى <span class="highlight">أموال حقيقية</span><br>مع DBBET Partners',
      'hero-btn1': 'كن شريكاً',
      'hero-btn2': 'العمولات',
      'nav-cta': 'انضم',
      'mc-title': 'كن <span class="highlight">وكيل Mob-Cash</span>',
      'mc-btn': 'كن وكيل Mob-Cash',
      'join-title': 'هل أنت مستعد <span class="highlight">للكسب؟</span>',
      'join-btn': 'انضم الآن',
    },
    uz: {
      'hero-title':
        'Trafikni <span class="highlight">Haqiqiy Pulga</span> aylantiring<br>DBBET Partners bilan',
      'hero-btn1': "Hamkor bo'ling",
      'hero-btn2': 'Modellar',
      'nav-cta': "Qo'shiling",
      'mc-title': "<span class='highlight'>Mob-Cash Agent</span> bo'ling",
      'mc-btn': "Agent bo'lish",
      'join-title':
        "<span class='highlight'>Pul ishlashni</span> boshlaysizmi?",
      'join-btn': "DBBET ga qo'shiling",
    },
    tr: {
      'hero-title':
        'Trafiği <span class="highlight">Gerçek Paraya</span> Çevirin<br>DBBET Partners ile',
      'hero-btn1': 'Ortak Ol',
      'hero-btn2': 'Komisyonlar',
      'nav-cta': 'Katıl',
      'mc-title': '<span class="highlight">Mob-Cash Ajanı</span> Ol',
      'mc-btn': 'Mob-Cash Ajanı Ol',
      'join-title': '<span class="highlight">Kazanmaya</span> Başla!',
      'join-btn': "DBBET'e Katıl",
    },
    sw: {
      'hero-title':
        'Geuza Trafiki Kuwa <span class="highlight">Pesa Halisi</span><br>na DBBET Partners',
      'hero-btn1': 'Kuwa Mshirika',
      'hero-btn2': 'Angalia Kamisheni',
      'nav-cta': 'Jiunge',
      'mc-title': 'Kuwa <span class="highlight">Wakala wa Mob-Cash</span>',
      'mc-btn': 'Kuwa Wakala',
      'join-title': 'Uko tayari <span class="highlight">Kupata Pesa?</span>',
      'join-btn': 'Jiunge Sasa',
    },
    so: {
      'hero-title':
        'U Beddel Xawaare <span class="highlight">Lacag Dhabta ah</span><br>DBBET Partners',
      'hero-btn1': 'Noqo Xulaf',
      'hero-btn2': 'Kamishin',
      'nav-cta': 'Ku biir',
      'mc-title': 'Noqo <span class="highlight">Wakiilka Mob-Cash</span>',
      'mc-btn': 'Noqo Wakiil',
      'join-title': '<span class="highlight">Bilow Lacag Helista</span>!',
      'join-btn': 'Ku biir Hadda',
    },
    ke: {
      'hero-title':
        'Geuza Trafiki Kuwa <span class="highlight">Pesa Halisi</span><br>Kenya na DBBET',
      'hero-btn1': 'Kuwa Mshirika',
      'hero-btn2': 'Angalia',
      'nav-cta': 'Jiunge',
      'mc-title': 'Kuwa <span class="highlight">Wakala wa Mob-Cash</span>',
      'mc-btn': 'Wakala wa Mob-Cash',
      'join-title': '<span class="highlight">Pata Pesa</span> Leo!',
      'join-btn': 'Jiunge Sasa',
    },
    fr: {
      'hero-title':
        'Transformez votre Trafic en <span class="highlight">Argent Réel</span><br>avec DBBET Partners',
      'hero-btn1': 'Devenir Partenaire',
      'hero-btn2': 'Voir les Modèles',
      'nav-cta': 'Rejoindre',
      'mc-title': 'Devenez <span class="highlight">Agent Mob-Cash</span>',
      'mc-btn': 'Devenir Agent',
      'join-title': "Prêt à <span class='highlight'>Gagner?</span>",
      'join-btn': 'Rejoindre DBBET',
    },
    sn: {
      'hero-title':
        'Transformez votre Trafic en <span class="highlight">Argent Réel</span><br>au Sénégal',
      'hero-btn1': 'Devenir Partenaire',
      'hero-btn2': 'Commissions',
      'nav-cta': 'Rejoindre',
      'mc-title': 'Devenez <span class="highlight">Agent Mob-Cash</span>',
      'mc-btn': 'Agent Sénégal',
      'join-title': "Prêt à <span class='highlight'>Gagner?</span>",
      'join-btn': 'Rejoindre Maintenant',
    },
    ur: {
      'hero-title':
        'ٹریفک کو <span class="highlight">حقیقی پیسوں</span> میں بدلیں<br>DBBET Partners کے ساتھ',
      'hero-btn1': 'پارٹنر بنیں',
      'hero-btn2': 'کمیشن دیکھیں',
      'nav-cta': 'شامل ہوں',
      'mc-title': '<span class="highlight">Mob-Cash ایجنٹ</span> بنیں',
      'mc-btn': 'ایجنٹ بنیں',
      'join-title': '<span class="highlight">کمانا</span> شروع کریں!',
      'join-btn': 'ابھی شامل ہوں',
    },
    si: {
      'hero-title':
        'ගමනාගමනය <span class="highlight">සැබෑ මුදලට</span> හරවන්න<br>DBBET Partners සමඟ',
      'hero-btn1': 'හවුල්කරු වන්න',
      'hero-btn2': 'කොමිෂන්',
      'nav-cta': 'එක් වන්න',
      'mc-title': '<span class="highlight">Mob-Cash නියෝජිත</span>යෙක් වන්න',
      'mc-btn': 'නියෝජිතයෙක් වන්න',
      'join-title': '<span class="highlight">ඉපයීම</span> ආරම්භ කරන්න!',
      'join-btn': 'දැන් එක් වන්න',
    },
  };

  function switchLang(lang) {
    const base = translations['en'];
    const t = translations[lang] || base;
    const merged = Object.assign({}, base, t);
    Object.keys(merged).forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = merged[id];
    });
    document.documentElement.dir =
      lang === 'ar' || lang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      window.history.replaceState({}, '', url);
    } catch (e) {}
  }

  // Expose globally so inline onchange="switchLang(this.value)" can find it
  window.switchLang = switchLang;

  // Robust binding: also attach a change listener directly (in case inline handler scope fails)
  function bindLangSwitcher() {
    var sel = document.getElementById('langSelect');
    if (sel && !sel.dataset.bound) {
      sel.dataset.bound = '1';
      sel.addEventListener('change', function () {
        switchLang(this.value);
      });
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindLangSwitcher);
  } else {
    bindLangSwitcher();
  }

  document.addEventListener('DOMContentLoaded', () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const lang = params.get('lang') || 'en';
      const sel = document.getElementById('langSelect');
      if (sel) sel.value = lang;
      switchLang(lang);
    } catch (e) {}

    // Scroll animations
    const animEls = document.querySelectorAll(
      '.model-card, .stat-card, .step-card'
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => {
              e.target.style.opacity = '1';
              e.target.style.transform = 'translateY(0)';
            }, i * 100);
          }
        });
      },
      { threshold: 0.1 }
    );
    animEls.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.5s ease';
      observer.observe(el);
    });

    // Navbar shadow on scroll
    window.addEventListener('scroll', () => {
      const nav = document.getElementById('navbar');
      if (nav)
        nav.style.boxShadow =
          window.scrollY > 60 ? '0 4px 30px rgba(0,0,0,0.6)' : 'none';
    });
  });
})();

import './polyfills';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((ref) => {
    // Ensure Angular destroys itself on hot reloads.
    if (window['ngRef']) {
      window['ngRef'].destroy();
    }
    window['ngRef'] = ref;

    // Otherise, log the boot error
  })
  .catch((err) => console.error(err));
