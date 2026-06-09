const opgeslagen = JSON.parse(localStorage.getItem('teamPerProject') || '{}');
const teamPerProject = Object.assign({
  'Libéma open': ['Jordan', 'Tim', 'Yara', 'Luke'],
  'ZLM Tour':    ['Niels', 'Thijs', 'Luke'],
}, opgeslagen);

// URL param uitlezen — voor terugkeren naar juist project
const params = new URLSearchParams(window.location.search);
const terugNaar = params.get('project');

function slaanOp() {
  const titel        = document.getElementById('todo-titel').value.trim();
  const beschrijving = document.getElementById('todo-beschrijving').value.trim();
  const project      = document.getElementById('todo-project').value;
  const teamlid      = document.getElementById('todo-teamlid').value;
  const datumRuw     = document.getElementById('todo-datum').value;
  if (!titel || !datumRuw) return;

  const datum = new Date(datumRuw).toLocaleString('nl-NL', {
    weekday: 'short', day: 'numeric', month: 'short',
    hour: '2-digit', minute: '2-digit'
  });

  const taken = JSON.parse(localStorage.getItem('taken') || '[]');
  taken.push({ titel, beschrijving, project, teamlid, datum });
  localStorage.setItem('taken', JSON.stringify(taken));

  navigeerTerug();
}

function navigeerTerug() {
  const vaste = ['Libéma open', 'ZLM Tour'];
  if (!terugNaar) {
    window.location.href = '../index.html';
  } else if (vaste.includes(terugNaar)) {
    // vaste projecten hebben eigen pagina
    const bestand = 'project-' + (terugNaar === 'Libéma open' ? 'libema' : terugNaar.toLowerCase().replace(/[^a-z0-9]/g, '-')) + '.html';
    window.location.href = bestand;
  } else {
    window.location.href = 'project-dynamisch.html?naam=' + encodeURIComponent(terugNaar);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Projecten laden — vaste + opgeslagen
  const opgeslagenProjecten = JSON.parse(localStorage.getItem('projecten') || '[]');
  const alleProjecten = ['Libéma open', 'ZLM Tour', ...opgeslagenProjecten.filter(p => p !== 'Libéma open' && p !== 'ZLM Tour')];

  const select = document.getElementById('todo-project');
  alleProjecten.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p;
    opt.textContent = p;
    select.appendChild(opt);
  });

  // Selecteer het project automatisch als het meegegeven is via URL
  if (terugNaar) {
    select.value = terugNaar;
    updateTeamleden();
  }
});

function updateTeamleden() {
  const project  = document.getElementById('todo-project').value;
  const select   = document.getElementById('todo-teamlid');
  const leden    = teamPerProject[project] || [];

  select.innerHTML = '<option value="">Wijs toe aan teamlid...</option>';

  if (leden.length === 0 || !project) {
    select.disabled = true;
    select.style.opacity = '0.4';
    select.style.cursor  = 'not-allowed';
    return;
  }

  leden.forEach(l => {
    const opt = document.createElement('option');
    opt.value       = l;
    opt.textContent = l;
    select.appendChild(opt);
  });

  select.disabled      = false;
  select.style.opacity = '1';
  select.style.cursor  = 'pointer';
}