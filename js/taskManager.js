class TaskManager {
    constructor(currentId = 0) {  //currentId = 0 esto significa que el contador empieza en cero
        this.tasks = [];  //tengo una lista de tareas que empieza vacia
        this.currentId = currentId; //agrego un contador para saber que numero de identificación darle a cada tarea
    }
    addTask(name, description, dueDate, status) { //metodo, con la info necesaria para construir una tarea
        this.currentId++;  //aumentar en 1, asi cada tarea podra recibir un identificador diferente
        this.tasks.push({  //  .push() mete este objeto dentro de task y task deja de estar vacio y pasa a contener una tarea
            id: this.currentId,
            name: name,
            description: description,
            dueDate: dueDate,
            status: 'PORHACER'
        });

     }
}