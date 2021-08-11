// Eliminar de Local Storage
//localStorage.clear();
/*

let imagenes = document.images;
let imagenesArr = Array.from(imagenes); //obtiene un arreglo de lo anterior
console.log(imagenesArr);

////////////////////////////////////////////////////

let elemento;
elemento = document.querySelector('#header').className; //busca la clase de la etiqueta
console.log(elemento);

//cambia color de fondo a los enlaces que estan dentro de footer
const enlaces = document.querySelectorAll('#footer a:nth-child(odd)');
enlaces.forEach(obj =>{
   obj.style.backgroundColor = 'red';
});


///////////////////////////////////////
//TRAVERSING+/////////////////////////
const navegacion = document.querySelector('#principal');
console.log(navegacion.children[3].textContent='MODIFICADO'); //trae la etiqueta seleccionada del hijo.

const cards = document.querySelectorAll('.card');
console.log(cards[1].children[1].firstElementChild);  //navega en la seleccion y busca en los hijos cualquier dato

const driving = document.querySelectorAll('.enlace');
console.log(driving[0].parentElement.parentElement.parentElement
    .parentElement.parentElement.children[0].children[0].children[0]
    .children[0].children[0].textContent='Recorriendo padres e hijos');  //recorre del padre al hijo y viceversa


//selecciona al hermano
console.log(driving[4].previousElementSibling);


////////////////////////////////////////////////////
///CREANDO ELEMENTOS///////////////////////////////
//////////////////////////////////////////////////

const nuevoA = document.createElement('a');
nuevoA.className = 'enlace';
nuevoA.id = 'nuevo-id';
nuevoA.setAttribute('href', '#');
//nuevoA.textContent='Nuevo enlace a';  estos dos resultan tener el mismo resultado.
nuevoA.appendChild(document.createTextNode('nuevo enlace con appenchild'));
console.log(nuevoA);

document.querySelector('#principal').appendChild(nuevoA);

//////////////////////////////////////
////Nuevo elemento para crear y reemplazar en el respectivo encabezado

const nuevoEncabezado = document.createElement('h1');
nuevoEncabezado.id = 'encabezado';
nuevoEncabezado.className = 'encabezado';
nuevoEncabezado.classList.add('my-3','py-4');
nuevoEncabezado.textContent = 'Cursos de Christian';
//Elemento que sera reemplazado
const anteriorEncabezado = document.querySelector('#encabezado');
const elPadre = document.querySelector('#lista-cursos');

//Realizar reemplazo
elPadre.replaceChild(nuevoEncabezado,anteriorEncabezado);
console.log(elPadre);



///////////////////////////////////////
///////AGREGANDO Y QUITANDO CLASES Y OTROS ATRIBUTOS
const seleccionEnlaces = document.querySelectorAll('.enlace');
const seleccionNavegacion = document.querySelector('#principal');

//eliminar elemento
seleccionEnlaces[0].remove();
seleccionNavegacion.removeChild(seleccionEnlaces[1]);



//////////////////////////////////////////////
////////////EVENT LISTENERS
//dblclick,mouseenter,mouseleave,mouseover,mouseout,mousedown,mouseup,mousemove
document.querySelector('#submit-buscador').addEventListener('mousemove', (e)=>{
   e.preventDefault();
   console.log(e.type);
});

//////////////////////
//EVENTOS PARA LOS INPUTS
//keydown,keyup,keypress,focus,blur,cut,copy,paste,input,change
// por ejemplo cuando escribe en la barra de busqueda, se selecciona y luego se copia, este texto se muestra en #encabezado
const busqueda = document.querySelector('#buscador');
busqueda.addEventListener('copy',(e) => {
   document.querySelector('#encabezado').innerText = busqueda.value;
   console.log(busqueda.value);
});


/////////////////////////
//EVENT BUBLING
// cuando se da clic en los query seleccionados, muestra mensaje en consola
const minimun = document.querySelector('.card');
const medium = document.querySelector('.info-card');
const large = document.querySelector('.agregar-carrito');

minimun.addEventListener('click', (e) => {
   console.log('minimun');
   e.stopImmediatePropagation();
});

medium.addEventListener('click', (e) => {
   console.log('medium');
   e.stopImmediatePropagation();
});


large.addEventListener('click',(e)=>{
   console.log('large');
   e.stopImmediatePropagation();
});


/////////////////////////////
//////DELEGATION
//trae todo el cuerpo, si se cliquea en la clase que se necesita, muestra en consola.
document.body.addEventListener('click',(e)=>{
   if (e.target.classList.contains('borrar-curso')){
      document.querySelector('.borrar-curso').parentElement.parentElement.remove();
   }
});


/////////////////////////
///AGREGAR AL LOCAL STORAGE
localStorage.setItem('nombre','christian');
sessionStorage.setItem('nombre','christianAlexis');
*/


///Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');


//Listeners
cargarEventListeners();


function cargarEventListeners() {

    ////////////////////////////////////////////////////
    //agregar curso a carrito
    //////////////////////////////////////////////////////
    cursos.addEventListener('click', e => {
        e.preventDefault();
        console.log(e.target);
        if (e.target.classList.contains('agregar-carrito')) {

            //se guarda el card que contiene la info del curso
            const curso = e.target.parentElement.parentElement;

            const infoCurso = {
                imagen: curso.querySelector('img').src,
                titulo: curso.querySelector('h4').textContent,
                precio: curso.querySelector('.precio span').textContent,
                id: curso.querySelector('a').getAttribute('data-id')
            };

            //muestra carrito en la interfaz grafica
            insertarCarritoUI(infoCurso);

            //guardar en localStorage
            guardarCursoLocalStorage(infoCurso);
        }
    });



    ////////////////////////////////////////////////
    //eliminar curso del carrito
    ////////////////////////////////////////////////
    carrito.addEventListener('click', e => {
        e.preventDefault();

        if (e.target.classList.contains('borrar-curso')) {
            const id = e.target.parentElement.parentElement.querySelector('a')
                .getAttribute('data-id');
            console.log(id);
            eliminarCursoLocalStorage(id);
            e.target.parentElement.parentElement.remove();
        }
    });



    ///////////////////////////////////////
    //vaciar el carrito
    //////////////////////////////////////
    vaciarCarritoBtn.addEventListener('click', e => {
        e.preventDefault();
        //listaCursos.innerHTML = '';

        while (listaCursos.firstChild) {
            listaCursos.removeChild(listaCursos.firstChild);
        }
        vaciarCarritoLocalStorage();
    });


    //////////////////////////////////////////////
    /////cargar cursos de inicio ya agregados en el carrito
    //////////////////////////////////////////////
    document.addEventListener('DOMContentLoaded', e => {
        let listaCursos = obtenerCursoLocalStorage();
        listaCursos.forEach(obj => {
            insertarCarritoUI(obj);
        });
    });
}





//////////////////////////////////////////////////////////
////Colocar curso en el carrito UI
//////////////////////////////////////////////////////////
function insertarCarritoUI(infoCurso) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
        <img src="${infoCurso.imagen}" width="100">
    </td>
    <td>
        ${infoCurso.titulo}
    </td>
    <td>
        ${infoCurso.precio}
    </td>
    <td><a href="#" class="borrar-curso" data-id="${infoCurso.id}"> X</a></td>
    `;

    //se agrega a la lista de carrito
    listaCursos.appendChild(row);
}






///////////////////////////////////////////
/////////////OPERACIONES LOCAL STORAGE/////
///////////////////////////////////////////


//Guardar en localstorage
function guardarCursoLocalStorage(infoCurso) {
    let listaCursos = obtenerCursoLocalStorage();
    listaCursos.push(infoCurso);
    localStorage.setItem('carrito', JSON.stringify(listaCursos));
}




//Obtener lista de localStorage
function obtenerCursoLocalStorage() {
    if (localStorage.getItem('carrito') === null) {
        return [];
    }
    return JSON.parse(localStorage.getItem('carrito'));
}



//Eliminar de localStorage
function eliminarCursoLocalStorage(id) {
    let listaCursos = obtenerCursoLocalStorage();

    // cualquier lista dentro de otra lista la extrae y aplana.
    const result = listaCursos.flat(id);
    console.log(result)

    //filtra la lista
    const result2 = listaCursos.filter(obj => obj.id > 1);
    console.log(result2);

    //crea un array de los siguientes datos
    const arr = Array.from("abcd"); // convierte en lista
    const enc = arr.findIndex(value => value === 'c'); //encuentra posicion
    const ele = arr.find(obj => obj === 'c'); // encuentra elemento
    const ultimo = arr.lastIndexOf('d'); //ultima posicion que coincida
    arr.unshift('w'); //inserta elemento en la primera posicion
    arr.shift(); //quita el primer elemento de la lista
    arr.pop(); //quita el ultimo elemento de la lista
    arr.push('car'); //agrega un elemento en la ultima posicion.
    //arr.fill('car'); // llena todas las posiciones con el dato
    console.log(arr.join('...')) //une los elementos a string y usa un separador.
    console.log(arr.reverse()); // cambia el orden de los elemntos
    console.log(arr.includes('car')); //revisa si el arreglo tiene ese elemento
    console.log(arr);
    console.log(ultimo);
    console.log(ele);
    console.log(enc);
    console.log(arr);


    const _1 = [1,2];
    const _2 = [3,4];
    const final = _1.concat(_2); //concatena dos arreglos
    final.splice(3,1); //elimina desde la posicion indicada, la cantidad de veces que se diga en count
    console.log(final);
    const final2 = final.slice(0,1); //extrae una seccion del arreglo.
    console.log(final2);

    //se usa el map para realizar cambios en cada elemento de la lista
    const finalsqr = final.map(squareNumber);
    function squareNumber(value,index,array){
        return value*value;
    }
    console.log(finalsqr);


    // realizar operaciones dentro de cada elemento de la lista.
    finalsqr.forEach(callbackFunction);
    function callbackFunction(value, index, array) {
        console.log(value);
    }



    //ordenamiento de datos.
    const numbers = [1,33,4,29,10000];
    numbers.sort(compareNumbers); //ordena los numeros de la lista
    console.log(numbers);

    function compareNumbers(a,b){
        return a-b;
    }

    const names = ['alvaro','luis','carlos','samanta'];
    names.sort((a,b) => {
        if (a>b) return 1;
        if (a<b) return -1;
        return 0;
    })
    console.log(names);

    // usa una funcion para saber si hay algun elemento del array que sea igual a 'd'
    // cuando se usa every() valida que todos cumplan la condicion
    const som = arr.some(isEven);
    function isEven(value){
        return value === 'd';
    }
    console.log(som);


    listaCursos.forEach((obj, index) => {
        if (obj.id === id) {
            listaCursos.splice(index, 1);
        }
    });
    localStorage.setItem('carrito',JSON.stringify(listaCursos));
}


//vaciar todos los elementos del carrito.
function vaciarCarritoLocalStorage() {
    localStorage.clear();
}
































