import Producto from './Producto.js';
import Ui from './Ui.js';

jsBase.nvoEvt( window, 'load', function() {
    jsApp.init( jsApp );
});

let jsApp = function() {

    let fn = {};

    fn.init = ( self ) => {
                
        let validation = Array.prototype.filter.call( 
            document.getElementsByClassName( 'needs-validation' ), function( form ) {

            form.addEventListener( 'submit', function( event ) {
                let e = event || window.event;
                if( form.checkValidity() === false ) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                form.classList.add( 'was-validated' );

            }, false );

        });

        jsBase.$( 'frm-producto' )?.on( 'submit', ( event ) => {
            self.frmProductoSubmit( event );
        });

        jsBase.$( 'producto-lista' )?.on( 'click', ( event ) => {
            self.productoListaClick( event );
        });

        jsBase.$( 'anyo' ).value = new Date().getFullYear();

        document.querySelector( '#nom' )?.focus();
    };

    fn.frmProductoSubmit = function( event ) {


        let e = event || window.event;

        if( !e.defaultPrevented ) {
            
            const frm = new FormData( e.target );
            const producto 
                = new Producto( frm.get( 'nombre' )
                                , parseFloat( frm.get( 'precio' ).replace( ',','.' ) ) || 0
                                , parseFloat( frm.get( 'anyo' ) ) || new Date().getFullYear() );
            const ui = new Ui();

            ui.addProducto( producto );
            ui.resetFrm( e.target, { initFoc: true } );
            ui.mosMensaje( 'Producto agregado correctamente', { css: 'success' } );

            e.preventDefault();
            e.stopPropagation();
        }
    };

    fn.productoListaClick = function( event ) {
        let e = event || window.event;
        new Ui().remProducto( e.target );
    };

    return fn;

}();