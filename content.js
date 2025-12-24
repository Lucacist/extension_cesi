console.log("🚀 EXTENSION CESI : Script chargé sur " + window.location.href);

chrome.storage.local.get(['cesi_moodle_id', 'cesi_ent_email', 'cesi_pass'], (data) => {
    // Si pas d'email, on ne peut rien faire pour l'ENT
    if (!data.cesi_ent_email) return;

    const url = window.location.href;

    // --- SCÉNARIO 1 : MOODLE ---
    if (url.includes("moodle.cesi.fr")) {
        console.log("🎓 Moodle détecté");
        const intervalMoodle = setInterval(() => {
            const user = document.querySelector('input[name="username"]');
            const pass = document.querySelector('input[name="password"]');
            const btn = document.getElementById('loginbtn');

            if (user && pass && btn) {
                clearInterval(intervalMoodle);
                user.value = data.cesi_moodle_id;
                pass.value = data.cesi_pass;
                btn.click();
            }
        }, 500);
    }

    // --- SCÉNARIO 2 : ENT ÉTAPE 1 (Le Portail Jaune - Wayf) ---
    if (url.includes("wayf.cesi.fr")) {
        console.log("🟡 ENT Étape 1 détectée (Correction HTML)");

        const intervalWayf = setInterval(() => {
            // CIBLAGE PRÉCIS D'APRÈS TA CAPTURE
            const loginInput = document.getElementById('login');
            const submitLink = document.getElementById('submit'); // C'est un lien <a>

            if (loginInput && submitLink) {
                clearInterval(intervalWayf);
                console.log("✅ Champs trouvés ! Remplissage...");

                loginInput.focus();
                loginInput.value = data.cesi_ent_email;
                
                // On simule une écriture pour être sûr que la page le prenne en compte
                loginInput.dispatchEvent(new Event('input', { bubbles: true }));

                // Petite pause avant de cliquer
                setTimeout(() => {
                    submitLink.click();
                }, 300);
            }
        }, 500);
    }

    // --- SCÉNARIO 3 : ENT ÉTAPE 2 (Mur Bleu - ADFS) ---
    if (url.includes("sts.viacesi.fr") || url.includes("adfs/ls")) {
        console.log("🔵 ENT Étape 2 détectée");

        const intervalAdfs = setInterval(() => {
            const passInput = document.getElementById('passwordInput');
            const submitBtn = document.getElementById('submitButton');

            if (passInput && submitBtn) {
                clearInterval(intervalAdfs);
                
                // Par sécurité, on remet l'email si le champ est vide
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