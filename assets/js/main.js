(function () {
  'use strict';

  // 푸터 연도
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 스크롤 시 헤더 배경
  var header = document.getElementById('header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 모바일 메뉴 토글
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  function closeNav() {
    header.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', '메뉴 열기');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 760) closeNav();
    });
  }

  // 스크롤 등장 효과
  var revealEls = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(function (el) { observer.observe(el); });
})();