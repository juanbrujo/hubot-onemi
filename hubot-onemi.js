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
        var fecha = $(this).find('.date').text().replace(/\s/g,'').replace(/\|/g,' - ');

        resultados.push(`<${baseURL}${link}|${title} (${fecha})>`);
      });

      if(resultados.length > 0) {

        var limiteResultados = (resultados.length > 5) ? 3 : resultados.length;
        var plural = resultados.length > 1 ? ['n','s'] : ['',''];
        var resume = 'Se ha'+plural[0]+' encontrado '+ resultados.length + ' resultado'+plural[1] + ':';
        var links = resultados
          .slice(0, limiteResultados)
          .map((result, index) => `${index + 1}: ${result}`)
          .join('\n');
        var more = resultados.length > limiteResultados ? `\n<${baseURL}${alertaURL}|Ver más resultados>` : '';
        var text = `${resume}\n${links}${more}`;
        if (robot.adapter.constructor.name === 'SlackBot') {
          var options = {unfurl_links: false, as_user: true};
          robot.adapter.client.web.chat.postMessage(msg.message.room, text, options);
        } else {
          msg.send(text);
        }

      } else {
        msg.send('No se han encontrado resultados. Intente nuevamente.');
      }

    });

  });
};
