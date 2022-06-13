    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const DOMbotonComprar = document.querySelector('#boton-comprar')
    const divisa = "$";

    const LocalStorage = localStorage;
    
    let carrito = [];

    let peliculasLista = 
    [
        {"id": 1, "nombre": "Maverick","genero": "Accion", "duracion": "2hs 06min", "actores": "Tom Cruise", "actores2": "Jennifer Connelly", "img":["img/maverick/top_gun_maverick-537976462-mmed.jpg"], "precio": 400 },
        {"id": 2, "nombre": "Doctor Strange en el Multiverso de la Locura","genero": "Accion", "duracion": "2hs 10min", "actores": "Benedict Cumberbatch", "actores2": "Elizabeth Olsen", "img":["img/doctor-strange/Doctor_Strange_en_el_multiverso_de_la_locura-610981386-large.jpg"], "precio": 350},
        {"id": 3, "nombre": "Todo a la vez en todas partes","genero": "Accion Comedia", "duracion": "2hs 35min", "actores": "Michelle Yeoh", "actores2": "Stephanie Hsu", "img":["img/todo a la vez/2834053.jpg"], "precio": 400 },
        {"id": 4, "nombre": "Animales Fantasticos: Los secretos de Dumbledore ","genero": "Aventura", "duracion": "2hs 22min", "actores": "Jude Law", "actores2": "Mads Mikkelsen", "img":["img/animales fantasticos/1366_2000 (1).jpeg"], "precio": 350 },
        {"id": 5, "nombre": "Jurassic World Dominion","genero": "Aventura Accion", "duracion": "2hs 26min", "actores": "Chris Pratt", "actores2": "Bryce Dallas Howard", "img":["img/jurassick world/descarga.jpg"], "precio": 400 },
        {"id": 6, "nombre": "The Batman","genero": "Accion", "duracion": "2hs 36min", "actores": "Robert Pattinson", "actores2": "Zoë Kravitz", "img":["img/batman/The_Batman-449856406-large.jpg"], "precio": 350 },
        {"id": 7, "nombre": "Sonic 2","genero": "Accion Aventura", "duracion": "2hs 6min", "actores": "James Marsden", "actores2": "Jim Carrey", "img":["img/sonic/descarga.jpg"], "precio": 250 },
        {"id": 8, "nombre": "Uncharted","genero": "Accion", "duracion": "1hs 56min", "actores": "Tom Holland", "actores2": "Mark Wahlberg", "img":["img/uncharted/descarga (1).jpg"], "precio": 350 }
    ];

   

    
    
    function guardarEnLocalStorage() {
        LocalStorage.setItem('carrito', JSON.stringify(carrito));
      }

    function cargarenLocalStorage () {
    // Busca si hay productos en Local
        if (LocalStorage.getItem('carrito') !== null) {
        // Los devuelve
        carritoPeliculas = JSON.parse(LocalStorage.getItem('carrito'));}
    }
    
    function redenderizarProductos(){
        peliculasLista.forEach((info)=>{
    
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
    
        });
    }
    
    
    function anyadirProductoAlCarrito(evento){
        
        carrito.push(evento.target.getAttribute('marcador'));
        
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
    
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);
    DOMbotonComprar.addEventListener ('click', compraRealizada);

    function compraRealizada(){
        carrito = [];
        carrito == 0 && Enviado();
        renderizarCarrito();
        localStorage.clear();   
        
       

    }

    function peliAgregada(){
        Swal.fire({
            customClass: {
                confirmButton: 'swalBtnColor'},
              title: "Se Agrego con exito al Carrito",
              icon: 'success'
        })

    }
    function Enviado(){
        Swal.fire({
          customClass: {
            confirmButton: 'swalBtnColor'},
          title: "¡Gracias por tu compra!",
          icon: 'success'})
          }

    function Error() {
            Swal.fire({
              customClass: {
                confirmButton: 'swalBtnColor'},
              title: "¡Completá todos los datos para continuar!",
              icon: 'error'
            })
        }
        function Quitar() {
            Swal.fire({
              customClass: {
                confirmButton: 'swalBtnColor'},
              title: "¡La pelicula se retiro del carrito!",
              icon: 'info'
            })
        }

        function Vacio() {
            Swal.fire({
              customClass: {
                confirmButton: 'swalBtnColor'},
              title: "¡Tu carrito ha sido vaciado con exito!",
              icon: 'info'
            })
        }
    
    cargarenLocalStorage();
    redenderizarProductos ();
    renderizarCarrito();
    
 