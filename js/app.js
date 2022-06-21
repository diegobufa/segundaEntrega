    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const DOMbotonComprar = document.querySelector('#boton-comprar')
    const divisa = "$";

    const LocalStorage = localStorage;    
    let carrito = [];     
    
    document.addEventListener("DOMContentLoaded", () => {
        fetchData();
    })

    function guardarEnLocalStorage() {
        LocalStorage.setItem('carrito', JSON.stringify(carrito));
      }

    function cargarenLocalStorage () {
    // Busca si hay productos en Local
        if (LocalStorage.getItem('carrito') !== null) {
        // Los devuelve
        carritoPeliculas = JSON.parse(LocalStorage.getItem('carrito'));}
    }
const fetchData = async () =>{
    
    try {
        const res = await fetch(`peliculas.json`);
        const data = await res.json();

        redenderizarProductos(data);

   } catch(error){
    console.log(error);
   }
}
   

   const redenderizarProductos = data => {
          console.log(data)
          data.forEach( info =>{
    
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
    
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
    
            const miNodoTitle = document.createElement('h4');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
    
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute ('src', info.img);
    
            const miNodoGenero = document.createElement('h5');
            miNodoGenero.classList.add('card-text');
            miNodoGenero.textContent = info.genero;
    
            const miNodoDuracion = document.createElement('h5');
            miNodoDuracion.classList.add('card-text');
            miNodoDuracion.textContent = info.duracion;
    
            const miNodoActores = document.createElement('h5');
            miNodoActores.classList.add('card-text');
            miNodoActores.textContent = info.actores;
    
            const miNodoActores2 = document.createElement('h5');
            miNodoActores2.classList.add('card-text');
            miNodoActores2.textContent = info.actores2;
    
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${info.precio}${divisa}`;
            miNodoPrecio.style.color = 'green';
            miNodoPrecio.style.fontSize = '1.5rem';
    
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn','btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
    
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoGenero);
            miNodoCardBody.appendChild(miNodoDuracion);
            miNodoCardBody.appendChild(miNodoActores);
            miNodoCardBody.appendChild(miNodoActores2);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
    
        })
    }
    
    
    function anyadirProductoAlCarrito(evento){
        
        carrito.push(evento.target.getAttribute('marcador'));
        console.log(carrito)        
        peliAgregada();
        renderizarCarrito();
        guardarEnLocalStorage();
    }
    
    
    function renderizarCarrito(){
    
        DOMcarrito.textContent = '';
    
        const carritoSinDuplicados = [ ...new Set(carrito)];
    
        carritoSinDuplicados.forEach((item)=>{
    
            const miItem = peliculasLista.filter((itemBaseDAtos)=>{

                return itemBaseDAtos.id === parseInt(item);
            });
            const numeroUnidadesItem = carrito.reduce((total, itemId)=>{
    
                return itemId === item ? total += 1 : total;
            }, 0);
    
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
    
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        
        });
    
        DOMtotal.textContent = calcularTotal();
    }
    
    function borrarItemCarrito (evento){
    
        const id = evento.target.dataset.item;
        carrito = carrito.filter((carritoId)=>{
            Quitar();
            return carritoId !== id;
        });
        renderizarCarrito();
        guardarEnLocalStorage();

    }
    
    
    function calcularTotal(){
    
        return carrito.reduce((total, item) =>{
    
            const miItem = peliculasLista.filter((itemBaseDatos)=>{
                return itemBaseDatos.id === parseInt(item);
                    });
            
            return total + miItem[0].precio;
        },0).toFixed(2);
    }
    
    function vaciarCarrito(){
        carrito = [];
        Vacio();
        renderizarCarrito();
        localStorage.clear() 

    }
    
    DOMbotonVaciar.addEventListener('click', Vacio);
    DOMbotonComprar.addEventListener ('click', compraRealizada);

    function compraRealizada(){
        if(carrito != ''){
            carrito = [];      
            Enviado();
            renderizarCarrito();
            localStorage.clear();   
        }else{
            Error();
        }
        
       
    }   
    
    function peliAgregada(){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Pelicula agregada al Carrito',
            showConfirmButton: false,
            timer: 1500
          })

    }
    function Enviado(){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: "¡Gracias por tu compra!",
            showConfirmButton: false,
            timer: 1500
          })
        }

    function Error() {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: "¡Completá todos los datos para continuar!",
            showConfirmButton: false,
            timer: 1500
          })
           
        }
        function Quitar() {
            Swal.fire({
                position: 'top-end',
                icon: 'info',
                title: "¡La pelicula se retiro del carrito!",
                showConfirmButton: false,
                timer: 1500
              })
            
        }

        function Vacio() {
            if(carrito != ''){
                 Swal.fire({
                title: 'Estas seguro de vaciar el carrito?',
                text: "Si estas seguro presiona borrar de lo contrario puedes cancelar!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Borrar!'
              }).then((result) => {
                if (result.isConfirmed) {
                    vaciarCarrito();
                  Swal.fire(
                    'Borrar',
                    'Tu Carrito se ha vaciado con Exito',
                    'success'
                  )
                }
              })
            }else{
                Error();
            }
           
            
        }
    
    cargarenLocalStorage();    
    renderizarCarrito();
    
 