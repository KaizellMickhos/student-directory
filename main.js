// Factory function (Design Pattern)
function createStudent(name, image, bio, socials, tag, initials) {
  return { name, image, bio, socials, tag, initials };
}

// Sample data (students will add their own)
const students = [
  createStudent("Amara Mensah", "https://via.placeholder.com/200", "Full-stack developer passionate about scalable systems and open-source tooling. Loves Python, Rust, and midnight debugging sessions.", {
    github: "#",
    linkedin: "#",
    facebook: "#"
  }, "Engineering", "AM"),
  createStudent("Luka Rossi", "https://via.placeholder.com/200", "UI/UX designer blending Italian aesthetics with user-centered thinking. Prototypes in Figma, dreams in gradients.", {
    github: "#",
    linkedin: "#",
    twitter: "#"
  }, "Design", "LR"),
  createStudent("Priya Krishnan", "https://via.placeholder.com/200", "Computational biology researcher decoding genomic data with ML models. Aspiring to bridge biotech and AI for personalized medicine.", {
    github: "#",
    linkedin: "#"
  }, "Science", "PK"),
  createStudent("James Okafor", "https://via.placeholder.com/200", "Entrepreneurship & fintech enthusiast. Founded two student startups, mentors peers in pitch competitions, and obsesses over market dynamics.", {
    linkedin: "#",
    twitter: "#",
    facebook: "#"
  }, "Business", "JO"),
  createStudent("Sofia Chen", "https://via.placeholder.com/200", "Embedded systems & IoT architect. Building smart sensor networks for environmental monitoring. Speaks C++, Python, and espresso fluently.", {
    github: "#",
    linkedin: "#"
  }, "Engineering", "SC"),
  createStudent("Naomi Dubois", "https://via.placeholder.com/200", "Motion designer & creative technologist. Blurs the line between art and interface. Graduates films, animations, and the occasional generative masterpiece.", {
    github: "#",
    twitter: "#",
    linkedin: "#"
  }, "Design", "ND"),
  createStudent("Rafael Alves", "https://via.placeholder.com/200", "Physics & data science double major. Simulates black holes on weekdays, competes in hackathons on weekends. Night owl by necessity.", {
    github: "#",
    linkedin: "#"
  }, "Science", "RA"),
  createStudent("Hana Nakamura", "https://via.placeholder.com/200", "Marketing & behavioral economics student. Crafting campaigns that resonate and researching what makes people click, subscribe, and stay.", {
    linkedin: "#",
    twitter: "#",
    facebook: "#"
  }, "Business", "HN"),
  createStudent("Kaizell MIckhos Gersaniva", "https://via.placeholder.com/200", "IT Professional with a passion for cybersecurity and ethical hacking. Always staying ahead of the latest threats and solutions.", {
    github: "https://github.com/KaizellMickhos",
    linkedin: "#",
    twitter: "#"
  }, "Ethics", "KG")
];

// Generate social icons
function renderSocials(socials) {
  return `
    ${socials.github ? `<a class="social-btn" href="${socials.github}" title="GitHub"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/></svg></a>` : ""}
    ${socials.linkedin ? `<a class="social-btn" href="${socials.linkedin}" title="LinkedIn"><svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a>` : ""}
    ${socials.facebook ? `<a class="social-btn" href="${socials.facebook}" title="Facebook"><svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>` : ""}
    ${socials.twitter ? `<a class="social-btn" href="${socials.twitter}" title="Twitter/X"><svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>` : ""}
  `;
}

// Student Card Component
function StudentCard(student) {
  const profileUrl = `students/${student.name.toLowerCase().replace(/\s+/g, '-')}.html`;
  return `
    <div class="card" data-tags="${student.tag}">
      <div class="thumb-placeholder">${student.initials}</div>
      <div class="card-body">
        <p class="card-tag">${student.tag}</p>
        <h2 class="card-name">${student.name}</h2>
        <p class="card-desc">${student.bio}</p>
        <div class="social-row">
          ${renderSocials(student.socials)}
        </div>
        <button class="view-btn" onclick="window.location.href='${profileUrl}'">View Profile →</button>
      </div>
    </div>
  `;
}

// Global variables for filtering
let activeFilter = 'all';

// Set active filter
function setFilter(val, btn) {
  activeFilter = val;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filterCards();
}

// Filter and search cards
function filterCards() {
  const q = document.getElementById('search').value.toLowerCase().trim();
  const cards = document.querySelectorAll('.card');
  let visible = 0;

  cards.forEach(card => {
    const name = card.querySelector('.card-name').textContent.toLowerCase();
    const desc = card.querySelector('.card-desc').textContent.toLowerCase();
    const tag = card.querySelector('.card-tag').textContent.toLowerCase();
    const tags = card.dataset.tags;

    const matchesSearch = !q || name.includes(q) || desc.includes(q) || tag.includes(q);
    const matchesFilter = activeFilter === 'all' || tags === activeFilter;

    if (matchesSearch && matchesFilter) {
      card.classList.remove('hidden');
      visible++;
    } else {
      card.classList.add('hidden');
    }
  });

  const meta = document.getElementById('meta');
  if (visible === 0) {
    meta.textContent = 'No students found';
  } else {
    meta.textContent = `Showing ${visible} student${visible !== 1 ? 's' : ''}`;
  }

  const grid = document.getElementById('grid');
  const empty = grid.querySelector('.empty-state');
  if (visible === 0 && !empty) {
    const div = document.createElement('div');
    div.className = 'empty-state';
    div.innerHTML = '<div class="icon">◎</div><p>No students match your search.<br>Try a different name or filter.</p>';
    grid.appendChild(div);
  } else if (visible > 0 && empty) {
    empty.remove();
  }
}

// Render students
function renderStudents() {
  document.getElementById("grid").innerHTML = students.map(StudentCard).join("");
  filterCards(); // Apply initial filtering
}

// Search event listener
document.getElementById("search").addEventListener("input", filterCards);

// Initial render
renderStudents();