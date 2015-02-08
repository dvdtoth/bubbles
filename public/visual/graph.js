var tids = [];

// create a dataset for nodes
var nodes = new vis.DataSet();

// create a dataset for edges
var edges = new vis.DataSet();

// create a network
//var container = document.getElementById('graphContainer');

var container = $('<div id="graphContainer"></div>').appendTo("body");

var data = {
    nodes: nodes,
    edges: edges
};
var options = {
    width: '1400px',
    height: '800px',
    clustering: {
        initialMaxNodes: 100,
        clusterThreshold: 500,
        reduceToNodes: 300,
        chainThreshold: 0.4,
        clusterEdgeThreshold: 20,
        sectorThreshold: 100,
        screenSizeThreshold: 0.2,
        fontSizeMultiplier: 4.0,
        maxFontSize: 100,
        forceAmplification: 0.1,
        distanceAmplification: 0.1,
        edgeGrowth: 5,
        nodeScaling: {
            width: 1,
            height: 1,
            radius: 1
        },
        maxNodeSizeIncrements: 600,
        activeAreaBoxSize: 100,
        clusterLevelDifference: 2
    }
};

var container = document.getElementById('graphContainer');

var network = new vis.Network(container, data, options);

// Display new node
function showNewGraphBubble(bubble) {

    data = bubble.data;
    // Add twitter users with avatar
    tids.push(data.user.id);
    nodes.update([
        {id: data.user.id, label: data.user.name, image: data.user.profile_image_url, shape: 'image'}
    ]);
    //edges.add([{from: 1, to: data.user.id}]);

    // Add words and connect to users
    var words = data.text.split(" ");
    words.forEach(function (word) {
        word = word.replace(/\W+/g, "").toLowerCase();
        if (word.indexOf("@") === -1 && word.indexOf("http") === -1) {
            nodes.update([
                {
                    id: word, label: word,
                    color: {
                        background: bubble.result == 'positive' ? '#00FF00' : '#FF0000',
                        border: '#000'
                    }
                }
            ]);
            edges.update([{from: data.user.id, to: word}]);
        }
    });
}