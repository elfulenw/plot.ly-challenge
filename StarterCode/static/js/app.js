var select = d3.select('select');
var pnl = d3.select('.panel-body');

    d3.json("samples.json").then(data=> {
        // console.log(data.metadata[0]);

        var names = data.names;
        names.forEach(name => {
            select.append('option').text(name).property('value',name);
        });

        showDemo(names[0]);
        showBars(names[0]);
        showBubbles(names[0]);
    });

function showDemo(name) {
    pnl.html('');

    d3.json('samples.json').then(data => {
        var metadata = data.metadata.filter(obj => obj.id == name)[0];

        Object.entries(metadata).forEach(([key, value]) => {
            pnl.append('h5').text(`${key.toUpperCase()}: ${value}`)        
        });
    });
};

function showBars(name) {
    d3.json('samples.json').then( data => {

        var sample = data.samples.filter(obj => obj.id == name)[0];

        var barData = [
            {
                x: sample.sample_values.slice(0,10).reverse(),
                y: sample.otu_ids.slice(0,10).reverse().map(otuID => `OTU ${otuID}`),
                type: 'bar',
                orientation: 'h'
            }
        ]

        Plotly.newPlot('bar', barData)

    })
}
function showBubbles(name){
    d3.json('samples.json').then( data => {
        
        var sample = data.samples.filter(obj => obj.id == name)[0];

        bubble_trace = {
            x: sample.otu_ids,
            y: sample.sample_values,
            mode: "markers",
            marker: {
                size: sample.sample_values,
                color: sample.otu_ids
            },
            text: sample.otu_labels
        };
        
        bubble_data = [bubble_trace];
        
        bubble_layout = {
            width: 1000,
            height: 500
        };
        
        Plotly.newPlot("bubble", bubble_data, bubble_layout);
    })
}


function optionChanged(name) {
    showDemo(name);
    showBars(name);
    showBubbles(name);
}

// // Bonus: Gauge Chart for Washing Frequency
//     var wash_frequency = metadata[subject_id].wfreq;
//     var gauge_data = [
//         {
//             domain: {x: [0,1], y: [0,1]},
//             value: wash_frequency,
//             title: {text:"Belly Button Washing Frequency"},
//             type: "indicator",
//             mode: "gauge+number",
//             gauge: {
//                 axis: {range: [0, 9]},
//             }
//         }
//     ];