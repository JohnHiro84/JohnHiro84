function addthenumbers() {

	let number1, number2, number3, n1, n2, n3, sum;

	number1 = document.forms["myform"].elements["htmlnum1"].value;
	number2 = document.forms["myform"].elements["htmlnum2"].value;
	number3 = document.forms["myform"].elements["htmlnum3"].value;

	n1 = parseInt(number1);
	n1 = parseInt(number2);
	n1 = parseInt(number3);

	sum = n1 + n2 + n3; 
	alert("The sum of all 3 numbers is:" + sum);

	
}