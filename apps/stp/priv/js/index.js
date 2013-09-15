window.onload = init;

function init() {
	var MyButton = document.getElementById("save");
	MyButton.onclick = computing;
}

function computing() {
	var Result = document.getElementById("result");
	Result.innerHTML = "";

	var sex = getSex(); 

	if(getName()) {
		var name = create_p(sex[1] + getName() + "!");
		Result.appendChild(name);
	} else {
		Result.innerHTML = "";
		alert("Ошибка: Не все поля заполнены!");
		return false;
	}

	if(getGoodWeight(sex[0])) {
	//Getting array [growth, weight, coolmin, coolmax, overweight, flag]
	var weightData = getGoodWeight(sex[0]);
	Result.appendChild(create_p(getWeightText(weightData)));
	} else {
		Result.innerHTML = "";
		alert("Ошибка: Не все поля заполнены!");
		return false;	
	}
}