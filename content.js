console.log("🚀 EXTENSION CESI : Script chargé sur " + window.location.href);

chrome.storage.local.get(['cesi_ent_email', 'cesi_pass'], (data) => {
    const url = window.location.href;

    // --- SCÉNARIO 1 : MOODLE (Clic automatique sur le bouton "ENT") ---
    if (url.includes("moodle.cesi.fr")) {
        console.log("🎓 Moodle détecté - Recherche du bouton ENT...");
        
        const intervalMoodle = setInterval(() => {
            // On récupère tous les liens et boutons de la page
            const buttons = document.querySelectorAll('a, button, div.btn');
            let entButton = null;

            for (let btn of buttons) {
                // On cherche celui qui contient exactement le texte "ENT"
                // .innerText récupère le texte visible
                if (btn.innerText && btn.innerText.trim() === "ENT") {
                    entButton = btn;
                    break;
                }
            }

            if (entButton) {
                clearInterval(intervalMoodle);
                console.log("✅ Bouton ENT trouvé ! Clic immédiat.");
                entButton.click();
            }
        }, 500);
    }

    // --- SCÉNARIO 2 : ENT ÉTAPE 1 (Portail Jaune - Wayf) ---
    // (On ne touche pas, c'est celui qui marche)
    if (url.includes("wayf.cesi.fr") && data.cesi_ent_email) {
        console.log("🟡 ENT Étape 1 détectée");

        const intervalWayf = setInterval(() => {
            const loginInput = document.getElementById('login');
            const submitLink = document.getElementById('submit');

            if (loginInput && submitLink) {
                clearInterval(intervalWayf);
                
                loginInput.focus();
                loginInput.value = data.cesi_ent_email;
                loginInput.dispatchEvent(new Event('input', { bubbles: true }));

                setTimeout(() => {
                    submitLink.click();
                }, 300);
            }
        }, 500);
    }

    // --- SCÉNARIO 3 : ENT ÉTAPE 2 (Mur Bleu - ADFS) ---
    // (On ne touche pas non plus)
    if ((url.includes("sts.viacesi.fr") || url.includes("adfs/ls")) && data.cesi_pass) {
        console.log("🔵 ENT Étape 2 détectée");

        const intervalAdfs = setInterval(() => {
            const passInput = document.getElementById('passwordInput');
            const submitBtn = document.getElementById('submitButton');

            if (passInput && submitBtn) {
                clearInterval(intervalAdfs);
                
                const emailInput = document.getElementById('userNameInput');
                if (emailInput && !emailInput.value) {
                    emailInput.value = data.cesi_ent_email;
                }

                passInput.value = data.cesi_pass;
                submitBtn.click();
            }
        }, 500);
    }
});