import { Meteor } from 'meteor/meteor';
import { Charities } from './charities';

Meteor.methods({
  getSearchContent() {
    let cursor = Charities.find({}, { fields: { _id: 1, CharityName: 1, RegisteredCharityNumber: 1 } })
    return cursor.fetch().map(function(el, idx, arr) {
      return {
        title: el.CharityName,
        description: (el.RegisteredCharityNumber).toString()
      }
    })
  },
  topGrossIncome() {
    const findParams = {
      "RegistrationHistory.RemovalReason": { $eq: "" },
      "Submission": { $exists: true }
    };

    function withSubmissionsOnly(x) {
      return x.hasOwnProperty('submission');
    };

    function grossIncomeToInt(x) {
      const lastSubmission = Array.from(x.submission).pop();
      const GrossIncome = lastSubmission.GrossIncome === '' ? 0 : parseInt(lastSubmission.GrossIncome);
      const res = {
        CharityName: x.name,
        RegisteredCharityNumber: x.registeredCharityNumber,
        GrossIncome: GrossIncome
      };
      return res;
    };

    function sortByGrossIncome(a, b) {
      if (a.GrossIncome > b.GrossIncome) {
        return -1
      };
      if (a.GrossIncome < b.GrossIncome) {
        return 1
      };
      return 0;
    };

    const res = Charities.find(findParams, {
        // limit: 10,
        fields: { CharityName: 1, RegisteredCharityNumber: 1, Submission: 1 }
      }).fetch()
      .filter(withSubmissionsOnly)
      .map(grossIncomeToInt)
      .sort(sortByGrossIncome);
    return res[0];
  },

  topEmployer() {
    const findParams = {
      "RegistrationHistory.RemovalReason": { $eq: "" },
      "Returns": { $exists: true }
    };

    function stringToNumber(doc) {
      // doc.Returns[0].doc.Returns[0].
      const NoEmployees = parseInt(doc.Returns[0].Employees.NoEmployees);
      let { CharityName, RegisteredCharityNumber } = doc;
      // doc.Employees.NoEmployees = parseInt(numEmployees);
      return {
        CharityName,
        RegisteredCharityNumber,
        NoEmployees
      };
    };

    function sortByNumEmployees(a, b) {
      if (a.NoEmployees > b.NoEmployees) {
        return -1
      };
      if (a.NoEmployees < b.NoEmployees) {
        return 1
      };
      return 0;
    }

    const res = Charities.find(findParams, {
        // limit: 10,
        fields: { CharityName: 1, RegisteredCharityNumber: 1, Returns: 1 },
        transform: stringToNumber
          // sort: {"Returns[0].NoEmployees"},
          // skip: Number,
          // reactive: Boolean,

      }).fetch()
      .sort(sortByNumEmployees);
    // console.log(res);
    return res[0];
  },

  topVolunteerPlaces() {
    const findParams = {
      "RegistrationHistory.RemovalReason": { $eq: "" },
      "Returns": { $exists: true }
    };

    function stringToNumber(doc) {
      // doc.Returns[0].doc.Returns[0].
      const NoVolunteers = parseInt(doc.Returns[0].Employees.NoVolunteers);
      let { CharityName, RegisteredCharityNumber } = doc;
      // doc.Employees.NoEmployees = parseInt(numEmployees);
      return {
        CharityName,
        RegisteredCharityNumber,
        NoVolunteers
      };
    };

    function sortByNumVolunteers(a, b) {
      if (a.NoVolunteers > b.NoVolunteers) {
        return -1
      };
      if (a.NoVolunteers < b.NoVolunteers) {
        return 1
      };
      return 0;
    }

    const res = Charities.find(findParams, {
        // limit: 10,
        fields: { CharityName: 1, RegisteredCharityNumber: 1, Returns: 1 },
        transform: stringToNumber
          // sort: {"Returns[0].NoEmployees"},
          // skip: Number,
          // reactive: Boolean,

      }).fetch()
      .sort(sortByNumVolunteers);
    // console.log(res);
    return res[0];
  },

  topTotalExpenditure() {
    const findParams = {
      "RegistrationHistory.RemovalReason": { $eq: "" },
      "Submission": { $exists: true }
    };

    function withSubmissionsOnly(x) {
      return x.hasOwnProperty('submission');
    };

    function totalExpenditureToInt(x) {
      const lastSubmission = Array.from(x.submission).pop();
      const TotalExpenditure = lastSubmission.TotalExpenditure === '' ? 0 : parseInt(lastSubmission.TotalExpenditure);
      const res = {
        CharityName: x.name,
        RegisteredCharityNumber: x.registeredCharityNumber,
        TotalExpenditure: TotalExpenditure
      };
      // console.log(res);
      return res;
    };

    function sortByTotalExpenditure(a, b) {
      if (a.TotalExpenditure > b.TotalExpenditure) {
        return -1
      };
      if (a.TotalExpenditure < b.TotalExpenditure) {
        return 1
      };
      return 0;
    }

    const res = Charities.find(findParams, {
        // limit: 10,
        fields: { CharityName: 1, RegisteredCharityNumber: 1, Submission: 1 }
      }).fetch()
      .filter(withSubmissionsOnly)
      .map(totalExpenditureToInt)
      .sort(sortByTotalExpenditure);
    return res[0];
  }
});
