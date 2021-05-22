//for input file
$(".custom-file-input").on("change", function() {
    var file_name = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(file_name);
});
//-------------------------

//get the input file data
function init() {
    document.getElementById('file-input').addEventListener('change', handleFileSelect, false);
}
function handleFileSelect(event) {
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0]);
}
function handleFileLoad(event){
    console.log(event);
    input_raw_file = event.target.result;
}
//-------------------------

//inputing
function inputing() {
    //get the file input extension
    var extension = document.getElementById("file-input").value.split(".")[1];
    console.log("File Extension: ." + extension);

    var input_data = [];
    if (extension == "dat" || extension == "txt") {
        //converting input data from string to array
        var input_array = input_raw_file.split("\n").map(function (d) {
            return d.split("\t");
        });

        //determining x and y
        var input_x = [];
        var input_y = [];
        for (i = 0;i < input_array.length;i++) {
            input_x[i] = input_array[i][0];
            input_y[i] = input_array[i][1];
            if (input_x[i] == "-999.25") {
                input_x[i] = "0";
            }
            else {
                input_x[i] = input_x[i];
            }
            if (input_y[i] == "-999.25") {
                input_y[i] = "0";
            }
            else {
                input_y[i] = input_y[i];
            }
        }
        if (typeof input_y[0] == "string") {
            console.log("Input X: " + input_x);
            console.log("Input Y: " + input_y);

            input_data = [input_x, input_y];
            function_error_recovering();
        }
        else {
            function_error_handling();
        }
    }
    else {
        function_error_handling();
    }

    return input_data;
}
//-------------------------

//error handling
function function_error_handling() {
    input_data = [0];
    document.getElementById("result").innerHTML = "<h5>" + "ERROR" + "</h5>";
    $("#result").removeClass("border-primary");
    $("#result, #data-req").addClass("border-danger text-danger");
    document.getElementById("result").scrollIntoView();
}
//-------------------------

//error recovering
function function_error_recovering() {
    $("#result, #data-req").removeClass("border-danger text-danger");
    $("#result").addClass("border-primary");
}
//-------------------------

//functions
function function_median(input) {
    var length = input.length;
    var input_copy = Array.from(input);
    var input_sorted = input_copy.sort(function(a, b){return a - b;});
    var median = [];
    if (length % 2 == 1) {
        var median_index = ((length / 2) + 0.5) - 1;
        median = [input_sorted[median_index]];
    }
    else {
        var median_index_1 = (length / 2) - 1;
        var median_index_2 = ((length / 2) + 1) - 1;
        median = [input_sorted[median_index_1], input_sorted[median_index_2]];
    }
    return median;
}
function function_modes(input) {
    var frequency = {};
    var maxFreq = 0;
    var modes = [];
    for (var i in input) {
      frequency[input[i]] = (frequency[input[i]] || 0) + 1;
  
      if (frequency[input[i]] > maxFreq) {
        maxFreq = frequency[input[i]];
      }
    }
    for (var j in frequency) {
      if (frequency[j] == maxFreq) {
        modes.push(j);
      }
    }
    return modes;
}
function function_times(input_1, input_2) {
    var length = input_1.length;
    var input_times = [];
    for (i =0;i < length;i++) {
        input_times[i] = input_1[i] * input_2[i];
    }
    return input_times;
}
function function_sum(input) {
    var sum = eval(input.join("+"));
    return sum;
}
function function_mean(input) {
    var length = input.length;
    var sum = function_sum(input);
    var mean = sum / length;
    return mean;
}
function function_harmonic_mean(input) {
    var length = input.length;
    var per_value = [];
    for (i = 0;i < length;i++) {
        per_value[i] = 1 / input[i];
    }
    var sum_per_value = function_sum(per_value);
    var hmean = length / sum_per_value;
    return hmean;
}
function function_square(input) {
    var length = input.length;
    var square = [];
    for (i = 0;i < length;i++) {
        square[i] = Math.pow(input[i], 2);
    }
    return square;
}
function function_cubic(input) {
    var length = input.length;
    var cubic = [];
    for (i = 0;i < length;i++) {
        cubic[i] = Math.pow(input[i], 3);
    }
    return cubic;
}
function function_square_sum(input) {
    var sum = function_sum(input);
    var square_sum = Math.pow(sum, 2);
    return square_sum;
}
function function_sum_square(input) {
    var square = function_square(input);
    var sum_square = function_sum(square);
    return sum_square;
}
function function_mean_square(input) {
    var length = input.length;
    var sum_square = function_sum_square(input);
    var mean_square = sum_square / length;
    return mean_square;
}
function function_root_mean_square(input) {
    var mean_square = function_mean_square(input);
    var root_mean_square = Math.sqrt(mean_square);
    return root_mean_square;
}
function function_variance(input) {
    var length = input.length;
    var mean = function_mean(input);
    var input_minus_mean = [];
    for (i = 0;i < length;i++) {
        input_minus_mean[i] = input[i] - mean;
    }
    var square_input_minus_mean = function_square(input_minus_mean);
    var sum_square_input_minus_mean = function_sum(square_input_minus_mean);
    var variance = sum_square_input_minus_mean / (length - 1);
    return variance;
}
function function_standard_deviation(input) {
    var variance = function_variance(input);
    var standard_deviation = Math.sqrt(variance);
    return standard_deviation;
}
function function_standardization(input) {
    var length = input.length;
    var mean = function_mean(input);
    var standard_deviation = function_standard_deviation(input);
    var input_minus_mean = [];
    for (i = 0;i < length;i++) {
        input_minus_mean[i] = input[i] - mean;
    }
    var standardization = [];
    for (j = 0;j < length;j++) {
        standardization[j] = input_minus_mean[j] / standard_deviation;
    }
    return standardization;
}
function function_skewness(input) {
    var length = input.length;
    var mean = function_mean(input);
    var input_minus_mean = [];
    for (i = 0;i < length;i++) {
        input_minus_mean[i] = input[i] - mean;
    }
    var cubic_input_minus_mean = function_cubic(input_minus_mean);
    var sum_cubic_minus_mean = function_sum(cubic_input_minus_mean);
    var standard_deviation = function_standard_deviation(input);
    var cubic_standard_deviation = Math.pow(standard_deviation, 3);
    var skewness = (sum_cubic_minus_mean * length) / ((length - 1) * (length - 2) * cubic_standard_deviation);
    return skewness;
}
function function_covariance(input_1, input_2) {
    var length = input_1.length;
    var mean_1 = function_mean(input_1);
    var mean_2 = function_mean(input_2);
    var input_1_minus_mean = [];
    for (i = 0;i < length;i++) {
        input_1_minus_mean[i] = input_1[i] - mean_1;
    }
    var input_2_minus_mean = [];
    for (j = 0;j < length;j++) {
        input_2_minus_mean[j] = input_2[j] - mean_2;
    }
    var input_times_minus_mean_times = function_times(input_1_minus_mean, input_2_minus_mean);
    var sum_input_times_minus_mean_times = function_sum(input_times_minus_mean_times);
    var covariance = sum_input_times_minus_mean_times / (length - 1);
    return covariance;
}
function function_correlation_coefficient(input_1, input_2) {
    var length = input_1.length;
    var sum_1 = function_sum(input_1);
    var sum_2 = function_sum(input_2);
    var input_times = function_times(input_1, input_2);
    var sum_times = function_sum(input_times);
    var square_sum_1 = function_square_sum(input_1);
    var square_sum_2 = function_square_sum(input_2);
    var sum_square_1 = function_sum_square(input_1);
    var sum_square_2 = function_sum_square(input_2);
    var correlation_coefficient = ((length * (sum_times)) - (sum_1 * sum_2)) / (Math.sqrt((((length * sum_square_1) - square_sum_1) * ((length * sum_square_2) - square_sum_2))));
    return correlation_coefficient;
}
function function_determination_coefficient(input_1, input_2) {
    var correlation_coefficient = function_correlation_coefficient(input_1, input_2);
    var determination_coefficient = Math.pow(correlation_coefficient, 2);
    return determination_coefficient;
}
function function_linear_regression(input_1, input_2) {
    var length = input_1.length;
    var sum_1 = function_sum(input_1);
    var sum_2 = function_sum(input_2);
    var mean_1 = function_mean(input_1);
    var mean_2 = function_mean(input_2);
    var input_1_minus_mean = [];
    for (i = 0;i < length;i++) {
        input_1_minus_mean[i] = input_1[i] - mean_1;
    }
    var input_2_minus_mean = [];
    for (j = 0;j < length;j++) {
        input_2_minus_mean[j] = input_2[j] - mean_2;
    }
    var input_times_minus_mean_times = function_times(input_1_minus_mean, input_2_minus_mean);
    var sum_input_times_minus_mean_times = function_sum(input_times_minus_mean_times);
    var sum_square_input_1_minus_mean = function_sum_square(input_1_minus_mean);
    var slope = sum_input_times_minus_mean_times / sum_square_input_1_minus_mean;
    var intercept = (sum_2 - (slope * sum_1)) / length;
    var slope_string = "";
    var intercept_string = "";
    if (slope == "1") {
        slope_string = "X";
    }
    else if (slope == "0") {
        slope_string = "";
    }
    else if (slope == "-1") {
        slope_string = "- X";
    }
    else {
        slope_string = slope + "X";
    }
    if (intercept > "0") {
        intercept_string = "+" + " " + intercept;
    }
    else if (intercept == "0") {
        intercept_string = "";
    }
    else if (intercept < "0") {
        intercept_string = "-" + " " + Math.abs(intercept);
    }
    else {
        intercept_string = intercept;
    }
    var regression_equation = "<i>" + "Y = " + slope_string + " " + intercept_string +"</i>";
    var linear_regression = [slope, intercept, regression_equation];
    return linear_regression;
}
//-------------------------

//calculation refers to x
function function_x_result() {
    input = inputing();
    input = input[0];
    document.getElementById("result").innerHTML = "<h5>" + "Values:" + "</h5>" + "<i>" + input.join("<br/>") + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_median_x_result() {
    input = inputing();
    input = function_median(input[0]);
    document.getElementById("result").innerHTML = "<h5>" + "Median:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_modes_x_result() {
    input = inputing();
    input = function_modes(input[0]);
    document.getElementById("result").innerHTML = "<h5>" + "Modes:" + "</h5>" + "<i>" + input.join("<br/>") + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_sum_x_result() {
    input = inputing();
    input = function_sum(input[0]);
    document.getElementById("result").innerHTML = "<h5>" + "Sum:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_mean_x_result() {
    input = inputing();
    input = function_mean(input[0]);
    document.getElementById("result").innerHTML = "<h5>" + "Mean:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_harmonic_mean_x_result() {
    input = inputing();
    input = function_harmonic_mean(input[0]);
    document.getElementById("result").innerHTML = "<h5>" + "Harmonic Mean:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_square_x_result() {
    input = inputing();
    input = function_square(input[0]);
    document.getElementById("result").innerHTML = "<h5>" + "Square:" + "</h5>" + "<i>" + input.join("<br/>") + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_cubic_x_result() {
    input = inputing();
    input = function_cubic(input[0]);
    document.getElementById("result").innerHTML = "<h5>" + "Cubic:" + "</h5>" + "<i>" + input.join("<br/>") + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_square_sum_x_result() {
    input = inputing();
    input = function_square_sum(input[0]);
    document.getElementById("result").innerHTML = "<h5>" + "Square Sum:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_sum_square_x_result() {
    input = inputing();
    input = function_sum_square(input[0]);
    document.getElementById("result").innerHTML = "<h5>" + "Sum Square:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_mean_square_x_result() {
    input = inputing();
    input = function_mean_square(input[0]);
    document.getElementById("result").innerHTML = "<h5>" + "Mean Square:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_root_mean_square_x_result() {
    input = inputing();
    input = function_root_mean_square(input[0]);
    document.getElementById("result").innerHTML = "<h5>" + "Root Mean Square:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_variance_x_result() {
    input = inputing();
    input = function_variance(input[0]);
    document.getElementById("result").innerHTML = "<h5>" + "Variance:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_standard_deviation_x_result() {
    input = inputing();
    input = function_standard_deviation(input[0]);
    document.getElementById("result").innerHTML = "<h5>" + "Standard Deviation:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_standardization_x_result() {
    input = inputing();
    input = function_standardization(input[0]);
    document.getElementById("result").innerHTML = "<h5>" + "Standardization:" + "</h5>" + "<i>" + input.join("<br/>") + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_skewness_x_result() {
    input = inputing();
    input = function_skewness(input[0]);
    document.getElementById("result").innerHTML = "<h5>" + "Skewness:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
//-------------------------

//calculation refers to y
function function_y_result() {
    input = inputing();
    input = input[1];
    document.getElementById("result").innerHTML = "<h5>" + "Values:" + "</h5>" + "<i>" + input.join("<br/>") + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_median_y_result() {
    input = inputing();
    input = function_median(input[1]);
    document.getElementById("result").innerHTML = "<h5>" + "Median:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_modes_y_result() {
    input = inputing();
    input = function_modes(input[1]);
    document.getElementById("result").innerHTML = "<h5>" + "Modes:" + "</h5>" + "<i>" + input.join("<br/>") + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_sum_y_result() {
    input = inputing();
    input = function_sum(input[1]);
    document.getElementById("result").innerHTML = "<h5>" + "Sum:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_mean_y_result() {
    input = inputing();
    input = function_mean(input[1]);
    document.getElementById("result").innerHTML = "<h5>" + "Mean:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_harmonic_mean_y_result() {
    input = inputing();
    input = function_harmonic_mean(input[1]);
    document.getElementById("result").innerHTML = "<h5>" + "Harmonic Mean:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_square_y_result() {
    input = inputing();
    input = function_square(input[1]);
    document.getElementById("result").innerHTML = "<h5>" + "Square:" + "</h5>" + "<i>" + input.join("<br/>") + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_cubic_y_result() {
    input = inputing();
    input = function_cubic(input[1]);
    document.getElementById("result").innerHTML = "<h5>" + "Cubic:" + "</h5>" + "<i>" + input.join("<br/>") + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_square_sum_y_result() {
    input = inputing();
    input = function_square_sum(input[1]);
    document.getElementById("result").innerHTML = "<h5>" + "Square Sum:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_sum_square_y_result() {
    input = inputing();
    input = function_sum_square(input[1]);
    document.getElementById("result").innerHTML = "<h5>" + "Sum Square:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_mean_square_y_result() {
    input = inputing();
    input = function_mean_square(input[1]);
    document.getElementById("result").innerHTML = "<h5>" + "Mean Square:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_root_mean_square_y_result() {
    input = inputing();
    input = function_root_mean_square(input[1]);
    document.getElementById("result").innerHTML = "<h5>" + "Root Mean Square:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_variance_y_result() {
    input = inputing();
    input = function_variance(input[1]);
    document.getElementById("result").innerHTML = "<h5>" + "Variance:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_standard_deviation_y_result() {
    input = inputing();
    input = function_standard_deviation(input[1]);
    document.getElementById("result").innerHTML = "<h5>" + "Standard Deviation:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_standardization_y_result() {
    input = inputing();
    input = function_standardization(input[1]);
    document.getElementById("result").innerHTML = "<h5>" + "Standardization:" + "</h5>" + "<i>" + input.join("<br/>") + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_skewness_y_result() {
    input = inputing();
    input = function_skewness(input[1]);
    document.getElementById("result").innerHTML = "<h5>" + "Skewness:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
//-------------------------

//calculation refers to xy
function function_x_y_result() {
    input = inputing();
    input = function_times(input[0], input[1]);
    document.getElementById("result").innerHTML = "<h5>" + "Values:" + "</h5>" + "<i>" + input.join("<br/>") + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_median_x_y_result() {
    input = inputing();
    input = function_times(input[0], input[1]);
    input = function_median(input);
    document.getElementById("result").innerHTML = "<h5>" + "Median:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_modes_x_y_result() {
    input = inputing();
    input = function_times(input[0], input[1]);
    input = function_modes(input);
    document.getElementById("result").innerHTML = "<h5>" + "Modes:" + "</h5>" + "<i>" + input.join("<br/>") + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_sum_x_y_result() {
    input = inputing();
    input = function_times(input[0], input[1]);
    input = function_sum(input);
    document.getElementById("result").innerHTML = "<h5>" + "Sum:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_mean_x_y_result() {
    input = inputing();
    input = function_times(input[0], input[1]);
    input = function_mean(input);
    document.getElementById("result").innerHTML = "<h5>" + "Mean:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_harmonic_mean_x_y_result() {
    input = inputing();
    input = function_times(input[0], input[1]);
    input = function_harmonic_mean(input);
    document.getElementById("result").innerHTML = "<h5>" + "Harmonic Mean:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_square_x_y_result() {
    input = inputing();
    input = function_times(input[0], input[1]);
    input = function_square(input);
    document.getElementById("result").innerHTML = "<h5>" + "Square:" + "</h5>" + "<i>" + input.join("<br/>") + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_cubic_x_y_result() {
    input = inputing();
    input = function_times(input[0], input[1]);
    input = function_cubic(input);
    document.getElementById("result").innerHTML = "<h5>" + "Cubic:" + "</h5>" + "<i>" + input.join("<br/>") + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_square_sum_x_y_result() {
    input = inputing();
    input = function_times(input[0], input[1]);
    input = function_square_sum(input);
    document.getElementById("result").innerHTML = "<h5>" + "Square Sum:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_sum_square_x_y_result() {
    input = inputing();
    input = function_times(input[0], input[1]);
    input = function_sum_square(input);
    document.getElementById("result").innerHTML = "<h5>" + "Sum Square:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_mean_square_x_y_result() {
    input = inputing();
    input = function_times(input[0], input[1]);
    input = function_mean_square(input);
    document.getElementById("result").innerHTML = "<h5>" + "Mean Square:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_root_mean_square_x_y_result() {
    input = inputing();
    input = function_times(input[0], input[1]);
    input = function_root_mean_square(input);
    document.getElementById("result").innerHTML = "<h5>" + "Root Mean Square:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_variance_x_y_result() {
    input = inputing();
    input = function_times(input[0], input[1]);
    input = function_variance(input);
    document.getElementById("result").innerHTML = "<h5>" + "Variance:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_standard_deviation_x_y_result() {
    input = inputing();
    input = function_times(input[0], input[1]);
    input = function_standard_deviation(input);
    document.getElementById("result").innerHTML = "<h5>" + "Standard Deviation:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_standardization_x_y_result() {
    input = inputing();
    input = function_times(input[0], input[1]);
    input = function_standardization(input);
    document.getElementById("result").innerHTML = "<h5>" + "Standardization:" + "</h5>" + "<i>" + input.join("<br/>") + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_skewness_x_y_result() {
    input = inputing();
    input = function_times(input[0], input[1]);
    input = function_skewness(input);
    document.getElementById("result").innerHTML = "<h5>" + "Skewness:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
//-------------------------

//calculation refers to x and y
function function_covariance_result() {
    input = inputing();
    input = function_covariance(input[0], input[1]);
    document.getElementById("result").innerHTML = "<h5>" + "Coavariance:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_correlation_coefficient_result() {
    input = inputing();
    input = function_correlation_coefficient(input[0], input[1]);
    document.getElementById("result").innerHTML = "<h5>" + "Correlation Coefficient:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_determination_coefficient_result() {
    input = inputing();
    input = function_determination_coefficient(input[0], input[1]);
    document.getElementById("result").innerHTML = "<h5>" + "Determination Coefficient:" + "</h5>" + "<i>" + input + "</i>";
    document.getElementById("result").scrollIntoView();
}
function function_linear_regression_result() {
    input = inputing();
    input = function_linear_regression(input[0], input[1]);
    document.getElementById("result").innerHTML = "<h5>" + "Linear Regression Equation:" + "</h5>" + "<i>" + input[2] + "</i>";
    document.getElementById("result").scrollIntoView();
}
//-------------------------

//calculation panel
$(document).ready(function(){
    $(".calculation-title-x").click(function(){
        $(".calculation-panel-x").slideToggle("fast", function() {
            if ($(this).is(":visible"))
                $(this).css("display","flex");
        });
    });
    $(".calculation-title-y").click(function(){
        $(".calculation-panel-y").slideToggle("fast", function() {
            if ($(this).is(":visible"))
                $(this).css("display","flex");
        });
    });
    $(".calculation-title-x-y").click(function(){
        $(".calculation-panel-x-y").slideToggle("fast", function() {
            if ($(this).is(":visible"))
                $(this).css("display","flex");
        });
    });
    $(".calculation-title-x-and-y").click(function(){
        $(".calculation-panel-x-and-y").slideToggle("fast", function() {
            if ($(this).is(":visible"))
                $(this).css("display","flex");
        });
    });
});
//-------------------------

//copy to clipboard
function copy(selector){
    var $temp = $("<div>");
    $("body").append($temp);
    $temp.attr("contenteditable", true)
         .html($(selector).html()).select()
         .on("focus", function() { document.execCommand('selectAll',false,null); })
         .focus();
    document.execCommand("copy");
    $temp.remove();
}
//-------------------------