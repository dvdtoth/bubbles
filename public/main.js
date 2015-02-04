$(function () {

    var socket = io('http://localhost:8080/');

    // Graph
    // create an array with nodes
    var nodes = new vis.DataSet();
    nodes.add([
        {id: 1, label: 'Keyword'},
    ]);

    // create an array with edges
    var edges = new vis.DataSet();

    // create a network
    var container = document.getElementById('graphContainer');
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
            maxFontSize: 1000,
            forceAmplification: 0.1,
            distanceAmplification: 0.1,
            edgeGrowth: 20,
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

    var network = new vis.Network(container, data, options);

    var prev = 1;

    var tids = [];
    // Display new node
    function showNewTweet(data) {

        // Add twitter users with avatar
        tids.push(data.user.id);
        nodes.update([
            {id: data.user.id, label: data.user.name, image: data.user.profile_image_url, shape: 'image'}
        ]);
        edges.add([{from: 1, to: data.user.id}]);

        prev = data.user.id;

        // Add words and connect of users
        var words = data.text.split(" ");
        words.forEach(function (word) {

            console.log(word);

            if (word.length > 5 && word.indexOf("@") === -1 && word.indexOf("http") === -1) {
                try {
                    nodes.add([
                        {id: word, label: word},
                    ]);
                }
                catch (e) {
                }
                //
                edges.add([{from: data.user.id, to: word}]);
            }
        });
    }


    // Listener for new tweet events
    socket.on('tweet', function (data) {
        showNewTweet(data);
    });

});
