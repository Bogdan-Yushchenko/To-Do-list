


let tasks = [];

tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];

let editingId = null;
const modal = document.querySelector('.modal')
const post = document.querySelector('.Create');
const cancel = document.querySelector('.Cancel');
let searchQuery = '';

let create = document.querySelector('.right-block')
create.addEventListener('click',()=>{
    modal.classList.remove('hidden')

})

function exit_m(){
    modal.classList.add('hidden')
}



post.onclick = function create(){


let title = document.querySelector('.input_main').value.trim()

let description = document.querySelector('.text_modal').value.trim()


if (title ==="") return
if (editingId !== null) {
    const t = tasks.find(x => x.id === editingId);
    if (t) {
      t.title = title;
      t.subtitle = description;
    }
    editingId = null;
    exit_m();
    render();
    return;
  }

const newTask = {
    id:Date.now(),
    title:title,
    subtitle:description,
    status:false,
    timeStart:'',
    timeEnd:''
}

tasks.push(newTask);
render()
console.log(tasks)


localStorage.setItem('tasks', JSON.stringify(tasks));

}

const listcard = document.querySelector('.conteiner_logic');

new Sortable(listcard, {
  animation: 150,
  onEnd: () => {
    tasks = [...listcard.querySelectorAll('.divcard')]
      .map(c => Number(c.dataset.id))
      .map(id => tasks.find(t => t.id === id));

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});


function render() {
  if (!listcard) return;
  listcard.innerHTML = "";

  for (const task of tasks) {
    const card = document.createElement('div');
    card.classList.add('divcard');
    card.dataset.id = task.id;

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = task.status;
    check.classList.add('checker');

    const textContainer = document.createElement('div');
    textContainer.classList.add('task-text-container');

    const titEl = document.createElement('div');
    titEl.classList.add('task-title');
    titEl.textContent = task.title;

    const descEl = document.createElement('div');
    descEl.classList.add('task-desc');
    descEl.textContent = task.subtitle;



    const icon_edit = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.116 4.54126C14.4685 4.18888 14.6665 3.71091 14.6666 3.2125C14.6666 2.71409 14.4687 2.23607 14.1163 1.8836C13.7639 1.53112 13.286 1.33307 12.7876 1.33301C12.2892 1.33295 11.8111 1.53088 11.4587 1.88326L2.56133 10.7826C2.40654 10.9369 2.29207 11.127 2.228 11.3359L1.34733 14.2373C1.3301 14.2949 1.3288 14.3562 1.34356 14.4145C1.35833 14.4728 1.38861 14.5261 1.43119 14.5686C1.47378 14.6111 1.52708 14.6413 1.58544 14.656C1.64379 14.6707 1.70504 14.6693 1.76266 14.6519L4.66466 13.7719C4.87344 13.7084 5.06345 13.5947 5.218 13.4406L14.116 4.54126Z" stroke="#737373" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 3.33325L12.6667 5.99992" stroke="#737373" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const Edit_div = document.createElement('div');
Edit_div.classList.add('EditDiv');
Edit_div.innerHTML = icon_edit;



Edit_div.addEventListener('click',(e)=>{
    e.stopPropagation();
    
    editingId = task.id;

  document.querySelector('.input_main').value = task.title;
  document.querySelector('.text_modal').value = task.subtitle;

  modal.classList.remove('hidden');
}) 




const icon_bucket = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 4H14" stroke="#737373" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12.6666 4V13.3333C12.6666 14 12 14.6667 11.3333 14.6667H4.66665C3.99998 14.6667 3.33331 14 3.33331 13.3333V4" stroke="#737373" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5.33331 3.99992V2.66659C5.33331 1.99992 5.99998 1.33325 6.66665 1.33325H9.33331C9.99998 1.33325 10.6666 1.99992 10.6666 2.66659V3.99992" stroke="#737373" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6.66669 7.33325V11.3333" stroke="#737373" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.33331 7.33325V11.3333" stroke="#737373" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const bucket_div = document.createElement('div');
bucket_div.classList.add('bucketDiv');
bucket_div.innerHTML = icon_bucket;



bucket_div.addEventListener('click', (e) => {
  e.stopPropagation();
  const id = Number(card.dataset.id);
  tasks = tasks.filter(t => t.id !== id);

  localStorage.setItem('tasks', JSON.stringify(tasks));

  render();

  const doneCount = tasks.filter(t => t.status).length;
  document.querySelector('.Count-Done').textContent = doneCount;
  document.querySelector('.Count-All').textContent = tasks.length;
  document.querySelector('.Count-Active').textContent = tasks.length - doneCount;
  
});


  


    textContainer.appendChild(titEl);
    textContainer.appendChild(descEl);

    card.appendChild(check);
    card.appendChild(textContainer);

    listcard.appendChild(card);
    bucket_div.appendChild(Edit_div)
    card.appendChild(bucket_div)
    
    check.addEventListener('change', () => {
      task.status = check.checked;
      console.log(check.checked)

        const Active = document.querySelector(".Count-Active")
        const Done = document.querySelector('.Count-Done')
        
        let value = Number(Active.textContent)
        let current = Number(Done.textContent)
        

      if(check.checked===true){
        card.classList.add('done')
        current = current + 1
        Done.textContent = current
        

        
        value = value - 1
        Active.textContent = value

        
      } else {
    card.classList.remove('done');
        current = current - 1
        Done.textContent = current
        
       value = value + 1
        Active.textContent = value
  }


localStorage.setItem('tasks', JSON.stringify(tasks));
});


const All = document.querySelector('.Count-All');
All.textContent = tasks.length;


console.log(tasks.length);

  const doneCount = tasks.filter(task => task.status).length;
  document.querySelector('.Count-Active').textContent = tasks.length - doneCount;

  }


  


}

render();






const doneCount = tasks.filter(t => t.status).length;
document.querySelector('.Count-Done').textContent = doneCount;
document.querySelector('.Count-All').textContent = tasks.length;
document.querySelector('.Count-Active').textContent = tasks.length - doneCount;


 
 console.log('listcard:', listcard);
console.log('tasks:', tasks);


const ALLButton = document.querySelector('.NameButton-All');

ALLButton.onclick = () => {
  const cards = document.querySelectorAll('.divcard');

  cards.forEach(card => {
    card.classList.remove('hidden');
  });
};







render();