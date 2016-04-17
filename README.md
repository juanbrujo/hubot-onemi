# Hubot Onemi

**Hubot script para las últimas alertas desde el sitio de Ministerio del Interior y Seguridad Pública de Chile [ONEMI](onemi.cl)**

[![npm version](https://badge.fury.io/js/hubot-onemi.svg)](https://badge.fury.io/js/hubot-onemi)

### Install:

````
$ npm install hubot-onemi --save
````

Add to `external-scripts.json`:

````
[
  ..
  "hubot-onemi"
]
````

### Use:

````
hubot> hubot onemi <optional: rojo | verde | amarillo>
````

**Example:**

````
hubot> hubot onemi

hubot>
Vamos a onemi.cl a ver qué hay 🚌
Se han encontrado *23 resultados* para _alerta _:
1: Se actualiza Alerta Roja para Región Metropolitana por núcleo frío en altura | http://www.onemi.cl//alerta/declara-alerta-roja-para-comunas-de-la-rm-por-interrupcion-en-suministro-de-agua-potable
2: Monitoreo por Núcleo Frío en Altura entre las regiones de Coquimbo y Aysén | http://www.onemi.cl//alerta/monitoreo-sistema-frontal-entre-las-regiones-de-coquimbo-y-aysen
3: Interrupción suministro de electricidad en sectores de la Región de Valparaíso  | http://www.onemi.cl//alerta/interrupcion-suministro-de-electricidad-en-sectores-de-valparaiso
> Otros resultados en: http://www.onemi.cl/alertas/     

````

### License:
[MIT](https://opensource.org/licenses/MIT)
