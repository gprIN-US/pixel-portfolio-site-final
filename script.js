// Image swap on click
const profileImg = document.getElementById('profile-img');
let showingAlt = false;
profileImg.addEventListener('click', () => {
  showingAlt = !showingAlt;
  profileImg.src = showingAlt ? './assets/prem.jpeg' : './assets/pixelcutie.png';
});

// NYC modal
const nycLink = document.getElementById('nyc-link');
const modal = document.getElementById('nyc-modal');
const closeModal = document.getElementById('close-modal');
nycLink.addEventListener('click', (e)=>{ e.preventDefault(); modal.classList.remove('hidden'); modal.setAttribute('aria-hidden','false'); });
closeModal.addEventListener('click', ()=>{ modal.classList.add('hidden'); modal.setAttribute('aria-hidden','true'); });
modal.addEventListener('click', (e)=>{ if(e.target === modal){ modal.classList.add('hidden'); modal.setAttribute('aria-hidden','true'); } });

// Tabs
const btns = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.tab-panel');
btns.forEach(btn => {
  btn.addEventListener('click', () => {
    btns.forEach(b=>b.classList.remove('active'));
    panels.forEach(p=>p.classList.remove('show'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('show');
  });
});


// Fetch GitHub repo descriptions for project cards (no token needed)
async function loadGhDescriptions(){
  const els = document.querySelectorAll('.gh-desc[data-repo]');
  for (const el of els){
    const repo = el.getAttribute('data-repo');
    try{
      const resp = await fetch(`https://api.github.com/repos/${repo}`);
      if(!resp.ok) throw new Error('GitHub API error');
      const data = await resp.json();
      if (data && data.description){
        el.textContent = data.description;
      } else {
        el.textContent = 'See details on GitHub.';
      }
    }catch(e){
      el.textContent = 'See details on GitHub.';
    }
  }
}
document.addEventListener('DOMContentLoaded', loadGhDescriptions);
