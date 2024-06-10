import { Customer as ProtoCustomer } from "trade-organization-proto/gen/ts/customer/customer_pb";
import { Customer as ModelCustomer } from "../../models/customer";
import { dateToProtoDate, protoDateToDate } from "../core/mapper";

export function protoCustomerToModelCustomer(protoCustomer: ProtoCustomer): ModelCustomer {
    return {
        id: protoCustomer.getId(),
        firstName: protoCustomer.getFirstName(),
        lastName: protoCustomer.getLastName(),
        birthDate: protoDateToDate(protoCustomer.getBirthDate()!!),
        phoneNumber: protoCustomer.getPhoneNumber(),
    }
}

export function modelCustomerToProtoCustomer(modelCustomer: ModelCustomer): ProtoCustomer {
    return new ProtoCustomer()
        .setId(modelCustomer.id)
        .setFirstName(modelCustomer.firstName)
        .setLastName(modelCustomer.lastName)
        .setBirthDate(dateToProtoDate(modelCustomer.birthDate))
        .setPhoneNumber(modelCustomer.phoneNumber)
}