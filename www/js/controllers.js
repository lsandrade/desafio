angular.module('starter.controllers', ['ui.calendar', 'ui.bootstrap'])


.controller('InicioCtrl', function($scope, Projetos, $ionicModal, $window, $compile, $timeout, Metas) {

  // A utility function for creating a new project
  // with the given projectTitle
  var createProject = function(projectTitle) {
    var newProject = Projetos.newProject(projectTitle);
    $scope.projetos.push(newProject);
    Projetos.save($scope.projetos);
    $scope.selectProject(newProject, $scope.projetos.length - 1);
  };


  // Load or initialize projects
  $scope.projetos = Projetos.all();

  // Grab the last active, or the first project
  $scope.activeProject = $scope.projetos[Projetos.getLastActiveIndex()];

  $scope.metas = Metas.all();

  $scope.events = Metas.getEvents();

  $scope.eventSource = [$scope.events];

  // Called to create a new project
  $scope.newProject = function() {
    var projectTitle = prompt('Nome do Projeto');
    if (projectTitle) {
      createProject(projectTitle);
    }
  };

  // Called to select the given project
  $scope.selectProject = function(project, index) {
    $scope.activeProject = project;
    Projetos.setLastActiveIndex(index);
    //$ionicSideMenuDelegate.toggleLeft(false);
  };

  // Create our modal
  $ionicModal.fromTemplateUrl('templates/tab-inicio.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope
  });

  $scope.createTask = function(titulo) {
    if (!$scope.activeProject) {
      return;
    }
    if ($scope.activeProject.count >= 30) {
      $window.alert("Você já completou suas metas.");
      return;
    }

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var meta = {
      titulo: titulo,
      dia: d + 1,
      mes: m,
      ano: y
    };
    if (Metas.repete(meta)) {
      $window.alert("Você já completou a meta de hoje.");
      return;
    }
    $scope.activeProject.metas.push(meta);

    $scope.activeProject.count++;

    $scope.events.push(Metas.getEvent(meta));
    Metas.add(meta);


    $scope.taskModal.hide();

    // Inefficient, but save all the projects
    Projetos.save($scope.projetos);

    //task.title = "";
  };

  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  }

  $scope.toggleProjects = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  // Try to create the first project, make sure to defer
  // this by using $timeout so everything is initialized
  // properly
  $timeout(function() {
    if ($scope.projetos.length == 0) {
      while (true) {
        var projectTitle = prompt('Título do seu primeiro projeto:');
        if (projectTitle) {
          createProject(projectTitle);
          break;
        }
      }
    }
  });


  /* Render Tooltip */
  $scope.eventRender = function(event, element, view) {
    element.attr({
      'tooltip': event.title,
      'tooltip-append-to-body': true
    });
    $compile(element)($scope);
  };

  if ($scope.projetos.length > 0) {
    if ($scope.activeProject.count >= 30) {
      $scope.hoje = new Date($scope.metas[29].ano, $scope.metas[29].mes, $scope.metas[29].dia);
    } else
      $scope.hoje = new Date(Date.now());
  }

  $scope.naoCumpriu = [];

  $scope.metasNaoCumpridas = function() {
    if ($scope.projetos.length == 0)
      return;
    if ($scope.metas.length == 0) return;
    for (var d = new Date($scope.metas[0].ano, $scope.metas[0].mes, $scope.metas[0].dia); d <= $scope.hoje; d.setDate(d.getDate() + 1)) {
      var existe = 0;
      for (var i = 0; i < $scope.metas.length; i++) {
        if (d.getDate() == $scope.metas[i].dia &&
          d.getMonth() == $scope.metas[i].mes &&
          d.getFullYear() == $scope.metas[i].ano) {
          existe = 1;
          break;
        }
        //console.log(new Date($scope.metas[i].ano, $scope.metas[i].mes, $scope.metas[i].dia));
      }
      if (existe == 0)
        $scope.naoCumpriu.push(new Date(d));
    }

  };
  //console.log(new Date($scope.metas[0].ano, $scope.metas[0].mes, $scope.metas[0].dia));

  $scope.metasNaoCumpridas();

  $scope.eventoNaoCumprido = function() {
    if ($scope.projetos.length == 0)
      return;
    for (var i = 0; i < $scope.naoCumpriu.length; i++) {
      $scope.events.push(Metas.getEventoNaoCumprido({
        titulo: 'X',
        dia: $scope.naoCumpriu[i].getDate(),
        mes: $scope.naoCumpriu[i].getMonth(),
        ano: $scope.naoCumpriu[i].getFullYear()
      }));
    }
  };
  $scope.eventoNaoCumprido();
  //console.log($scope.events);
  //console.log($scope.metas[0].dia);

  $scope.atualizaMensagem = function() {
    if ($scope.projetos.length == 0)
      return;
    if ($scope.activeProject.count >= 30)
      $scope.mensagem = 'Você completou sua meta. Parabéns!!'
    else
      $scope.mensagem = $scope.activeProject.count + "/30";

  }
  $scope.atualizaMensagem();

  /* config object */
  $scope.uiConfig = {
    calendar: {
      height: 450,
      editable: false,
      header: {
        left: 'title',
        center: '',
        right: 'today prev,next'
      },
      eventClick: $scope.alertOnEventClick,
      eventDrop: $scope.alertOnDrop,
      eventResize: $scope.alertOnResize,
      eventRender: $scope.eventRender,
      dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    }
  };


})

.controller('InstrucoesCtrl', function() {

})

.controller('ConhecaCtrl', function($scope) {
  $scope.media = 'http://youtube.com/embed/_Y7PRYA5AnU';
  $scope.title = 'TED - Faça algo diferente por 30 dias';

});