export const CauseName = "Cause"
export const UserName = "User"
export const DealObjectName = "Deal"
import Realm from 'realm'

export const CauseSchema = {
    name: CauseName,
    properties: {
      name: {type: 'string'}
    }
  }

  export const UserSchema = {
    name: UserName,
    properties: {
      avatar:  {type: 'string'},
      name: {type: 'string'}
    }
  } 

  export const DealSchema = {
    name: DealObjectName,
    primaryKey: 'key',
    properties: {
        key: {type: 'string', default: ""},
        dealType: {type: 'string', default: ""},
        title: {type: 'string', default: ""},
        price: {type: 'double', default: 0.00},
        makerPercentage: {type: 'double', default: 0.00},
        description: {type: 'string', default: ""},
        tags: {type: 'string', default: ""},
        url: {type: 'string', default: ""},
        media: {type: 'string[]', default: []},
        user: {type: UserName, default: undefined},
        cause: {type: CauseName, default: undefined}
    }
  }

export const realmMain = new Realm({schema: [CauseSchema, DealSchema, UserSchema]})