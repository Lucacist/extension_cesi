document.getElementById('saveBtn').addEventListener('click', () => {
  const moodleId = document.getElementById('moodle_id').value;
  const entEmail = document.getElementById('ent_email').value;
  const pass = document.getElementById('password').value;

  chrome.storage.local.set({ 
    cesi_moodle_id: moodleId, 
    cesi_ent_email: entEmail, 
    cesi_pass: pass 
  }, () => {
    const status = document.getElementById('status');
    status.textContent = 'Sauvegardé !';
    setTimeout(() => status.textContent = '', 2000);
  });
});

// Remplir les champs au chargement
chrome.storage.local.get(['cesi_moodle_id', 'cesi_ent_email', 'cesi_pass'], (data) => {
  if (data.cesi_moodle_id) document.getElementById('moodle_id').value = data.cesi_moodle_id;
  if (data.cesi_ent_email) document.getElementById('ent_email').value = data.cesi_ent_email;
  if (data.cesi_pass) document.getElementById('password').value = data.cesi_pass;
});