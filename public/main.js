$(function () {

    var socket = io('http://localhost:8080/');

    // create a dataset for nodes
    var nodes = new vis.DataSet();

    // create a dataset for edges
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

    var network = new vis.Network(container, data, options);

    var tids = [];
    // Display new node
    function showNewTweet(data) {

        console.log(data);
        // Add twitter users with avatar
        tids.push(data.user.id);
        nodes.update([
            {
                id: data.user.id,
                label: data.user.name,
                image: data.user.profile_image_url,
                shape: 'image'
            }
        ]);

        if (data.user.time_zone) {
            nodes.update([
                {
                    id: data.user.time_zone,
                    label: data.user.time_zone,
                    color: {
                        background: '#000000',
                        border: '#000000'
                    },
                    shape: 'star',
                    radius: 24
                }

            ]);

            edges.update([{from: data.user.time_zone, to: data.user.id}]);

        }

        // Add words and connect to users
        var words = data.text.split(" ");
        words.forEach(function (word) {
            word = word.replace(/\W+/g, "").toLowerCase();
            if (word.length > 3 && word.indexOf("@") === -1 && word.indexOf("http") === -1) {
                nodes.update([
                    {
                        id: word, label: word,
                        color: {
                            background: randomColor(),
                            border: randomColor()
                        }
                    }
                ]);
                edges.update([{from: data.user.id, to: word}]);
            }
        });
    }

    function randomColor() {
        return "#" + Math.random().toString(16).slice(2, 8);
    }

    // Listener for new tweet events
    socket.on('tweet', function (data) {
        showNewTweet(data);
    });

});
