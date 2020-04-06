import React, { Component } from 'react';
import mammoth from 'mammoth';
// import async from 'async';
class App extends Component {
  state = {
    html: '',
    ishtmlGenerate: false,
    arrayBuffer: []
  }

  parseWordDocxFile = (event) => {
    console.log(event.target.files[0]);
    var files = event.target.files || [];
    if (!files.length) return;
    var file = files[0];

    console.time();
    var reader = new FileReader();
    reader.onloadend = (event) => {
      var arrayBuffer = reader.result;
      // debugger
      let result1 = {};
      let result2 = {};
      let result3 = {};
      this.setState({ ishtmlGenerate: true, arrayBuffer: arrayBuffer });
      // mammoth.convertToHtml({ arrayBuffer: arrayBuffer }).then(function (resultObject) {
      //   result1.innerHTML = resultObject.value;
      // console.log(resultObject.value)
      // })
      // console.timeEnd();

      // mammoth.extractRawText({ arrayBuffer: arrayBuffer }).then(function (resultObject) {
      //   result2.innerHTML = resultObject.value
      //   console.log(resultObject.value)
      // })

      //   mammoth.convertToMarkdown({ arrayBuffer: arrayBuffer }).then(function (resultObject) {
      //     result3.innerHTML = resultObject.value
      //     console.log(resultObject.value)
      //   })
    };
    reader.readAsArrayBuffer(file);
  }

  _getFormatedHtml = () => {
    let result1 = { innerHTML: '' };
    mammoth.convertToHtml({ arrayBuffer: this.state.arrayBuffer }).then((resultObject) => {
      result1.innerHTML = resultObject.value;
      console.log(result1.innerHTML)
      this.setState({ html: result1.innerHTML.toString() })
    })
  }

  render() {
    return (
      <div className="container">
        <h1>Render Word to HTML file</h1>
        <div className="row justify-content-md-center">

          <div class="col col-lg-12">
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="customFile" onChange={this.parseWordDocxFile} />
              <label class="custom-file-label" for="customFile">Choose file</label>
            </div>
          </div>
          <div class="col col-lg-12"><br /></div>

          <div class="col col-lg-12">
            <button class="btn btn-primary btn-lg active" onClick={() => this._getFormatedHtml()}>Render Html</button>
          </div>

        </div>
        <div className="container-md">
          {this.state.html && <div dangerouslySetInnerHTML={{ __html: this.state.html }} />}
        </div>
      </div>
    );
  }
}

export default App;


