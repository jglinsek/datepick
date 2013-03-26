Date.prototype.getNightsBetween = function (date) {
	var oneDay = 24 * 60 * 60 * 1000;
	//clone dates and remove times (we only want days, so we don't care about times)
	var endDate = this.clone().clearTime();
	//we may need to adjust the timezone here to match the endDate, otherwise things won't work
	var startDate = date.clone().clearTime().setTimezoneOffset(this.getUTCOffset());
	var diff = endDate - startDate;
	return diff / oneDay;
};