$(function() {

  var socket = io('http://localhost:8080/');

  // Graph
  // create an array with nodes
  var nodes = new vis.DataSet();
  nodes.add([
    {id: 1, label: 'Node 1'},
    {id: 2, label: 'Node 2'},
    {id: 3, label: 'Node 3'},
    {id: 4, label: 'Node 4'},
    {id: 5, label: 'Node 5'}
  ]);

  // create an array with edges
  var edges = new vis.DataSet();
  edges.add([
    {from: 1, to: 2},
    {from: 1, to: 3},
    {from: 2, to: 4},
    {from: 2, to: 5}
  ]);

  // create a network
  var container = document.getElementById('graphContainer');
  var data= {
    nodes: nodes,
    edges: edges,
  };
  var options = {
    width: '1400px',
    height: '800px',
    clustering: {
      initialMaxNodes: 100,
      clusterThreshold:500,
      reduceToNodes:300,
      chainThreshold: 0.4,
      clusterEdgeThreshold: 20,
      sectorThreshold: 100,
      screenSizeThreshold: 0.2,
      fontSizeMultiplier:  4.0,
      maxFontSize: 1000,
      forceAmplification:  0.1,
      distanceAmplification: 0.1,
      edgeGrowth: 20,
      nodeScaling: {width:  1,
                    height: 1,
                    radius: 1},
      maxNodeSizeIncrements: 600,
      activeAreaBoxSize: 100,
      clusterLevelDifference: 2
    }
  };
  var network = new vis.Network(container, data, options);
  
  var prev = 1;

  // Display new node
  function showNewTweet(data) {

  console.log(data.user.name);
//  $('body').append('<div>' + data.user.name + '</div>');
  nodes.add([
    {id: data.user.id, label: data.user.name},
  ]);
  edges.add([{from: 1, to: data.user.id}]);
//  edges.add([{from: prev, to: data.user.id}]);
//  prev = data.user.id;
  }

  // Listener for new tweet events
  socket.on('tweet', function (data) {
    showNewTweet(data);
  });

});
