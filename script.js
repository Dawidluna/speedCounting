var currentCount;
var lastCount;
var isRunning = false;
var startTime;
var endTime;
var times = [];
var timeSum;

function giveLastNumber() {
    lastCount=Number(document.getElementById("firstNumber").value)+((Number(document.getElementById("numberCount").value)-1)*Number(document.getElementById("increment").value));
    document.getElementById("lastNumber").textContent=lastCount;
}

function updateFirstCount() {
    currentCount = Number(document.getElementById("firstNumber").value);
    document.getElementById("nextCount").textContent = currentCount;
}

function runStart() {
    isRunning = true;
    document.getElementById("firstNumber").disabled = true;
    document.getElementById("increment").disabled = true;
    document.getElementById("numberCount").disabled = true;

    times = [];
    startTime = performance.now();
    timeSum = startTime;
}

function runEnd() {
    updateFirstCount();
    giveLastNumber();
    isRunning = false;
    document.getElementById("firstNumber").disabled = false;
    document.getElementById("increment").disabled = false;
    document.getElementById("numberCount").disabled = false;
    var finalTime = timeSum-startTime;
    finalTime = finalTime.toString().substring(0, finalTime.toString().length-3) + "." + finalTime.toString().substring(finalTime.toString().length-3, finalTime.toString().length);
    document.getElementById("finalTime").textContent = "Final time: " + finalTime;
}

const median = arr => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  };

var input = document.getElementById("count");
input.addEventListener("keydown", function(event) {
    if(event.key === 'Enter') {
        var countEntered = document.getElementById("count").value;
        countEntered = countEntered.replace(/\,/g,'');
        countEntered = countEntered.replace(/\s/g,'');
        countEntered = countEntered.replace(/\./g,'');

        if(countEntered == currentCount) {
            if(isRunning == false) runStart();
            else {
                var countTime = Math.round(performance.now()-timeSum);
                timeSum+=countTime;
                times.push(countTime);
                document.getElementById("countTime").textContent = countTime+" ms";
                document.getElementById("minTime").textContent = "min: " + Math.min(...times) + " ms";
                document.getElementById("maxTime").textContent = "max: " + Math.max(...times) + " ms";
                document.getElementById("medianTime").textContent = "median: " + median(times) + " ms";
            }
            if(currentCount == lastCount) {
                runEnd();
                return;
            }
            currentCount+=Number(document.getElementById("increment").value);
            document.getElementById("nextCount").textContent = currentCount;
            if(document.getElementById("clear").checked == false) {
                document.getElementById("count").value="";
            }
        }
    }
});