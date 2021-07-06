HTMLElement.prototype.on = function( eve, fun ) {
    let expresionRegular = /[,;\s]+/;
    let evts = eve.split( expresionRegular );

    for( let i = 0; i < evts.length; i++ ) {

        let evt = evts[i].trim();

        if( evt.isEmpty() ) continue;

        if( 'addEventListener' in window ) {

            this.addEventListener( evt, fun, false );

        } else {

            let thisEvent = 'on' + evt;

            if( 'attachEvent' in window )
                this.attachEvent( thisEvent, fun );
            else
                this[ thisEvent ] = fun;
        }
    }

    return this;
}

String.prototype.isEmpty = function() {
    return ( this.length === 0 || !this.trim() );
};

let jsBase = function() {
    let fn = {};
    fn.init = function() {};

    fn.$ = function( strObj ) {

        if( ( typeof strObj === 'string' || strObj instanceof String ) )
            return document.getElementById(strObj);

        return strObj;
    };

    fn.$$ = function( strClss ) {
        return document.querySelector( `.${ strClss }` );
    };

    fn.nvoEvt = function( elemento, evento, funcion ) {
        if( elemento.addEventListener )
            elemento.addEventListener(evento, funcion, false);
        else if( elemento.attachEvent )
            elemento.attachEvent('on' + evento, funcion);
    };

    return fn;
}();