import { Money as ModelMoney } from "../../models/core"
import { Money as ProtoMoney } from "trade-organization-proto/gen/ts/core/money_pb"
import { Date as ProtoDate } from "trade-organization-proto/gen/ts/core/date_pb"

export function modelMoneyToProtoMoney(m: ModelMoney): ProtoMoney {
    const protoMoney = new ProtoMoney()
    protoMoney.setRubles(m.rubles)
    protoMoney.setPennies(m.pennies)
    return protoMoney
}

export function protoMoneyToModelMoney(pm: ProtoMoney): ModelMoney {
    return {
        rubles: pm.getRubles(),
        pennies: pm.getPennies()
    }
}

export function dateToProtoDate(d: Date): ProtoDate {
    const pd = new ProtoDate()
    pd.setDay(d.getDate())
    pd.setMonth(d.getMonth() + 1)
    pd.setYear(d.getFullYear())
    return pd
}

export function protoDateToDate(pd: ProtoDate): Date {
    const d = new Date()
    d.setFullYear(pd.getYear())
    d.setMonth(pd.getMonth() - 1)
    d.setDate(pd.getDay())
    return d
}