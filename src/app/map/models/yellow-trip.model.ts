export class YellowTrip {
    vendorId: string;
    pickupDatetime: string;
    dropoffDatetime: string;
    passengerCount: number;
    tripDistance: number;
    pickupLongitude: number;
    pickupLatitude: number;
    rateCode: number;
    storeAndFwdFlag: string;
    dropoffLongitude: number;
    dropoffLatitude: number;
    paymentType: string;
    fareAmount: number;
    extra: number;
    mtaTax: number;
    tipAmount: number;
    tollsAmount: number;
    impSurcharge: number;
    totalAmount: number;

    constructor({ pickupDatetime, pickupLongitude, pickupLatitude,
        tripDistance, passengerCount, dropoffDatetime, dropoffLongitude,
        dropoffLatitude }) {
        this.pickupDatetime = pickupDatetime;
        this.pickupLongitude = pickupLongitude;
        this.pickupLatitude = pickupLatitude;
        this.tripDistance = tripDistance;
        this.passengerCount = passengerCount;
        this.dropoffDatetime = dropoffDatetime;
        this.dropoffLongitude = dropoffLongitude;
        this.dropoffLatitude = dropoffLatitude;
    }
}
