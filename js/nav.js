// Standaard projecten
if (!localStorage.getItem('projecten')) {
  localStorage.setItem('projecten', JSON.stringify(['Libéma open', 'ZLM Tour']));
}

document.addEventListener('DOMContentLoaded', () => {

  // ---- Hamburger menu injecteren ----
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Menu openen');
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    document.body.appendChild(hamburger);

    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
    });
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });

    sidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
      });
    });
  }

  // Actief markeren
  const currentPage = document.body.getAttribute('data-page') || '';
  document.querySelectorAll('.sidebar-item').forEach(item => {
    if (item.getAttribute('data-target') === currentPage) {
      item.classList.add('active');
    }
  });

  // Nieuwe projecten toevoegen aan sidebar
  const vaste = ['Libéma open', 'ZLM Tour'];
  const projecten = JSON.parse(localStorage.getItem('projecten') || '[]');
  const nieuw = projecten.filter(p => !vaste.includes(p));

  if (nieuw.length === 0) return;

  const alleSidebarItems = document.querySelectorAll('.sidebar-item');
  let ankerItem = null;
  alleSidebarItems.forEach(item => {
    const tekst = item.textContent.trim();
    if (vaste.includes(tekst)) ankerItem = item;
  });

  if (!ankerItem) return;

  const isSubSubmap = window.location.pathname.includes('/test-doelgroep/') ||
    window.location.pathname.includes('/Analyse/');
  const isSubmap = window.location.pathname.includes('/pages/');
  const prefix = isSubSubmap ? '../../pages/' : isSubmap ? '' : 'pages/';

  nieuw.forEach(naam => {
    const a = document.createElement('a');
    a.href = prefix + 'project-dynamisch.html?naam=' + encodeURIComponent(naam);
    a.className = 'sidebar-item';
    a.textContent = naam;
    ankerItem.parentNode.insertBefore(a, ankerItem.nextSibling);
    ankerItem = a;
  });

});