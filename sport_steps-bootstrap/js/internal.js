function create_p(text) {
	var element = document.createElement("p");
	element.innerHTML = text;
	return element;
}

function getName() {
	var name = document.getElementById("name");
	return name.value;
}

function getSex() {
	var sex = [];

	if(document.getElementById("man").checked) {
		sex[0] = "man";
		sex[1] = "Уважаемый ";
	} else {
		sex[0] = "woman";
		sex[1] = "Уважаемая ";
	}
	return sex;
}

// Getting array with weight data
function getGoodWeight(sex) {
	var growth = document.getElementById("growth");
	var weight = document.getElementById("weight");
	var acc;
	var goodWeight;
	var coolmin;
	var coolmax;
	var overweight;
	var flag = "good";

	if(growth.value && weight.value) {
		if(growth.value <= 3 && growth.value > 0) {
			growth.value *= 100;
		} 
	} else {
		return false;
	}

	// Getting good weight and account value
	if(sex == "man"){ 
		acc = 4; 
		goodWeight = growth.value - 102;
		coolmin = goodWeight - acc;
		coolmax = goodWeight + acc - 1;
	} else if (sex == "woman") {
	    acc = 3;
	    goodWeight = growth.value - 107;
	    coolmin = goodWeight - acc;
	    coolmax = goodWeight + acc - 1;
	}

	// Getting results
	if(weight.value > coolmax) {
		overweight = weight.value - coolmax;
		flag = "up";
	} else if(coolmin > weight.value) {
		overweight = coolmin - weight.value;
		flag = "down";
	} else {
		overweight = 0;
	}

	return [growth.value, weight.value, coolmin, coolmax, overweight, flag];
}

// Creating text using weight data
function getWeightText(weightData) {
	var result = "Судя по вашему росту " + weightData[0] + 
		" см, ваш вес должен быть в пределах " + weightData[2] + " - " +
		weightData[3] + " кг. По соотношению вашего роста и текущего веса, ";

	if(weightData[5] == "up") {
		result += "вам нужно скинуть как минимум " + weightData[4] + " кг.";
	} else if (weightData[5] == "down") {
		result += "вам нужно набрать " + weightData[4] + " кг.";
	} else {
		result += "ваша масса тела находиться в пределах нормы. Так держать!";
	}

	return result;
}