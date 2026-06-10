let teamleden = [];

function slaanOp() {
    const naam = document.getElementById('project-naam').value.trim();
    const beschrijving = document.getElementById('project-beschrijving').value.trim();
    const fase = document.getElementById('project-fase').value;
    if (!naam) return;

    const projecten = JSON.parse(localStorage.getItem('projecten') || '[]');
    if (!projecten.includes(naam)) {
        projecten.push(naam);
        localStorage.setItem('projecten', JSON.stringify(projecten));
    }

    const details = JSON.parse(localStorage.getItem('projectDetails') || '{}');
    details[naam] = { naam, beschrijving, fase, status: 'Actief', teamleden };
    localStorage.setItem('projectDetails', JSON.stringify(details));

    // Sla teamleden ook op per project zodat todo-toevoegen ze kan gebruiken
    const teamPerProject = JSON.parse(localStorage.getItem('teamPerProject') || '{}');
    teamPerProject[naam] = teamleden;
    localStorage.setItem('teamPerProject', JSON.stringify(teamPerProject));

    window.location.href = '../pages/project-dynamisch.html?naam=' + encodeURIComponent(naam);
}

// Toon teamleden sectie zodra projectnaam is ingevuld
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('project-naam').addEventListener('input', function () {
        const sectie = document.getElementById('teamleden-sectie');
        if (this.value.trim()) {
            sectie.style.display = 'flex';
            sectie.style.flexDirection = 'column';
        } else {
            sectie.style.display = 'none';
        }
    });
});

function voegTeamlidToe() {
    const input = document.getElementById('nieuw-teamlid');
    const naam = input.value.trim();
    if (!naam || teamleden.includes(naam)) return;

    teamleden.push(naam);
    input.value = '';
    renderTeamleden();
}

function renderTeamleden() {
    const lijst = document.getElementById('teamleden-lijst');
    lijst.innerHTML = teamleden.map(l => `
    <div style="display:flex; align-items:center; justify-content:space-between; padding:10px 14px; background:var(--card-bg); border-radius:8px;">
      <span style="font-size:14px;">${l}</span>
      <button onclick="verwijderTeamlid('${l}')" style="background:none; border:none; cursor:pointer; color:var(--text-muted); font-size:14px;">✕</button>
    </div>
  `).join('');
}

function verwijderTeamlid(naam) {
    teamleden = teamleden.filter(l => l !== naam);
    renderTeamleden();
}