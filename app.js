console.log("Hello Back to School!");
let viz;
//1. Create a variable to store the vizContainer.
//2. Create a variable to store the dashboard options.
//3. Create a variable to store the URL - if it doesn't load, might need to specify height and width.

const containerDiv = document.getElementById("vizContainer");

//4. document references the html document
//5. make sure you reference the viz container you previously made in your html code

switchstatus = false;

const options = {
  device: "desktop",
  height: "900px",
  width: "1100px",
};
const url =
  "https://public.tableau.com/views/EmbeddingExample_16734335631100/EmbeddingExample?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link";
//whenever we call initviz, can pass it a dynamic URL
//6. const options is referenceing the tableau javascript API
//7. everything else is actual javascript code
function initViz(vizurl) {
  viz = new tableau.Viz(containerDiv, vizurl, options);
}
document.addEventListener("DOMContentLoaded", initViz(url));
//8. This reference the entire webpage^
const exportpdfbutton = document.getElementById("exportPDF");
exportpdfbutton.addEventListener("click", exportPDFfunction);
const exportpowerpointbutton = document.getElementById("exportPowerPoint");
exportpowerpointbutton.addEventListener("click", exportPowerPointfunction);
//9. Only references the button ^
function exportPDFfunction() {
  viz.showExportPDFDialog();
}
function exportPowerPointfunction() {
  viz.showExportPowerPointDialog();
}
function exportimagefunction() {
  viz.showExportImageDialog();
}
function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  //need to get the active sheet but this could be a dashboard or worksheet
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  //inspect the sheets you need to filter
  console.log(sheets);
  //index of the sheets you want to filter
  const sheetToFilter = sheets[1];
  //do the actual filtering
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue })
    .then(alert("viz filtered"));
}
document
  .getElementById("FilterButton")
  .addEventListener("click", getRangeValues);

function switchViz() {
  console.log("Switching to a different viz");
  viz.dispose();
  const anotherVizUrl =
    "https://public.tableau.com/views/ObesityintheUS_16578036321980/ObesityintheUS?:language=en-US&:display_count=n&:origin=viz_share_link";
  if (switchstatus == false) {
    initViz(anotherVizUrl);
    switchstatus = true;
  } else if (switchstatus == true) {
    initViz(url);
    switchstatus = false;
  }
}
document.getElementById("SwitchViz").addEventListener("click", switchViz);

const exportimagebutton = document.addEventListener(
  "click",
  exportimagefunction
);
exportimagebutton.addEventListener("click", exportimagefunction);
