// Description:
//   Hubot script para las últimas 5 alertas desde el sitio de Ministerio del Interior y Seguridad Pública de Chile (ONEMI)[onemi.cl]
//
//  Dependencies:
//    cheerio
//
// Commands:
//   hubot onemi <opcional tipo alerta: rojo | amarillo | verde>
//
// Author:
//   @jorgeepunan

var cheerio = require('cheerio');

module.exports = function(robot) {
  robot.respond(/onemi(.*)/i, function(msg) {

    var baseURL = 'http://www.onemi.cl/';
    var alertaURL = 'alertas/';
    var alertaRojaURL = 'tipo/rojo/';
    var alertaAmarillaURL = 'tipo/amarillo/';
    var alertaVerdeURL = 'tipo/verde/';

    var tipoAlerta = msg.match[1].split(' ')[1];
    var nombreAlerta = '';

    if( tipoAlerta == 'rojo' || tipoAlerta == 'roja') {
      alertaURL = alertaURL + alertaRojaURL;
      nombreAlerta = 'rojo';
    } else if( tipoAlerta === 'amarilla' || tipoAlerta === 'amarillo') {
      alertaURL = alertaURL + alertaAmarillaURL;
      nombreAlerta = 'amarillo';
    } else if( tipoAlerta === 'verde') {
      alertaURL = alertaURL + alertaVerdeURL;
      nombreAlerta = 'verde';
    } else {
      nombreAlerta = 'general'
      alertaURL = alertaURL;
    }

    msg.send('Vamos a onemi.cl a ver qué hay :bus: ');

    msg.robot.http(baseURL + alertaURL).get()(function(err, res, body) {

      var $ = cheerio.load(body);
      var resultados = [];

      $('.listado-alertas .row-fluid .span12').each(function() {
        var title = $(this).find('.msg').text();
        var link = $(this).find('> a').attr('href');
        var fecha = $(this).find('.date').text(); // too much whitespace, must be improved

        // resultados.push( title + '(' + fecha + ')' + ' | ' + baseURL + link );
        resultados.push( title + ' | ' + baseURL + link );
      });

      if(resultados.length > 0) {

        var limiteResultados = (resultados.length > 5) ? 3 : resultados.length;
        var plural = resultados.length > 1 ? ['n','s'] : ['',''];

        msg.send('Se ha' + plural[0] + ' encontrado *' + resultados.length + ' resultado' + plural[1] + '* para _alerta ' + nombreAlerta + '_:');

        for (var i=0; i < limiteResultados; i++) {
          var conteo = i + 1;
          msg.send(conteo + ': ' + resultados[i]);
        }

        if(resultados.length > limiteResultados) {
          msg.send('> Otros resultados en: '+ baseURL + alertaURL);
        }

      } else {
        msg.send('No se han encontrado resultados. Intente nuevamente.');
      }

    });

  });
};
