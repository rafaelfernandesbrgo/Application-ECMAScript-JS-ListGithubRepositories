
import api from './api'


class App {
    constructor() {
        this.repositories = [];
        this.formElement = document.getElementById('repo-form')
        this.inputElement = document.getElementById('repository')
        this.ulElement = document.getElementById('repo-list')
        this.registerHandlers();
    }

    registerHandlers() {
        this.formElement.onsubmit = event => this.addRepository(event)

    }

    setLoading(Loading = true) {
        if (Loading === true) {
            let loadingElement = document.createElement('span');
            loadingElement.appendChild(document.createTextNode('Carregando'))
            loadingElement.setAttribute('id', 'Loading')
            this.formElement.appendChild(loadingElement)
        } else {
            document.getElementById('Loading').remove();
        }

    }

    async addRepository(event) {
        event.preventDefault() // protects standard form operation, preventing it from loading every submit

        const repoInput = this.inputElement.value

        if (repoInput.length === 0) {
            return //stop flow
        }


        this.setLoading()
        try {
            const response = await api.get(`/repos/${repoInput}`)
            const { name, description, html_url, owner: { avatar_url } } = response.data
            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url,
            })
            this.inputElement.value = ""
            this.render();
        } catch (error) {
            alert('repository does not exist');

        }

        this.setLoading(false)
    }


    render() {
        this.ulElement.innerHTML = '';

        this.repositories.forEach(repo => {

            let imgElement = document.createElement('img')
            imgElement.src = repo.avatar_url

            let strongElement = document.createElement('strong')
            strongElement.appendChild(document.createTextNode(repo.name));

            let pElement = document.createElement('p')
            pElement.appendChild(document.createTextNode(repo.description));


            let aElement = document.createElement('a')
            aElement.target = '_black'
            aElement.href = repo.html_url
            aElement.appendChild(document.createTextNode('Acessar'));

            let liElement = document.createElement('li');


            liElement.appendChild(imgElement);
            liElement.appendChild(strongElement);
            liElement.appendChild(pElement);
            liElement.appendChild(aElement);
            this.ulElement.appendChild(liElement)
        })

    }
}


const a = new App()