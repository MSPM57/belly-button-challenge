
d3.json('./data/samples.json').then(({names}) => {
    names.forEach(name => {
        d3.select('select').append('option').text(name);
    });

    optionChanged();
});

const optionChanged = ()=> {
    let selection = d3.select('select').node().value;

    d3.json('./data/samples.json').then(({metadata, samples}) => {
      let meta =  metadata.filter(obj => obj.id == selection)[0];
      let sample = samples.filter(obj => obj.id == selection)[0];

      Object.entries(meta).forEach(([key,val])=> {
        d3.select('.panel-body').append('h4').text(key +': '+ val);
      })

      var data = [
        {
          x: ['giraffes', 'orangutans', 'monkeys'],
          y: [20, 14, 23],
          type: 'bar',
          orientation:'h'
        }
      ];
      
      Plotly.newPlot('bar', data);
      console.log(sample);

    });

}    