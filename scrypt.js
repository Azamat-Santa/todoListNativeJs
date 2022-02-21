const doc = document

const form = doc.querySelector('.form')
const formInput = doc.querySelector('.form__input')
const formBtn = doc.querySelector('.form__btn')
const taskOutput = doc.querySelector('.task-output')
const editBtn = doc.querySelector('.todo__edit-btn')

let tasks = []

localStorage.getItem('tasks') ? tasks = JSON.parse(localStorage.getItem('tasks')) : ''

const addTask = (e) =>{
    e.preventDefault()
    let adedTodo = {
        id: new Date().valueOf(),
        title:formInput.value,
        check:false,
    }
    formInput.value !== '' ? tasks.push(adedTodo) :  alert('Добавьте задачу')
    formInput.value = ''
    localStorage.setItem('tasks', JSON.stringify(tasks))
    render()
}

const deleteTodo = (id) =>{
  tasks = tasks.filter(todo => todo.id !== id)
  localStorage.setItem('tasks', JSON.stringify(tasks))
  render()
}

const checkedTodo = (index) =>{
    if(tasks[index].check === false){
        tasks[index].check = true   
    }else if (tasks[index].check === true){
        tasks[index].check = false
    }
    console.log(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks))
    render()
}

const editTodo = (index)=>{
   newTitle = prompt('Введите задачу')
   newTitle !== '' ? tasks[index].title = newTitle: tasks[index].title
   localStorage.setItem('tasks', JSON.stringify(tasks))
   render()
}

const render = () =>{
    taskOutput.innerHTML = ''
    tasks.map((cart, index)=>{
        let block = doc.createElement('div')
        block.className='todo__cart'
        block.innerHTML = `
                <input type="checkbox" onclick="checkedTodo(${index})" ${cart.check ? 'checked' : ''}/>
                <input 
                type="text" 
                value=${cart.title}
                class=${cart.check?'task-output__input_checked task-output__input':'task-output__input'}
                readonly
                />   
                <button onclick = "editTodo(${index})" class='button todo__edit'> Edit </button>
                <button onclick="deleteTodo(${cart.id})" class='button todo__delete-btn'> Delete </button>
                
                `
        taskOutput.append(block)
    })  
}

form.addEventListener('submit',addTask)
render()



