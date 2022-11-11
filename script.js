let input = document.getElementById('search');
let searchBtn = document.getElementById('searchBtn');
let section = document.querySelector('section');
let body = document.body;

let photoProfil = document.getElementById('photoProfil');
let name = document.getElementById('name');
let ProfilLink = document.getElementById('link');
let publicRepos = document.getElementById('pRepos');
let getRepos = document.getElementById('getRepos');
let profil;


let div = `
    <section class="sousSection">
        <div class="bordure"><div class="photoProfil"></div></div>
        <div class="infoProfil">
            <h2>Name : <span class="name"></span></h2>
            <h2>Profil link : <span class="link"></span></h2>
            <h2>Public Repos : <span class="pRepos"></span></h2>
            <button class="getRepos">Get Repos</button>
        </div>
    </section>
`;

searchBtn.addEventListener('click', rechercheProfil);
    function rechercheProfil(e) {
        e.preventDefault();
        let saisie = input.value;
        console.log(saisie);
        fetch(`https://api.github.com/users/${saisie}`)
        .then(response => {
            if (response.status != 200) {
                alert('Profil non trouvé !')
            }
            return response.json()
        })
        .then(result => {
            profil = result;
            console.log(result);
            if (result.message != 'Not Found') {
                afficherProfil();
            }
        })
        .catch(error => console.log('error', error));
    }

function afficherProfil() {
    section.innerHTML += `
        <section class="sousSection">
            <div class="bordure"><div class="photoProfil"><img src="${profil.avatar_url}" alt="logoProfil" class="photoProfil"></div></div>
            <div class="infoProfil">
                <h2>Name : ${profil.login}</h2>
                <h2>Github : <a href="${profil.html_url}" target="_blank">Link</a></h2>
                <h2>Public Repos : ${profil.public_repos}</h2>
                <button class="getRepos"><a href="${profil.html_url}?tab=repositories" target="_blank">Get Repos</a></button>
            </div>
        </section>
    `;
}