class Ui {

    addProducto(producto) {
        let prLista = jsBase.$( 'producto-lista' );
        let elemento = document.createElement( 'div' );
        let str = 
        `<div class="card text-center mb-4">
            <div class="card-body">
                <strong>Producto</strong>: ${ producto.nombre }
                <strong>Precio</strong>: ${ producto.precio }
                <strong>Año</strong>: ${ producto.anyo }
                <button data-rem="s" class="btn btn-outline-danger">Eliminar</button>
            </div>
        </div>`;

        str = 
        `<div class="toast show mt-2" style="box-shadow: unset;" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">${ producto.nombre }</strong>
                <small>${ producto.anyo }</small>
                <button type="button" class="btn-close ms-2 mb-1" data-bs-dismiss="toast" data-rem="s" aria-label="cerrar">
                    <span aria-hidden="true"></span>
                </button>
            </div>
            <div class="toast-body">Precio Q. ${ producto.precio }</div>
        </div>`;

        elemento.innerHTML = str;

        prLista.appendChild( elemento );
    }

    resetFrm( target, objPar ) {
        let frm = target || jsBase.$( 'frm-producto' );
        frm?.reset();
        frm?.classList.remove( 'was-validated' );

        if( null != objPar && true == objPar.initFoc )
            jsBase.$( 'nom' )?.focus();

        jsBase.$( 'anyo' ).value = new Date().getFullYear();
    }

    remProducto( target ) {
        
        if( 's' == target.getAttribute( 'data-rem' ) ) {
            target.parentNode.parentNode.parentNode.remove();
            this.mosMensaje( 'Producto eliminado correctamente', { css: 'info' } )
        }
    }

    mosMensaje( msj, objPar ) {
        const div = document.createElement( 'div' );
        div.className = `alert alert-${ ( objPar ) ? objPar.css || 'success' : 'success' } font-weight-bold mt-4`;
        div.style.fontWeight = 800;

        div.appendChild( document.createTextNode( msj ) );

        const container = document.querySelector( '.container' );
        const app = document.querySelector( '#app' );

        container.insertBefore( div, app );

        new Promise( ( resolve, reject ) => {
            setTimeout( function() {
                document.querySelector( '.alert' ).remove();
            }, 3000 );
        });
    }
}

export default Ui;