window.onload = init;



function init () {

    var body = document.getElementById("body");

    var result = document.createElement("p");

    result.id = "result";

    body.appendChild(result);

    var button = document.getElementById("save");

    button.onclick = computing;

}



function computing() {

    var sex;
    var result_text = "";

    var name = document.getElementById("name");

    var growth = document.getElementById("growth");

    var weight = document.getElementById("weight");

    var horizontal_bar = document.getElementById("horizontal_bar");
    var bars = document.getElementById("bars");
    var push_ups = document.getElementById("push-ups");

    var coolWeight;


    var running = document.getElementById("running").selectedIndex;
     
    
if(growth.value && growth.value < 3) {growth.value *= 100;}



// Determination of name and sex
    if(name.value == "" || name.value  == null) {

            alert("Error: Введите Ваше Имя");

            return false;

    } else {

        if(document.getElementById("man").checked){

	    sex = "man";
            result_text = "Уважаемый " + name.value + "!<br>";

            if(growth.value) {

                coolWeight = growth.value - 104;

            }

        } else if (document.getElementById("woman").checked){

	    sex = "woman";
            result_text = "Уважаемая " + name.value + "!<br>";

            if(growth.value) {

               coolWeight = growth.value - 102;
 
            }

        }

    }


    result_text +=
 
        "Добро пожаловать на этот простой но очень прекрасный сайт!<br>";


// determination of weight 
    if(coolWeight && weight.value){

	var acc = accountWeight(sex);
	var coolmin;
        var coolmax;
        result_text += "Судя по вашему росту " + growth.value +
 
        " см, ваша масса тела должна быть в пределах "; 
	
	if(sex == "man"){
	    coolmin = coolWeight - acc;
	    coolmax = coolWeight + acc - 2;
	} else if (sex == "woman") {
	    coolmin = coolWeight - acc - 5;
	    coolmax = coolWeight - acc;
	}
	result_text += coolmin + " - " + coolmax + " кг.<br>" + 
		getRemainder(coolmin, coolmax, weight.value);
	
    }

// Physical force
    if(horizontal_bar.value && bars.value && push_ups.value) {
        result_text += getCategory(horizontal_bar, bars, push_ups);
    }

// Running
    if(running == 6) {
	result_text += "<br>Разряд бо бегу: no-grade";
    } else if (running == 5 || running == 4 || running == 3) {
	result_text += "<br>Разряд бо бегу: " + (running - 2);
    } else if (running == 2) { result_text += "<br>Разряд бо бегу: КМС";
    } else if (running == 1) { result_text += "<br>Разряд бо бегу: МС";
    } else if (running == 0) { result_text += "<br>Разряд бо бегу: МСМК";
    }

    
var result = document.getElementById("result");

    result.innerHTML = result_text;

}


function accountWeight(sex){
	if(sex == "man"){ return 5; 
	} else if (sex == "woman") {
	    return 2;
	}
}

function getRemainder(coolmin, coolmax, current) {
    var answer = "По соотношению вашего роста и текущего веса, "; 
    if(current > coolmax) {
	answer +=  "вам нужно скинуть " + (current - coolmax) + " кг.";
    } else if (current < coolmin) {
	answer += "вам нужно набрать как минимум " + (coolmin - current) + " кг.";
    } else { answer += "ваша масса тела находиться в пределах нормы. Так держать!"}

    return answer;
}

function getCategory(horizontal_bar, bars, push_ups) {
    

    var category = "<br><br>Ваша физическая подготовка будет оцениваться" + 
	" по разрядной шкале Workout, где будут использоваться више " + 
	"введенные данные.<br>";

    var flaghb = getGrade(parseInt(horizontal_bar.value), 10, 5);
    var flagb = getGrade(parseInt(bars.value), 15, 5);
    var flagpu = getGrade(parseInt(push_ups.value), 20, 10);

    flag = Math.floor((flaghb + flagb + flagpu) / 3);
	category += "У Вас " + flag + " разряд!<br> Для получения " + 
	(flaghb + 1) + " разряда необходимо:<ul>";

    category += "<li>Подтягивания: " +(((flaghb + 1) * 5)+5)  +"</li>";
    category += "<li>Отжимания на брусьях: " + (((flaghb+1) * 5) + 10) + 
	"</li>";
    category += "<li>Отжимания от пола: " + (((flaghb+1) * 10) + 10) + 
	"</li></ul>";

    return category;
}

function getGrade(current, index1, index2) {
    var j;
    for(var i=index1, j=1;true ;i += index2, j++){
	if(current < i){
	    return j - 1;
	}
    }
}
