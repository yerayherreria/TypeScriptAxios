import {User} from "./interfaces/user";
import {Post} from "./interfaces/posts";
import axios, { AxiosResponse } from 'axios';

let div = document.getElementById("root");
const name = document.getElementById('name') as HTMLInputElement;
const email = document.getElementById('email') as HTMLInputElement;
const age = document.getElementById('age') as HTMLInputElement;
let title = document.getElementById("title") as HTMLInputElement;
let content = document.getElementById("content") as HTMLInputElement;
let author = document.getElementById("author") as HTMLInputElement;

function createUsers(users: User[]): void {
    let list = document.createElement("ul");
    users.forEach(user => {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(user.name));
        list.appendChild(li);
    });
    div?.appendChild(list);
}

function createPost(posts: Post[]): void {
    let list = document.createElement("ul");
    posts.forEach(post => {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(post.content));
        list.appendChild(li);
    });
    div?.appendChild(list);
}

axios.get<User[]>('http://localhost:3000/users')
  .then((response: AxiosResponse<User[]>) => {
    createUsers(response.data);
  })
  .catch((error) => {
    console.error('Error al obtener datos:', error);
  });

axios.get<Post[]>('http://localhost:3000/posts')
  .then((response: AxiosResponse<Post[]>) => {
    createPost(response.data);
  })
  .catch((error) => {
    console.error('Error al obtener datos:', error);
  });

function addUserApi(newUser: Omit<User,"id">) {
    axios.post<User>('http://localhost:3000/users', newUser)
        .catch((error) => {
        console.error('Error al crear usuario:', error);
        });
}

document.getElementById('userForm')?.addEventListener('submit', (e) => {
    if(name.value && email.value && age.value){
        const user:Omit<User,"id"> = {name:name.value,email:email.value,age:parseInt(age.value),isAdmin:false};
        addUserApi(user);
    }
    
});

const getUserPost = () => {
    let array:User[] & Post[] = [];
    
    axios.get<User[]>('http://localhost:3000/users')
        .then((responseU: AxiosResponse<User[]>) => {
            responseU.data.forEach(element => {
                array.push(element);
            });
        })
    axios.get<Post[]>('http://localhost:3000/posts')
        .then((responseP: AxiosResponse<Post[]>) => {
            responseP.data.forEach(element => {
                array.push(element)
            });
        })

    return array;
}

const cargarUser = () => {
    axios.get<User[]>('http://localhost:3000/users')
        .then((responseU: AxiosResponse<User[]>) => {
            responseU.data.forEach(element => {
                let option = new Option(element.name,element.id.toString());
                author.appendChild(option);
            });
        })
}
cargarUser();


function addPostApi(newPost: Omit<Post,"id">) {
    axios.post<User>('http://localhost:3000/posts', newPost)
        .catch((error) => {
        console.error('Error al crear usuario:', error);
        });
}

document.getElementById('postForm')?.addEventListener('submit', (e) => {
    if(title.value && content.value && author.value){
        const post:Omit<Post,"id"> = {title:title.value,content:content.value,authorId:parseInt(author.value)};
        addPostApi(post);
    }
    
});