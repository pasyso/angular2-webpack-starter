import {isNumeric} from "rxjs/util/isNumeric";
/**
 * Created by pasyso on 27.03.16.
 */


export class StatsModel{
  statByName = new Map();

  add(data) {
    if (data == null) return;
    const lastName = data['requester.last_name'];
    const firstName = data['requester.first_name'];
    const middleName = data['requester.middle_name'];
    if (lastName == null || lastName.isEmpty) return;
    var key = lastName;
    if (!firstName.isEmpty) {
      key += " " + firstName.substring(0,1) + ".";
      if (!middleName.isEmpty) {
        key += middleName.substring(0,1) + ".";
      }
    }
    var s = this.statByName.get(key);

    var names = ["questions_blank",	"questions_red",	"questions_amber",	"questions_green",
      "identified_amount_red",	"identified_amount_amber",	"identified_amount_green",	"approved_amount_red",	"approved_amount_amber",	"approved_amount_green",
      "rejected_amount_red", "rejected_amount_amber",	"rejected_amount_green",	"deferred_amount_red",	"deferred_amount_amber",	"deferred_amount_green"
    ];

    if (s == null) {
      s = {total: 0, survey_completed: 0};
      names.forEach(function (entry) {
          s[entry] = 0;
      });
    }
    s['total'] += 1;
    if (data['survey_completed'] === true)
      s['survey_completed'] += 1;

    names.forEach(function (entry) {
      if (isNumeric(data[entry]))
        s[entry] += data[entry];
    });

    this.statByName.set(key, s);

  }

}
