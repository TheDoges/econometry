(function() {

    var self = this;
    this.inputData = [];
    window.addEventListener("load", () => {
        document.getElementById("input_file").onchange = (event) => {
        var reader = new FileReader();
        reader.readAsText(event.srcElement.files[0]);
        reader.onload = () => {
            var fileContent = reader.result;
            try {
                this.inputData = JSON.parse("["+fileContent+"]");
            } catch(e) {
                console.log("Wrong data format");
            }
        }
    }});

    module.exports.getInputData = () => {
        return this.inputData;
    }

})();