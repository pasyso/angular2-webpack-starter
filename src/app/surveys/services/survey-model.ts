/**
 * Created by pasyso on 27.03.16.
 */
export class SurveyModel{
  id;
  orderId;
  registrationNumber;
  VIN;
  make;
  model;
  customer;
  customerFullName;
  serviceAdviserFullName;
  completed: boolean;

  // private _row:any;

  constructor(row:any) {
    // this._row = row;
    this.id = row.id;
    this.orderId = this.getReferenceId(row);
    if (row.surveyObject) {
      this.registrationNumber =  row.surveyObject.registrationNumber;
      this.VIN =  row.surveyObject.VIN;
      this.make =  row.surveyObject.make;
      this.model =  row.surveyObject.model;
    }
    this.customer = (row.driver) ? row.driver : row.customer;
    if (this.customer) {
      this.customerFullName = this.getFullName(this.customer);
    }
    if (row.serviceAdviser) {
      this.serviceAdviserFullName = this.getFullName(row.serviceAdviser);
    }
    this.completed = row.completed;

  }

  private getFullName(partner) {
    if (partner.category === 'person') {
      var names = [];
      if (partner.firstName) names.push(partner.firstName);
      if (partner.middleName) names.push(partner.middleName);
      if (partner.lastName) names.push(partner.lastName);
      return names.join(' ');
    } else {
      if (partner.name) return partner.name;
      return '';
    }

  }

  private getReferenceId(row) {
    if (this.orderId != null) return this.orderId;
    if (row.referenceObject) {
      this.orderId = row.referenceObject.externalId;
      if (this.orderId == null) {
        this.orderId = row.referenceObject.id;
      }
    } else this.orderId = row.id;
    return this.orderId;
  }
}
