var select = d3.select('select');

    d3.json("samples.json").then(data=> {
        console.log(data.metadata[0]);

        var names = data.names;

        names.forEach(name => {
            select.append('option').text(name).property('value',name);
        });
    });

    function buildBar(sample){
        var sampleData =  "../data/samples.json";
        d3.json(sampelData).then(function(sample){
            var xbar = data.sample_values;
            var ybar = data.otu_ids;
            var barHover = data.otu_labels;

            var trace1 = {
                x: xbar,
                y: ybar,
                type: "bar",
            }
            var data = [trace1];

            var layout = {
                title: "Top 10 OTUs"
            };
        });
        Plotly.newPlot("plot", data, layout);
    };

    function buildBubble(sample){
        var sampleData =  "../data/samples.json";
        d3.json(sampelData).then(function(sample){
            var xValues = data.otu_ids;
            var yValues = data.sample_values;
            var tValues = data.otu_labels;

            var trace2 = {
                x: xValues,
                y: yValues,
                text: tValues,
            }
            var data = [trace2];

            var layout = {
                title: "OTU IDs"
            };
        });
        Plotly.newPlot("bubble", data, layout);
    };
