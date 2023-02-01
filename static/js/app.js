
d3.json('./data/samples.json').then(({ names }) => {
  names.forEach(name => {
    d3.select('select').append('option').text(name);
  });

  optionChanged();
});

const optionChanged = () => {
  let selection = d3.select('select').node().value;

  d3.json('./data/samples.json').then(({ metadata, samples }) => {
    let meta = metadata.filter(obj => obj.id == selection)[0];
    let sample = samples.filter(obj => obj.id == selection)[0];

    // Demographic info
    d3.select('.panel-body').html('');
    Object.entries(meta).forEach(([key, val]) => {
      d3.select('.panel-body').append('h4').text(key + ': ' + val);
    })

    // Bar Chart
    let { otu_ids, sample_values, otu_labels } = sample;
    var data = [
      {
        x: sample_values.slice(0, 10).reverse(),
        y: otu_ids.slice(0, 10).reverse().map(x => `OTU ${x}`),
        type: 'bar',
        orientation: 'h'
      }
    ];

    Plotly.newPlot('bar', data);
    console.log(sample);

    // Bubble Chart
    var trace1 = {
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      text: otu_labels,
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: 'Earth'
      }
    };

    var data = [trace1];

    var layout = {
      title: 'Marker Size',
      showlegend: false,
      height: 600,
      width: 600
    };

    Plotly.newPlot('bubble', data);

    //Gauge Chart
    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: meta.wfreq,
        title: { text: "<b>Belly Button Washing Frequency</b><br> Scrubs per Week" },
        type: "indicator",
        mode: "gauge+number",
        delta: { reference: 400 },
        gauge: { axis: { range: [null, 10] } }
      }
    ];

    var layout = { width: 600, height: 400 };
    Plotly.newPlot('gauge', data, layout);

  });
};    