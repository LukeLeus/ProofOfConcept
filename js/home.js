document.addEventListener('DOMContentLoaded', () => {

    // ---- TAKEN laden ----
    const lijst = document.querySelector('.todo-lijst');
    if (lijst) {
        const taken = JSON.parse(localStorage.getItem('taken') || '[]');
        const toevoegKnopTodo = lijst.querySelector('div[style]');

        taken.forEach(t => {
            const item = document.createElement('div');
            item.className = 'todo-item';
            item.innerHTML = `
        <div class="todo-check" onclick="vinkAf(this)"></div>
        <div class="todo-content">
          <div class="todo-title">${t.titel}</div>
          ${t.beschrijving ? `<div style="font-size:12px; color:var(--text-muted); margin-top:2px;">${t.beschrijving}</div>` : ''}
          <div class="todo-project">${t.project}${t.teamlid ? ' · ' + t.teamlid : ''}</div>
        </div>
        <span class="todo-date">${t.datum}</span>
        <button onclick="verwijderTaak(this, '${t.titel}')" style="background:none; border:none; cursor:pointer; color:var(--text-muted); font-size:16px; margin-left:12px;">✕</button>
      `;
            lijst.insertBefore(item, toevoegKnopTodo);
        });

        // Herstel afgevinkte taken
        const afgevinkt = JSON.parse(localStorage.getItem('afgevinkt') || '[]');
        document.querySelectorAll('.todo-item').forEach(item => {
            const titel = item.querySelector('.todo-title').textContent;
            if (afgevinkt.includes(titel)) {
                item.classList.add('klaar');
                item.querySelector('.todo-check').classList.add('klaar');
            }
        });
    }

    // ---- NIEUWE PROJECTEN laden ----
    const vaste = ['Libéma open', 'ZLM Tour'];
    const details = JSON.parse(localStorage.getItem('projectDetails') || '{}');
    const projectSection = document.querySelector('section');
    const toevoegKnopProject = document.querySelector('.add-btn-wrap');

    if (projectSection && toevoegKnopProject) {
        Object.values(details).forEach(p => {
            if (vaste.includes(p.naam)) return;

            const kaart = document.createElement('a');
            kaart.href = 'pages/project-dynamisch.html?naam=' + encodeURIComponent(p.naam);
            kaart.className = 'project-card';
            kaart.innerHTML = `
  <div>
    <div class="project-name">${p.naam}</div>
    <div class="project-status">Status: ${p.status}</div>
  </div>
  <div style="display:flex; align-items:center; gap:16px;">
    <span class="fase-badge fase-${p.fase}">Huidige fase: ${p.fase}</span>
    <button onclick="verwijderProject(event, '${p.naam}')" style="background:none; border:none; cursor:pointer; color:var(--text-muted); font-size:16px;">✕</button>
  </div>
`;
            projectSection.appendChild(kaart);
        });
    }

});

function vinkAf(el) {
    el.classList.toggle('klaar');
    const item = el.closest('.todo-item');
    item.classList.toggle('klaar');

    const titel = item.querySelector('.todo-title').textContent;
    const afgevinkt = JSON.parse(localStorage.getItem('afgevinkt') || '[]');

    if (item.classList.contains('klaar')) {
        if (!afgevinkt.includes(titel)) afgevinkt.push(titel);
    } else {
        afgevinkt.splice(afgevinkt.indexOf(titel), 1);
    }
    localStorage.setItem('afgevinkt', JSON.stringify(afgevinkt));
}

function verwijderTaak(el, titel) {
    el.closest('.todo-item').remove();

    const taken = JSON.parse(localStorage.getItem('taken') || '[]');
    localStorage.setItem('taken', JSON.stringify(taken.filter(t => t.titel !== titel)));

    const afgevinkt = JSON.parse(localStorage.getItem('afgevinkt') || '[]');
    localStorage.setItem('afgevinkt', JSON.stringify(afgevinkt.filter(t => t !== titel)));
}

function verwijderProject(event, naam) {
    event.preventDefault();
    event.stopPropagation();

    if (!confirm(`Weet je zeker dat je project "${naam}" wil verwijderen?`)) return;

    // Verwijder uit localStorage
    const projecten = JSON.parse(localStorage.getItem('projecten') || '[]');
    localStorage.setItem('projecten', JSON.stringify(projecten.filter(p => p !== naam)));

    const details = JSON.parse(localStorage.getItem('projectDetails') || '{}');
    delete details[naam];
    localStorage.setItem('projectDetails', JSON.stringify(details));

    const teamPerProject = JSON.parse(localStorage.getItem('teamPerProject') || '{}');
    delete teamPerProject[naam];
    localStorage.setItem('teamPerProject', JSON.stringify(teamPerProject));

    // Verwijder kaart van het scherm
    event.target.closest('.project-card').remove();

    // Verwijder ook uit sidebar
    document.querySelectorAll('.sidebar-item').forEach(item => {
        if (item.textContent.trim() === naam) {
            item.remove();
        }
    });
}