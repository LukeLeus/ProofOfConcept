# ContentKit — Prototype Mapstructuur

## 📁 Mappenoverzicht

```
contentkit/
│
├── index.html                      ← Home / Dashboard
│
├── css/
│   └── style.css                   ← Alle gedeelde stijlen + kleurvariabelen
│
├── js/
│   └── nav.js                      ← Gedeelde navigatielogica (sidebar rendering)
│
├── images/
│   └── (voeg hier je afbeeldingen toe)
│
└── pages/
    ├── project.html                ← Project detail pagina
    ├── inspiratie.html             ← Inspiratie tool (Reels / Post / Bereik / Formats)
    ├── trendwatcher.html           ← Trendwatcher (Upcoming / #Trend / Hot movers)
    ├── hooks.html                  ← Hooks bibliotheek (⚠️ ontwerp nog niet af)
    ├── analyse.html                ← Analyse (project selectie + Results/Interactions/Audience)
    ├── kennis-hub.html             ← Kennis Hub (lijst + detail)
    │
    └── test-doelgroep/
        ├── index.html              ← Keuze: Persona testen / Vergelijken
        ├── stap-1-vergelijk.html   ← Vergelijk: kies doelgroep
        ├── stap-1-segment.html     ← Stap 1 van 3: Doelgroep segment
        ├── stap-2-upload.html      ← Stap 2 van 3: Upload content
        └── stap-3-resultaten.html  ← Stap 3 van 3: Resultaten
```

---

## 🎨 Kleurenschema (in `css/style.css`)

| Variabele         | Waarde    | Gebruik                          |
|-------------------|-----------|----------------------------------|
| `--accent`        | `#FF5533` | Oranje — knoppen, titels         |
| `--blue`          | `#4A90D9` | Blauw — "Projecten" label        |
| `--green`         | `#4CAF50` | Groen — fase 2 badge             |
| `--bg`            | `#F2EFE9` | Achtergrond (warm beige)         |
| `--sidebar-bg`    | `#EDEAE3` | Sidebar achtergrond              |
| `--card-bg`       | `#E8E4DC` | Kaarten                          |
| `--dark-card`     | `#2D2D2D` | Donkere kaarten (test doelgroep) |
| `--text-primary`  | `#1A1A1A` | Hoofdtekst                       |
| `--text-secondary`| `#666666` | Subtekst                         |

---

## 🖼️ Afbeeldingen toevoegen

1. Zet afbeeldingen in de `images/` map.
2. Vervang in elk scherm de `<span class="thumb-label">` placeholder door:
   ```html
   <img src="../images/jouw-foto.jpg" alt="Beschrijving">
   ```
   Of vanuit de `test-doelgroep/` submap:
   ```html
   <img src="../../images/jouw-foto.jpg" alt="Beschrijving">
   ```

---

## ✏️ HTML aanpassen per scherm

Elk scherm heeft duidelijke commentaarblokken (`╔═══╗`) die aangeven waar je iets kunt toevoegen of aanpassen. Zoek in het bestand naar `╔` om snel de aanpasspunten te vinden.

---

## 🔗 Navigatie

De sidebar wordt automatisch gegenereerd door `js/nav.js` via de `renderSidebar()` functie. Het actieve item wordt bepaald door het `data-page=""` attribuut op de `<body>` tag.

Openen in browser: open `index.html` direct in Chrome/Firefox (geen server nodig).
