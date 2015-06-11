angular.module('starter.services', [])

.factory('Metas', function(Projetos) {
  var projetos = Projetos.all();
  var metas = [];
  var activeProject = projetos[Projetos.getLastActiveIndex()];
  if (projetos.length > 0)
    metas = activeProject.metas;
  return {
    all: function() {
      return metas;
    },
    add: function(meta) {
      metas.push(meta);
    },
    getEvents: function() {
      var events = [];
      if (metas.length > 0)
        for (var i = 0; i < metas.length; i++) {
          var a = {
            title: metas[i].titulo,
            start: new Date(metas[i].ano, metas[i].mes, metas[i].dia),
            allDay: true
          };
          events.push(a);
        }
      return events;
    },
    getEvent: function(meta) {
      return {
        title: meta.titulo,
        start: new Date(meta.ano, meta.mes, meta.dia),
        allDay: true
      };
    },
    getEventoNaoCumprido: function(meta) {
      return {
        title: meta.titulo,
        start: new Date(meta.ano, meta.mes, meta.dia),
        allDay: true,
        color: 'red'
      };
    },
    repete: function(meta) {
      for (var i = 0; i < metas.length; i++) {
        if (meta.dia == metas[i].dia && meta.mes == metas[i].mes && meta.ano == metas[i].ano)
          return true;
      }
      return false;
    }
  };
});