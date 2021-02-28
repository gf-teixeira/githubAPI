let reposArray = [];

/*********************/
let ul = document.createElement("ul");
document.querySelector(".repoBox").appendChild(ul);
document.querySelector(".")
function gitRepos(){
    let user = document.querySelector("input").value;
    if(!user){
        return;
    }
    loading();

    axios.get('https://api.github.com/users/' + user + '/repos')
    .then(function(response){
        
        //Zerando
        reposArray = [];
        ul.parentNode.removeChild(ul);
        /*******/
        userInfo(user);

        ul = document.createElement("ul");
        reposArray = response.data.slice(0, response.data.length);

        for(repo of reposArray){
            //console.log(repo.name);
            let li = document.createElement("li");
            let p = document.createElement("p");
            let a = document.createElement("a");
            let textP = document.createTextNode(repo.description);
            let textLi = document.createTextNode(repo.name);

            //ISO8601
            const date = repo.created_at;
            console.log(repo.created_at)
            const formated_date = new Date(date) 
            //console.log(`${formated_date.getDate()}/${formated_date.getMonth() +1 }/${formated_date.getFullYear()}`)
            let textDate = document.createTextNode(`${formated_date.getDate()}/${formated_date.getMonth() +1 }/${formated_date.getFullYear()}`);
            let dataP = document.createElement("p");
            dataP.appendChild(textDate);
            
            //retorna dd/m/yyyy

            if(repo.description){
              p.appendChild(textP);
            }
            a.appendChild(textLi);
            a.setAttribute("href", repo.html_url);
            a.setAttribute("target", "_blank");
            li.appendChild(a);
            li.appendChild(p);
            li.appendChild(dataP);
            ul.appendChild(li);
        }
        document.querySelector(".repoBox").appendChild(ul);
        document.querySelector("input").value = '';
    })
    .catch(function(error){
        console.warn('error');
    })
}


function userInfo(user){
    axios.get('https://api.github.com/users/'+user)
    .then(function(response){
        if(document.querySelector("img")){ //se já existe uma img significa que não é a primeira busca, logo é necessário limpar os elementos já criados.

            document.querySelector('img').parentNode.removeChild(document.querySelector('img'));
            document.querySelector('.name').parentNode.removeChild(document.querySelector(".name"));
            document.querySelector('.company').parentNode.removeChild(document.querySelector(".company"));
            document.querySelector('.location').parentNode.removeChild(document.querySelector(".location"));
            document.querySelector('.bio').parentNode.removeChild(document.querySelector(".bio"));
        }

        let img = document.createElement("img");
        img.setAttribute("src", response.data.avatar_url);

        let name = document.createElement("h2");
        let txt  = document.createTextNode(response.data.name)
        name.appendChild(txt);
        name.setAttribute("class","name");

        let location = document.createElement("p");
        let txtL = document.createTextNode(response.data.location);
        location.appendChild(txtL);
        location.setAttribute("class", "location");

        document.querySelector(".textBox").appendChild(name);

        let company = document.createElement("p");
        if(response.data.company){ //se existir uma 'company'

            let txtP = document.createTextNode(response.data.company);
            company.appendChild(txtP);
            

        }
        company.setAttribute("class", "company");
        document.querySelector(".textBox").appendChild(company);

        let bio = document.createElement("p");
        if(response.data.bio){
            let txtB = document.createTextNode(response.data.bio);
            bio.appendChild(txtB);
        }
        bio.setAttribute("class", "bio");
        document.querySelector(".textBox").appendChild(bio);

        document.querySelector(".textBox").appendChild(location);
        document.querySelector(".imgBox").appendChild(img);

        // location, bio

    })
    .catch(function(error){
        console.warn('error');
    })

}

function loading(){
    let loadingLi = document.createElement("li");
    let textLi = document.createTextNode("Carregando...");
    loadingLi.appendChild(textLi);
    ul.appendChild(loadingLi);
}
