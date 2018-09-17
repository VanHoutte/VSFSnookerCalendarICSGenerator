import moment from "moment";
import rp from "request-promise";
import fs from "fs";
var cheerio = require("cheerio");
const ics = require("ics");
const { writeFileSync } = require("fs");

var teamName = "Keizer Karel 05";
var weekDays = {
	MA: 0,
	DI: 1,
	WO: 2,
	DO: 3,
	FR: 4,
	SA: 5,
	SU: 6
};

export function generateICS(req, res) {
	var icsEvents = [];
	performRequest({
		uri: "http://www.vsf-oostvlaanderen.be/nl/interclub/kalenders/236",
		// uri: "http://www.vsf-oostvlaanderen.be/nl/interclub/kalenders/235",
		method: "GET"
	}).then((data) => {
		let $ = cheerio.load(data, {
			normalizeWhitespace: true,
			xmlMode: true
		});
		let i = 0;
		$(".rij_af").each(function(index, element) {
			var row = $(this).find("td");
			var day = row
				.eq(0)
				.text()
				.replace(/\s/g, "");
			var home = row
				.eq(1)
				.text()
				.trim();
			var out = row
				.eq(3)
				.text()
				.trim();

			// get starting date of that week
			var date = row
				.parent()
				.parent()
				.parent()
				.parent()
				.find(".kalenderweek_titel")
				.eq(i)
				.text()
				.replace("Maandag ", "")
				.replace(/\s/g, "");

			if (home.includes(teamName) || out.includes(teamName)) {
				var momentDate = moment(date, "YYYY-MM-DD")
					.add(20, "hours")
					.add(weekDays[day], "days");
				console.log("=========================================================");
				console.log(momentDate);
				console.log(home + " - " + out);
				i += 2;

				if (weekDays[day]) {
					icsEvents.push({
						title: home + " - " + out,
						start: [
							momentDate.year(),
							momentDate.month() + 1,
							momentDate.date(),
							momentDate.hours(),
							momentDate.minutes()
						],
						duration: { hours: 3 }
					});
				}
			}
		});

		ics.createEvents(icsEvents, (error, value) => {
			if (error) {
				console.log(error);
				return res.status(500).end();
			}

			fs.writeFileSync(`${__dirname}/event.ics`, value);

			return res.end();
		});
	});
}

function performRequest(options) {
	// we insert the options at the end with the spread operator
	// this way we can override the headers or other options
	var staticOptions = {
		json: true,
		...options
	};

	return rp(staticOptions);
}
