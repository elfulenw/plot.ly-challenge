var select = d3.select('select');

    d3.json("samples.json").then(data=> {
        console.log(data.metadata[0]);

        var names = data.names;

        names.forEach(name => {
            select.append('option').text(name).property('value',name);
        });
    });

// Metadata display when id selected in dropdown
metadata = data.metadata;

selected_metadata = []
selected_metadata.push(metadata[subject_id]);

demographics = d3.select("#sample-metadata").selectAll("p").data(selected_metadata);

demographics
    .enter()
    .append("p")
    .merge(demographics)
    .html(function(d,i){
        return `<p>id: ${d.id}</p>
        <p>ethnicity: ${d.ethnicity}</p>
        <p>gender: ${d.gender}</p>
        <p>age: ${d.age}</p>
        <p>location: ${d.location}</p>
        <p>bbtype: ${d.bbtype}</p>
        <p>wfreq: ${d.wfreq}</p>`;
    });
demographics.exit().remove();

// Set variables
    sample_values = samples[subject_id].sample_values;
    otu_ids = samples[subject_id].otu_ids;
    otu_labels = samples[subject_id].otu_labels;

// Top 10 variables
    top10_values = sample_values.slice(0,10);
    top10_labels = otu_labels.slice(0,10);
    top10_ids = otu_ids.slice(0,10);

    top10_ids = [];
    var i;
    for (i=0; i<top10_ids.length; i++){
        var string = String(top10_ids[i]);
        top10_ids.push(`OTU ${string}`);
    }

// Bar Chart for Top 10
    bar_trace = {
        x: top10_values.reverse(),
        y: top10_ids,
        type: "bar",
        orientation: "h",
        hovertext: top10_labels.reverse()
    };

    bar_data = [bar_trace];

    bar_layout = {
        title: "Top 10 OTUs Found in Individual",
        width: 400,
        height: 600,
        labels: top10_ids.reverse()
    };

    Plotly.newPlot("bar", bar_data, bar_layout);

// Bubble Chart
    bubble_trace = {
        x: otu_ids,
        y: sample_values,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids
        },
        text: otu_labels
    };

    bubble_data = [bubble_trace];

    bubble_layout = {
        width: 1000,
        height: 500
    };

    Plotly.newPlot("bubble", bubble_data, bubble_layout);

// Bonus: Gauge Chart for Washing Frequency
    var wash_frequency = metadata[subject_id].wfreq;
    var gauge_data = [
        {
            domain: {x: [0,1], y: [0,1]},
            value: wash_frequency,
            title: {text:"Belly Button Washing Frequency"},
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {range: [0, 9]},
                ],
            }
        }
    ];

async function init(){
    subject_id = 0;
    updatePage(subject_id);
}
init(subject_id);