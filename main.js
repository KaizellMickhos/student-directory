// Factory function (Design Pattern)
function createStudent(name, image, bio, socials, tag, initials) {
  return { name, image, bio, socials, tag, initials };
}

// Sample data (students will add their own)
const students = [
  createStudent("Mark", "https://via.placeholder.com/200", "Web Developer", {
    github: "#",
    facebook: "#",
    linkedin: "#"
  }, "Engineering", "MK"),
  createStudent("Ana", "https://via.placeholder.com/200", "UI/UX Designer", {
    github: "#",
    facebook: "#",
    linkedin: "#"
  }, "Design", "AN"),
  createStudent("John Doe", "https://via.placeholder.com/200", "Computer Science student passionate about web development and AI.", {
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    facebook: "https://facebook.com/johndoe"
  }, "Business", "JD"),
  createStudent("Mark Jun Gersaniva", "https://via.placeholder.com/200", "Aspiring software engineer with a passion for open-source projects and community building.", {
    github: "https://github.com/nujkram",
    linkedin: "https://linkedin.com/in/nujkram",
  }, "Engineering", "MJ"),
    createStudent("Egiemark Dumolong", "https://via.placeholder.com/200", "Aspiring software engineer with a passion for open-source projects and community building.", {
    github: "https://github.com/DUMOLONG-EGIEMARK-",
    facebook: "https://facebook.com/egiemark.dumolong",
  }, "Programmer", "EM")
];

// Generate social icons
function renderSocials(socials) {
  return `
    ${socials.github ? `<a class="social-btn" href="${socials.github}" title="GitHub">🐙</a>` : ""}
    ${socials.linkedin ? `<a class="social-btn" href="${socials.linkedin}" title="LinkedIn">💼</a>` : ""}
    ${socials.facebook ? `<a class="social-btn" href="${socials.facebook}" title="Facebook">📘</a>` : ""}
    ${socials.twitter ? `<a class="social-btn" href="${socials.twitter}" title="Twitter/X">🐦</a>` : ""}
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

let activeFilter = 'all';

function setFilter(val, btn) {
  activeFilter = val;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filterCards();
}

function filterCards() {
  const q = document.getElementById('search').value.toLowerCase().trim();
  const cards = document.querySelectorAll('.card');
  let visible = 0;

  cards.forEach(card => {
    const name = card.querySelector('.card-name').textContent.toLowerCase();
    const desc = card.querySelector('.card-desc').textContent.toLowerCase();
    const tag = card.querySelector('.card-tag').textContent.toLowerCase();
    const tags = card.dataset.tags.toLowerCase();

    const matchesSearch = !q || name.includes(q) || desc.includes(q) || tag.includes(q);
    const matchesFilter = activeFilter === 'all' || tags === activeFilter.toLowerCase();

    if (matchesSearch && matchesFilter) {
      card.classList.remove('hidden');
      visible++;
    } else {
      card.classList.add('hidden');
    }
  });

  const meta = document.getElementById('meta');
  meta.textContent = visible === 0 ? 'No students found' : `Showing ${visible} student${visible !== 1 ? 's' : ''}`;

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

function renderStudents() {
  const grid = document.getElementById('grid');
  grid.innerHTML = students.map(StudentCard).join('');
  filterCards();
}

function viewProfile(name) {
  const student = students.find(s => s.name === name);
  if (!student) {
    return alert('Student profile not found.');
  }
  window.location.href = `students/${student.name.toLowerCase().replace(/\s+/g, '-')}.html`;
}

// Search input listener
const searchInput = document.getElementById('search');
if (searchInput) {
  searchInput.addEventListener('input', filterCards);
}

renderStudents();